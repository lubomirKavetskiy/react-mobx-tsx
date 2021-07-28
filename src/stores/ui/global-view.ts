import { autorun, computed } from 'mobx'

import RootStore from '../root-store'

export default class GlobalView {
  private readonly rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    autorun(() => {
      console.log(this.status)
    })


  }

  @computed
  get status() {
    return `
            User Names: ${this.rootStore.dataStores.usersStore.usersList.map(({ name }) => name)},
            Total Todos: ${this.rootStore.dataStores.todosStore.todosList.length}
        `;
  }
}