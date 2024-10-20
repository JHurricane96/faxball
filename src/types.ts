export interface Player {
  id: string;
  x: number;
  y: number;
  color: string;
}

export interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface GameState {
  ball: Ball;
  players: Player[];
}

export interface InputData {
  type: 'move';
  direction: 'up' | 'down' | 'left' | 'right';
  playerId: string;
}
