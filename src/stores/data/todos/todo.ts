import { observable, reaction, makeObservable, action } from 'mobx'

import RootStore from '../../root-store';

let initId = 0;

export default class Todo {
  id = initId++
  userId: number

  private disposer: () => void
  private readonly rootStore: RootStore

  constructor(name: string, userId: number, rootStore: RootStore) {
    makeObservable(this)

    this.name = name
    this.userId = userId
    this.rootStore = rootStore

    //will trigger after every change of isCompleted
    this.disposer = reaction(
      () => this.isCompleted,
      () => console.log(`Todo '${this.name}' is changed to ${this.isCompleted ? 'Complete' : 'Incomplete'}`)
    )
  }

  remove() {
    this.rootStore.dataStores.todosStore.delTodo(this.name)
  }

  @observable
  name = ''

  @observable
  isCompleted = false

  @action
  changeName(name: string) {
    this.name = name
  }

  @action
  toggle() {
    this.isCompleted = !this.isCompleted
  }

  dispose() {
    this.disposer()
  }
}
