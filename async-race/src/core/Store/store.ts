type Observer = {
  update(): void;
};

export type State = Record<string, string | number>;

export class Store {
  private static instance: Store;

  private observers: Observer[] = [];

  public state;

  constructor(initialState?: State) {
    const state = initialState || {
      counterGarage: 1,
      counterWinners: 1,
      pageName: 'garage',
      totalCar: 0
    };
    this.state = new Proxy(state, {
      set: (
        target: typeof state,
        property: keyof typeof state,
        value
      ): boolean => {
        if (target[property] === value) {
          return true;
        }

        target[property] = value;

        this.notifyAll();

        return true;
      }
    });
  }

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store({
        counterGarage: 1,
        counterWinners: 1,
        pageName: 'garage',
        totalCar: 0
      });
    }

    return Store.instance;
  }

  private notifyAll(): void {
    setTimeout(() => {
      this.observers.forEach((o) => o.update());
    }, 0);
  }

  public updateComponent(): void {
    this.notifyAll();
  }

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }
  public removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
}
