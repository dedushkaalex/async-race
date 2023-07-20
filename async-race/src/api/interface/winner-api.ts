export interface Winner {
  id: number;
  wins: number;
  time: number;
  color: string;
  carName: string;
}

export interface Winners {
  items: Winner[];
  count: string;
}
