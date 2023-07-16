type Observer = {
  update(): void;
};
type State = Record<string, string>;

export class Store {
  private static instance: Store;

  private observers: Observer[] = [];

  public state;

  constructor(initialState?: State) {
    const state = initialState || {};

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
      Store.instance = new Store();
    }

    return Store.instance;
  }

  private notifyAll(): void {
    setTimeout(() => {
      this.observers.forEach((o) => o.update());
    }, 0);
  }

  // public updateLevel(currentLevel: number): void {
  //   this.state.level = currentLevel;
  // }

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }
  public removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
}
