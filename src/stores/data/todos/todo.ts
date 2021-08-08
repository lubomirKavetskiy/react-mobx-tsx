import { observable, reaction, makeObservable, action } from 'mobx';

import RootStore from '../../root-store';

let initId = 0;

export default class Todo {
  id = initId++;
  userId: number;

  private disposer: () => void;
  private readonly rootStore: RootStore;

  constructor(name: string, userId: number, rootStore: RootStore) {
    this.userId = userId;
    this.rootStore = rootStore;
    this.name = name;

    //will trigger after every change of isCompleted
    this.disposer = reaction(
      () => this.isCompleted,
      () =>
        console.log(
          `Todo '${this.name}' is changed to ${
            this.isCompleted ? 'Complete' : 'Incomplete'
          }`
        )
    );

    makeObservable(this, {
      name: observable,
      isCompleted: observable,
      changeName: action,
      toggle: action,
    });
  }

  remove() {
    this.rootStore.dataStores.todosStore.delTodo(this.id);
  }

  name = '';

  isCompleted = false;

  changeName(name: string) {
    this.name = name;
  }

  toggle() {
    this.isCompleted = !this.isCompleted;
  }

  dispose() {
    this.disposer();
  }
}
