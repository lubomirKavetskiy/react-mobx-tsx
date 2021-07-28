import { observable, reaction, makeObservable, when, action, computed } from 'mobx'

import RootStore from '../../root-store'
import Todo from './todo'

export default class TodosStore {
  private readonly rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeObservable(this)

    this.rootStore = rootStore

    //will trigger after every change of todosList.length
    reaction(
      () => this.todosList.length,
      () => console.log(`Total: ${this.todosList.length}, Completed: ${this.completed.length}, Incompleted: ${this.incompleted.length}`)
    )

    //will invoke just ONCE
    when(
      () => !!this.todosList.length && this.todosList.every(todo => Boolean(todo.isCompleted)),
      () => console.log('all todos are completed')
    )
  }

  getTodo(name: string): Todo | undefined {
    return this.todosList.find(todo => todo.name === name)
  }

  @observable
  todosList: Todo[] = []

  @action
  addTodo(name: string, userId: number) {
    this.todosList.push(new Todo(name, userId, this.rootStore))
  }

  @action
  delTodo(name: string) {
    const todoToDel = this.getTodo(name)

    //dispose of its reaction after deleting of it
    todoToDel?.dispose()

    if (todoToDel) {
      this.todosList.splice(this.todosList.indexOf(todoToDel), 1)
    }
  }

  getUserTodos(userId: number) {
    return this.todosList.filter(todo => todo.userId === userId)
  }

  @computed
  get completed() {
    return this.todosList.filter(todo => Boolean(todo.isCompleted))
  }

  @computed
  get incompleted() {
    return this.todosList.filter(todo => !todo.isCompleted)
  }
}

