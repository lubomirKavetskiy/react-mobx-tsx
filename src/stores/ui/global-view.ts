import {
  action,
  autorun,
  computed,
  makeAutoObservable,
  observable,
} from 'mobx';

import RootStore from '../root-store';

export enum Views {
  Todos = 'Todos',
  Users = 'Users',
}

export default class GlobalView {
  private readonly rootStore: RootStore;

  currView: Views = Views.Todos;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    autorun(() => {
      console.log('this.status', this.status);
    });
  }

  updateView(view: Views) {
    this.currView = view;
  }

  get status() {
    return `
            User Names: ${this.rootStore.dataStores.usersStore.usersList.map(
              ({ name }) => name
            )},
            Total Todos: ${
              this.rootStore.dataStores.todosStore.todosList.length
            }
        `;
  }
}
