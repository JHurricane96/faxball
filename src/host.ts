import '../styles.css';
import { copyToClipboard } from "./clipboard";
import { Game, initGameState } from "./game";
import { GameState, InputMap, Directions } from "./types";
import { generateUniqueId, waitForICEGatheringComplete } from "./utils";

// UI Elements
const signalingDiv = document.getElementById('signaling') as HTMLDivElement;

const hostOfferSection = document.getElementById('hostOfferSection') as HTMLDivElement;
const hostOfferTextarea = document.getElementById('hostOffer') as HTMLTextAreaElement;

const hostAnswerSection = document.getElementById('hostAnswerSection') as HTMLDivElement;
const hostRemoteAnswerTextarea = document.getElementById('hostRemoteAnswer') as HTMLTextAreaElement;
const hostAddPeerButton = document.getElementById('hostAddPeer') as HTMLButtonElement;

const startGameButton = document.getElementById('startGameButton') as HTMLButtonElement;

// Game Elements
const gameDiv = document.getElementById('game') as HTMLDivElement;
const gameCanvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = gameCanvas.getContext('2d');

const playerInputs: InputMap = {};

// Peer Management
let peers: Map<string, RTCPeerConnection> = new Map();
let dataChannels: Map<string, RTCDataChannel> = new Map();

// Broadcast Game State to All Peers (Host)
function broadcastGameState(gameState: GameState) {
  const state = JSON.stringify(gameState);
  for (const [id, dc] of dataChannels.entries()) {
    if (dc.readyState === 'open') {
      dc.send(state);
    }
  }
}

// Create a new RTCPeerConnection and handle events
function createPeerConnection(peerId: string): RTCPeerConnection {
  const peerConnection = new RTCPeerConnection();
  peers.set(peerId, peerConnection);

  // Handle ICE candidates
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      // ICE candidates should be included in the SDP offer/answer for manual signaling
      // Since we're doing manual signaling, we don't need to handle them here
    }
  };

  const dataChannel = peerConnection.createDataChannel('game');
  dataChannels.set(peerId, dataChannel);
  console.log("Data channel created for peer", peerId);

  dataChannel.onmessage = (event) => {
    const input: Directions = new Set(JSON.parse(event.data));
    playerInputs[peerId] = input;
    // handlePlayerInput(input, peerId);
  };

  dataChannel.onopen = () => {
    console.log(`Data channel with peer ${peerId} opened`);
    // Send the current game state to the new peer
    // dataChannel.send(JSON.stringify(gameState));
  };

  dataChannel.onclose = () => {
    console.log(`Data channel with peer ${peerId} closed`);
    // // Remove player from game state
    // gameState.players = gameState.players.filter(player => player.id !== peerId);
    // // Broadcast updated game state
    // broadcastGameState();
  };

  return peerConnection;
}

// Initialize Host
(async () => {

  // Create RTCPeerConnection for the first peer
  const peerId = generateUniqueId();
  const peerConnection = createPeerConnection(peerId);

  // Create Offer
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  // Wait for ICE gathering to complete
  await waitForICEGatheringComplete(peerConnection);

  // Display the offer for players to use
  hostOfferTextarea.value = JSON.stringify(peerConnection.localDescription);

  // Automatically copy the host offer to the clipboard using the helper function
  copyToClipboard(
    hostOfferTextarea.value,
    'Host offer has been copied to your clipboard.',
    'Failed to copy host offer. Please copy it manually.'
  );
})();

// Add Peer by accepting answer
hostAddPeerButton.onclick = async () => {
  const answerText = hostRemoteAnswerTextarea.value;
  if (!answerText) {
    alert('Please paste the player answer.');
    return;
  }

  // Assuming the latest peer is the one waiting for an answer
  const peerIds = Array.from(peers.keys());
  if (peerIds.length === 0) {
    alert('No peer connections available to add.');
    return;
  }
  const latestPeerId = peerIds[peerIds.length - 1];
  const peerConnection = peers.get(latestPeerId);
  if (!peerConnection) {
    alert('Peer connection not found.');
    return;
  }

  const answer = new RTCSessionDescription(JSON.parse(answerText));
  await peerConnection.setRemoteDescription(answer);

  // Clear the remote answer textarea for the next peer
  hostRemoteAnswerTextarea.value = '';

  alert(`Peer ${latestPeerId} added.`);
};

// Initialize Game Loop (Host)
function initializeHostGameLoop() {
  let gameState = initGameState(['host', ...Array.from(peers.keys())]);
  const game = new Game(gameState);
  function gameLoop() {
    // updateBall();
    // draw();
    game.updateHost(playerInputs);
    game.draw(ctx);
    gameState = game.toState();
    broadcastGameState(gameState);
    requestAnimationFrame(gameLoop);
  }
  gameLoop();
}

// Start Game Button (Host)
startGameButton.onclick = () => {
  initializeHostGameLoop();
  gameDiv.classList.remove('hidden');
  signalingDiv.classList.add('hidden');
  startGameButton.classList.add('hidden');
};
