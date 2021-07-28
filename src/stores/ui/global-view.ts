import { action, autorun, computed, makeObservable, observable } from 'mobx'

import RootStore from '../root-store'

export enum Views {
  Todos = 'Todos',
  Users = 'Users'
}

export default class GlobalView {
  private readonly rootStore: RootStore;

  @observable
  currView: Views = Views.Todos

  constructor(rootStore: RootStore) {
    makeObservable(this)
    this.rootStore = rootStore

    autorun(() => {
      console.log(this.status)
    })
  }

  @action
  updateView(view: Views) {
    this.currView = view
  }

  @computed
  get status() {
    return `
            User Names: ${this.rootStore.dataStores.usersStore.usersList.map(({ name }) => name)},
            Total Todos: ${this.rootStore.dataStores.todosStore.todosList.length}
        `;
  }
}