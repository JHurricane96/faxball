import '../styles.css';
import { Player, GameState, InputData } from './types';
import { copyToClipboard } from './clipboard';

// UI Elements
const hostButton = document.getElementById('hostButton') as HTMLButtonElement;
const joinButton = document.getElementById('joinButton') as HTMLButtonElement;
const signalingDiv = document.getElementById('signaling') as HTMLDivElement;
const setupDiv = document.getElementById('setup') as HTMLDivElement;

// Host Signaling Sections
const hostOfferSection = document.getElementById('hostOfferSection') as HTMLDivElement;
const hostOfferTextarea = document.getElementById('hostOffer') as HTMLTextAreaElement;

const hostAnswerSection = document.getElementById('hostAnswerSection') as HTMLDivElement;
const hostRemoteAnswerTextarea = document.getElementById('hostRemoteAnswer') as HTMLTextAreaElement;
const hostAddPeerButton = document.getElementById('hostAddPeer') as HTMLButtonElement;

// Player Signaling Sections
const playerAnswerSection = document.getElementById('playerAnswerSection') as HTMLDivElement;
const playerOfferTextarea = document.getElementById('playerOffer') as HTMLTextAreaElement;
const playerCreateAnswerButton = document.getElementById('playerCreateAnswer') as HTMLButtonElement;
const playerAnswerTextarea = document.getElementById('playerAnswer') as HTMLTextAreaElement;

// Start Game Button
const startGameButton = document.getElementById('startGameButton') as HTMLButtonElement;

// Game Elements
const gameDiv = document.getElementById('game') as HTMLDivElement;
const gameCanvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = gameCanvas.getContext('2d');

// Peer Management (Host Side)
let peers: Map<string, RTCPeerConnection> = new Map();
let dataChannels: Map<string, RTCDataChannel> = new Map();

// Host Game State
let gameState: GameState = {
  ball: { x: 400, y: 300, vx: 0, vy: 0 },
  players: []
};

// Player Colors
const playerColors = [
  'blue',
  'yellow',
  'purple',
  'orange',
  'pink',
  'cyan',
  'magenta',
  'lime'
];

// Unique ID Generator
function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Host Functionality
hostButton.onclick = async () => {
  setupDiv.classList.add('hidden');
  signalingDiv.classList.remove('hidden');
  hostOfferSection.classList.remove('hidden');
  hostAnswerSection.classList.remove('hidden');
  startGameButton.classList.remove('hidden');

  // Initialize host player
  const hostPlayer: Player = {
    id: 'host', // Special ID for host
    x: 100,
    y: 100,
    color: 'black' // Host's player color
  };
  gameState.players.push(hostPlayer);

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
};

// Host: Add Peer by accepting answer
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

  // Add player to game state
  const newPlayer: Player = {
    id: latestPeerId,
    x: Math.random() * gameCanvas.width,
    y: Math.random() * gameCanvas.height,
    color: playerColors[Math.floor(Math.random() * playerColors.length)]
  };
  gameState.players.push(newPlayer);

  // Broadcast the updated game state to all peers
  broadcastGameState();

  // Clear the remote answer textarea for the next peer
  hostRemoteAnswerTextarea.value = '';

  alert(`Peer ${latestPeerId} added.`);
};

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
    const input: InputData = JSON.parse(event.data);
    handlePlayerInput(input);
  };

  dataChannel.onopen = () => {
    console.log(`Data channel with peer ${peerId} opened`);
    // Send the current game state to the new peer
    dataChannel.send(JSON.stringify(gameState));
  };

  dataChannel.onclose = () => {
    console.log(`Data channel with peer ${peerId} closed`);
    // Remove player from game state
    gameState.players = gameState.players.filter(player => player.id !== peerId);
    // Broadcast updated game state
    broadcastGameState();
  };

  return peerConnection;
}

// Player Functionality
joinButton.onclick = () => {
  setupDiv.classList.add('hidden');
  signalingDiv.classList.remove('hidden');
  playerAnswerSection.classList.remove('hidden');
};

// Player: Create Answer
playerCreateAnswerButton.onclick = async () => {
  const offerText = playerOfferTextarea.value;
  if (!offerText) {
    alert('Please paste the host offer.');
    return;
  }

  const offer = new RTCSessionDescription(JSON.parse(offerText));
  const peerConnection = new RTCPeerConnection();

  peerConnection.ondatachannel = (event) => {
    const dataChannel = event.channel;
    dataChannels.set('host', dataChannel);
    console.log("Data channel created for host");

    dataChannel.onmessage = (event) => {
      console.log('Received message from host:', event.data);
      const updatedState: GameState = JSON.parse(event.data);
      updateGameState(updatedState);

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
  }

  // Handle ICE candidates
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      // ICE candidates should be included in the SDP offer/answer for manual signaling
    }
  };

  await peerConnection.setRemoteDescription(offer);

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  // Wait for ICE gathering to complete
  await waitForICEGatheringComplete(peerConnection);

  // Display the answer for the player to share with the host
  playerAnswerTextarea.value = JSON.stringify(peerConnection.localDescription);

  // Automatically copy the player answer to the clipboard using the helper function
  copyToClipboard(
    playerAnswerTextarea.value,
    'Player answer has been copied to your clipboard.',
    'Failed to copy player answer. Please copy it manually.'
  );
};

