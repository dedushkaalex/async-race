export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface CarResponse {
  items: Car[];
  count: string;
}
