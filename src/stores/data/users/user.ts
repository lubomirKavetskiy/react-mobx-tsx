import { computed, observable } from 'mobx'

import RootStore from '../../root-store'

let initId = 0;

export default class User {
  id = ++initId

  private readonly rootStore: RootStore

  @observable
  name: string = ''

  constructor(name: string, rootStore: RootStore) {
    this.name = name
    this.rootStore = rootStore

    this.rootStore.dataStores.todosStore.addTodo('new todo', this.id)
  }

  @computed
  get todos() {
    return this.rootStore.dataStores.todosStore.getUserTodos(this.id)
  }

}
