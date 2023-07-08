export interface Car {
  name: string;
  color: string;
}

export interface CarServer extends Car {
  id: number;
  wins: number;
  time: number;
  state: {
    velocity: number;
    distance: number;
  };
}