// Flag to ensure game loop starts only once
let gameLoopStarted: boolean = false;

// Start Game Button (Host)
startGameButton.onclick = () => {
  initializeHostGameLoop();
  gameDiv.classList.remove('hidden');
  signalingDiv.classList.add('hidden');
  startGameButton.classList.add('hidden');
};

// Game Logic

// Initialize Game Loop (Host)
function initializeHostGameLoop() {
  function gameLoop() {
    updateBall();
    draw();
    broadcastGameState();
    requestAnimationFrame(gameLoop);
  }
  gameLoop();
}

// Initialize Game Loop (Player)
function initializePlayerGameLoop() {
  function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
  }
  gameLoop();
}

// Handle Player Inputs (Host)
function handlePlayerInput(input: InputData) {
  console.log(input);
  const player = gameState.players.find(p => p.id === input.playerId);
  if (!player) return;

  const speed = 5;
  switch (input.direction) {
    case 'up':
      player.y -= speed;
      break;
    case 'down':
      player.y += speed;
      break;
    case 'left':
      player.x -= speed;
      break;
    case 'right':
      player.x += speed;
      break;
  }

  // Keep player within canvas bounds
  player.x = Math.max(0, Math.min(gameCanvas.width, player.x));
  player.y = Math.max(0, Math.min(gameCanvas.height, player.y));

  // Check collision with the ball
  const dx = gameState.ball.x - player.x;
  const dy = gameState.ball.y - player.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < 25) { // Player radius 10 + Ball radius 15
    // Impart force to the ball
    const force = 5;
    const angle = Math.atan2(dy, dx);
    gameState.ball.vx += force * Math.cos(angle);
    gameState.ball.vy += force * Math.sin(angle);
  }
}

// Update Ball Position (Host)
function updateBall() {
  // Update ball position based on velocity
  gameState.ball.x += gameState.ball.vx;
  gameState.ball.y += gameState.ball.vy;

  // Apply friction
  gameState.ball.vx *= 0.95;
  gameState.ball.vy *= 0.95;

  // Boundary collision
  if (gameState.ball.x <= 15 || gameState.ball.x >= gameCanvas.width - 15) {
    gameState.ball.vx = -gameState.ball.vx;
  }
  if (gameState.ball.y <= 15 || gameState.ball.y >= gameCanvas.height - 15) {
    gameState.ball.vy = -gameState.ball.vy;
  }
}

// Draw Game State (Host and Player)
function draw() {
  if (!ctx) return;

  // Clear Canvas
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  // Draw Ball
  ctx.beginPath();
  ctx.arc(gameState.ball.x, gameState.ball.y, 15, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();

  // Draw Players
  for (const player of gameState.players) {
    ctx.beginPath();
    ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
  }
}

// Broadcast Game State to All Peers (Host)
function broadcastGameState() {
  const state = JSON.stringify(gameState);
  for (const [id, dc] of dataChannels.entries()) {
    if (dc.readyState === 'open') {
      dc.send(state);
    }
  }
}

// Update Game State on Player Side
function updateGameState(state: GameState) {
  gameState = state;
}

// Handle Keyboard Input (Player)
function handlePlayerMovement() {
  window.addEventListener('keydown', (e) => {
    const direction = getDirectionFromKey(e.key);
    if (direction) {
      const input: InputData = {
        type: 'move',
        direction,
        playerId: 'host' // Replace with a unique player ID if necessary
      };
      // Send input to host
      for (const dc of dataChannels.values()) {
        if (dc.readyState === 'open') {
          console.log(input);
          dc.send(JSON.stringify(input));
        }
      }
    }
  });
}

// Map Arrow Keys to Directions
function getDirectionFromKey(key: string): 'up' | 'down' | 'left' | 'right' | null {
  switch (key) {
    case 'ArrowUp':
      return 'up';
    case 'ArrowDown':
      return 'down';
    case 'ArrowLeft':
      return 'left';
    case 'ArrowRight':
      return 'right';
    default:
      return null;
  }
}

// Utility function to wait until ICE gathering is complete
function waitForICEGatheringComplete(pc: RTCPeerConnection): Promise<void> {
  return new Promise((resolve) => {
    if (pc.iceGatheringState === 'complete') {
      resolve();
    } else {
      const checkState = () => {
        if (pc.iceGatheringState === 'complete') {
          pc.removeEventListener('icegatheringstatechange', checkState);
          resolve();
        }
      };
      pc.addEventListener('icegatheringstatechange', checkState);
    }
  });
}
