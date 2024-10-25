import '../styles.css';
import { copyToClipboard } from "./clipboard";
import { Game } from "./game";
import { Directions, GameState } from "./types";
import { getDirectionFromKey, waitForICEGatheringComplete } from "./utils";
import { ICE_SERVERS } from './stun_servers';

// UI Elements
const signalingDiv = document.getElementById('signaling') as HTMLDivElement;

export const playerAnswerSection = document.getElementById('playerAnswerSection') as HTMLDivElement;
export const playerOfferTextarea = document.getElementById('playerOffer') as HTMLTextAreaElement;
export const playerCreateAnswerButton = document.getElementById('playerCreateAnswer') as HTMLButtonElement;
export const playerAnswerTextarea = document.getElementById('playerAnswer') as HTMLTextAreaElement;

// Game Elements
const gameDiv = document.getElementById('game') as HTMLDivElement;
const gameCanvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = gameCanvas.getContext('2d');

let dataChannel: RTCDataChannel;

let gameState: GameState;// Flag to ensure game loop starts only once
let gameLoopStarted: boolean = false;
let pressedKeys: Directions = new Set();

// Send input to host
function sendPlayerInput() {
  if (dataChannel.readyState === 'open') {
    dataChannel.send(JSON.stringify(Array.from(pressedKeys)));
  }
}

// Handle Keyboard Input
function handlePlayerMovement() {
  window.addEventListener('keydown', (e) => {
    const direction = getDirectionFromKey(e.key);
    if (direction) {
      pressedKeys.add(direction);
      sendPlayerInput();
    }
  });
  window.addEventListener('keyup', (e) => {
    const direction = getDirectionFromKey(e.key);
    if (direction) {
      pressedKeys.delete(direction);
      sendPlayerInput();
    }
  });
}

playerCreateAnswerButton.onclick = async () => {
  const offerText = playerOfferTextarea.value;
  if (!offerText) {
    alert('Please paste the host offer.');
    return;
  }

  const offer = new RTCSessionDescription(JSON.parse(offerText));
  const peerConnection = new RTCPeerConnection(ICE_SERVERS);

  peerConnection.ondatachannel = (event) => {
    dataChannel = event.channel;
    console.log("Data channel created for host");

    dataChannel.onmessage = (event) => {
      gameState = JSON.parse(event.data);

      // Start game loop upon receiving the first game state
      if (!gameLoopStarted) {
        gameDiv.classList.remove('hidden');
        signalingDiv.classList.add('hidden');
        initializePlayerGameLoop();
        handlePlayerMovement();
        gameLoopStarted = true;
      }
    };

    dataChannel.onopen = () => {
      console.log('Data channel to host opened');
    };

    dataChannel.onclose = () => {
      console.log('Data channel to host closed');
    };
  };

  await peerConnection.setRemoteDescription(offer);

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  // Wait for ICE gathering to complete
  await waitForICEGatheringComplete(peerConnection, false);

  // Display the answer for the player to share with the host
  playerAnswerTextarea.value = JSON.stringify(peerConnection.localDescription);

  // Automatically copy the player answer to the clipboard using the helper function
  copyToClipboard(
    playerAnswerTextarea.value,
    'Player answer has been copied to your clipboard.',
    'Failed to copy player answer. Please copy it manually.'
  );
};

// Initialize Game Loop (Player)
function initializePlayerGameLoop() {
  const game = new Game(gameState);
  function gameLoop() {
    game.fromState(gameState);
    game.draw(ctx);
    requestAnimationFrame(gameLoop);
  }
  gameLoop();
}