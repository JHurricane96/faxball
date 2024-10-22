import { PlayerState, BallState, GameState, InputMap, Directions } from './types';
const gameCanvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

const scoreSpans = [
  document.getElementById('score-0') as HTMLSpanElement,
  document.getElementById('score-1') as HTMLSpanElement,
]

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
  team: number;
  x: number;
  y: number;
  color: string;

  constructor(playerState: PlayerState) {
    this.id = playerState.id;
    this.team = playerState.team
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
      team: this.team,
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
  radius: number;

  constructor(ballState: BallState) {
    this.x = ballState.x;
    this.y = ballState.y;
    this.vx = ballState.vx;
    this.vy = ballState.vy;
    this.radius = 15;
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
  score: number[];
  goalDims: number[];

  constructor(gameState: GameState) {
    this.ball = new Ball(gameState.ball);
    this.players = gameState.players.map(playerState => new Player(playerState));
    this.score = gameState.score;
    this.goalDims = [gameCanvas.height / 4, gameCanvas.height * 3 / 4];
  }

  fromState(gameState: GameState) {
    this.ball.fromState(gameState.ball);

    for (let i = 0; i < gameState.players.length; i++) {
      this.players[i].fromState(gameState.players[i]);
    }

    this.score = gameState.score;
  }

  toState(): GameState {
    return {
      ball: this.ball.toState(),
      players: this.players.map(player => player.toState()),
      score: this.score,
    };
  }

  reset() {
    this.ball.x = gameCanvas.width / 2;
    this.ball.y = gameCanvas.height / 2;
    this.ball.vx = 0;
    this.ball.vy = 0;

    for (const player of this.players) {
      const x = Math.random() * gameCanvas.width / 2
      player.x = player.team ? x + gameCanvas.width / 2 : x;
      player.y = Math.random() * gameCanvas.height;
    }
  }

  updateHost(inputMap: InputMap) {
    this.ball.update();

    // Goal handling
    let isGoal = false;
    if (this.ball.x <= this.ball.radius && this.ball.y >= this.goalDims[0] && this.ball.y <= this.goalDims[1]) {
      this.score[1] += 1;
      isGoal = true;
    }
    else if (this.ball.x >= gameCanvas.width - this.ball.radius && this.ball.y >= this.goalDims[0] && this.ball.y <= this.goalDims[1]) {
      this.score[0] += 1;
      isGoal = true;
    }
    if (isGoal) {
      this.reset();
      return;
    }

    // Boundary collision
    if (this.ball.x <= this.ball.radius || this.ball.x >= gameCanvas.width - this.ball.radius) {
      this.ball.vx = -this.ball.vx;
    }
    if (this.ball.y <= this.ball.radius || this.ball.y >= gameCanvas.height - this.ball.radius) {
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

    // Draw Goals
    ctx.fillStyle = 'black';
    ctx.fillRect(0, this.goalDims[0], 10, this.goalDims[1] - this.goalDims[0]);
    ctx.fillRect(gameCanvas.width - 10, this.goalDims[0], 10, this.goalDims[1] - this.goalDims[0]);

    // Draw Score
    scoreSpans[0].innerText = this.score[0].toString();
    scoreSpans[1].innerText = this.score[1].toString();
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
    const x = Math.random() * gameCanvas.width / 2
    return {
      id,
      team: index % 2,
      x: index % 2 ? x + gameCanvas.width / 2 : x,
      y: Math.random() * gameCanvas.height,
      color: playerColors[index % playerColors.length]
    };
  });

  const score = [0, 0];

  return { ball, players, score };
}