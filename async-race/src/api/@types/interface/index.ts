export interface Car {
  name: string;
  color: string;
  id?: number;
}

export interface CarServer extends Car {
  id: number;
  wins: number;
  time: number;
  state?: {
    velocity: number;
    distance: number;
  };
}

export interface WinnersServer {
  id: number;
  wins: number;
  time: number;
}
