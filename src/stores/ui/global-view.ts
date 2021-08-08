import { autorun, makeAutoObservable } from 'mobx';
import { getRoot } from 'mobx-easy';

import RootStore from '../root-store';

export enum Views {
  Todos = 'Todos',
  Users = 'Users',
}

export default class GlobalView {
  currView: Views = Views.Todos;

  constructor() {
    makeAutoObservable(this);

    autorun(() => {
      console.log('this.status', this.status);
    });
  }

  updateView(view: Views) {
    this.currView = view;
  }

  get status() {
    const rootStore = getRoot<RootStore>();

    return `
            User Names: ${rootStore.dataStores.usersStore.usersList.map(
              ({ name }) => name
            )},
            Total Todos: ${rootStore.dataStores.todosStore.todosList.length}
        `;
  }
}
