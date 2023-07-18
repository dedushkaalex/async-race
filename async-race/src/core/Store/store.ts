import { Observable } from './Observable';

type Subscriber = () => void;

export class Store<T extends Record<string | symbol, unknown>> {
  private subscribers = new Map<keyof T, Set<Subscriber>>();
  public state: T;
  constructor(initialState: T) {
    this.state = Observable(initialState, this.runUpdaters.bind(this));
  }

  public subscribe(stateProp: keyof T, component: Subscriber): void {
    if (!this.subscribers.has(stateProp)) {
      this.subscribers.set(stateProp, new Set());
    }
    const listeners = this.subscribers.get(stateProp) ?? new Set();
    this.subscribers.set(stateProp, listeners.add(component));
  }

  public runUpdaters(stateProp: keyof T): void {
    const listeners = this.subscribers.get(stateProp);
    listeners?.forEach((forceUpdate) => forceUpdate());
  }
}

type AppState = {
  totalCar: number;
  count: number;
};

const initialState: AppState = {
  count: 1,
  totalCar: 0
};

export const AppStore = new Store(initialState);
