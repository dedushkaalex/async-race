export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface Winners {
  items: Winner[];
  count: string;
}
