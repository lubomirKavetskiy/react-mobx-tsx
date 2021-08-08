import { observable, reaction, makeObservable, action } from 'mobx';
import { getRoot } from 'mobx-easy';

import RootStore from '../../root-store';

let initId = 0;

export default class Todo {
  id = initId++;
  userId: number;

  private disposer: () => void;

  constructor(name: string, userId: number) {
    this.userId = userId;
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
    const rootStore = getRoot<RootStore>();

    rootStore.dataStores.todosStore.delTodo(this.id);
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
