import { PlayerState, BallState, GameState, InputMap, Directions } from './types';
const gameCanvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

// Player Colors
export const playerColors = [
  'blue',
  'yellow',
  'purple',
  'orange',
  'pink',
  'cyan',
  'magenta',
  'lime'
];

export class Player {
  id: string;
  x: number;
  y: number;
  color: string;

  constructor(playerState: PlayerState) {
    this.id = playerState.id;
    this.x = playerState.x;
    this.y = playerState.y;
    this.color = playerState.color;
  }

  fromState(playerState: PlayerState) {
    this.x = playerState.x;
    this.y = playerState.y;
  }

  toState(): PlayerState {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      color: this.color
    };
  }

  update(input: Set<string>): void {
    if (input.has('up')) {
      this.y -= 1;
    }
    else if (input.has('down')) {
      this.y += 1;
    }
    if (input.has('left')) {
      this.x -= 1;
    }
    else if (input.has('right')) {
      this.x += 1;
    }
  }
}

export class Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(ballState: BallState) {
    this.x = ballState.x;
    this.y = ballState.y;
    this.vx = ballState.vx;
    this.vy = ballState.vy;
  }

  fromState(ballState: BallState) {
    this.x = ballState.x;
    this.y = ballState.y;
    this.vx = ballState.vx;
    this.vy = ballState.vy;
  }

  toState(): BallState {
    return {
      x: this.x,
      y: this.y,
      vx: this.vx,
      vy: this.vy
    };
  }

  update(): void {
    // Update ball position based on velocity
    this.x += this.vx;
    this.y += this.vy;

    // Apply friction
    this.vx *= 0.95;
    this.vy *= 0.95;
  }
}

export class Game {
  ball: Ball;
  players: Player[];

  constructor(gameState: GameState) {
    this.ball = new Ball(gameState.ball);
    this.players = gameState.players.map(playerState => new Player(playerState));
  }

  fromState(gameState: GameState) {
    this.ball.fromState(gameState.ball);

    for (let i = 0; i < gameState.players.length; i++) {
      this.players[i].fromState(gameState.players[i]);
    }
  }

  toState(): GameState {
    return {
      ball: this.ball.toState(),
      players: this.players.map(player => player.toState())
    };
  }

  updateHost(inputMap: InputMap) {
    this.ball.update();

    // Boundary collision
    if (this.ball.x <= 15 || this.ball.x >= gameCanvas.width - 15) {
      this.ball.vx = -this.ball.vx;
    }
    if (this.ball.y <= 15 || this.ball.y >= gameCanvas.height - 15) {
      this.ball.vy = -this.ball.vy;
    }

    for (const player of this.players) {
      let input: Directions;
      if (!(player.id in inputMap)) {
        input = new Set();
      }
      else {
        input = inputMap[player.id];
      }
      player.update(input);
      // Keep player within canvas bounds
      player.x = Math.max(0, Math.min(gameCanvas.width, player.x));
      player.y = Math.max(0, Math.min(gameCanvas.height, player.y));

      // Check collision with the ball
      const dx = this.ball.x - player.x;
      const dy = this.ball.y - player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 25) { // Player radius 10 + Ball radius 15
        // Impart force to the ball
        const force = 5;
        const angle = Math.atan2(dy, dx);
        this.ball.vx += force * Math.cos(angle);
        this.ball.vy += force * Math.sin(angle);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) { return; }

    // Clear Canvas
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // Draw Ball
    ctx.beginPath();
    ctx.arc(this.ball.x, this.ball.y, 15, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();

    // Draw Players
    for (const player of this.players) {
      ctx.beginPath();
      ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = player.color;
      ctx.fill();
      ctx.closePath();
    }
  }
}

export function initGameState(playerIds: string[]): GameState {
  const ball: BallState = {
    x: gameCanvas.width / 2,
    y: gameCanvas.height / 2,
    vx: 0,
    vy: 0
  };

  const players: PlayerState[] = playerIds.map((id, index) => {
    return {
      id,
      x: Math.random() * gameCanvas.width,
      y: Math.random() * gameCanvas.height,
      color: playerColors[index % playerColors.length]
    };
  });

  return { ball, players };
}