import {
  observable,
  reaction,
  makeObservable,
  when,
  action,
  computed,
} from 'mobx';
import { getEnv } from 'mobx-easy';
import { RootEnv } from '../../helpers/create-store';

import RootStore from '../../root-store';
import Todo from './todo';

export default class TodosStore {
  constructor() {
    makeObservable(this);

    //will trigger after every change of todosList.length
    reaction(
      () => this.todosList.length,
      () =>
        console.log(
          `Total: ${this.todosList.length}, Completed: ${this.completed.length}, Incompleted: ${this.incompleted.length}`
        )
    );

    //will invoke just ONCE
    when(
      () =>
        !!this.todosList.length &&
        this.todosList.every((todo) => Boolean(todo.isCompleted)),
      () => console.log('all todos are completed')
    );
  }

  getTodo(id: number): Todo | undefined {
    return this.todosList.find((todo) => todo.id === id);
  }

  @observable
  todosList: Todo[] = [];

  async addTodo(name: string, userId: number) {
    const { todoService, isDev } = getEnv<RootEnv>();

    await todoService.addTodo();
    console.log(isDev);

    this._addTodo(name, userId);
  }

  @action
  private _addTodo(name: string, userId: number) {
    this.todosList.push(new Todo(name, userId));
  }

  async delTodo(id: number) {
    const { todoService } = getEnv<RootEnv>();

    await todoService.delTodo();

    this._delTodo(id);
  }

  @action
  private _delTodo(id: number) {
    const todoToDel = this.getTodo(id);

    //dispose of its reaction after deleting of it
    todoToDel?.dispose();

    if (todoToDel) {
      this.todosList.splice(this.todosList.indexOf(todoToDel), 1);
    }
  }

  getUserTodos(userId: number) {
    return this.todosList.filter((todo) => todo.userId === userId);
  }

  @computed
  get completed() {
    return this.todosList.filter((todo) => Boolean(todo.isCompleted));
  }

  @computed
  get incompleted() {
    return this.todosList.filter((todo) => !todo.isCompleted);
  }
}
