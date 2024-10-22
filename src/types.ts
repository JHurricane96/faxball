export interface PlayerState {
  id: string;
  team: number;
  x: number;
  y: number;
  color: string;
}

export interface BallState {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface GameState {
  ball: BallState;
  players: PlayerState[];
  score: number[];
}

export type Direction = 'up' | 'down' | 'left' | 'right';
export type Directions = Set<Direction>;

export interface InputMap {
  [playerId: string]: Directions;
}
