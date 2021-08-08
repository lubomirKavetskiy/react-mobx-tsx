import { computed, observable } from 'mobx';
import { getRoot } from 'mobx-easy';

import RootStore from '../../root-store';

let initId = 0;

export default class User {
  id = ++initId;

  @observable
  name: string = '';

  constructor(name: string) {
    this.name = name;

    const rootStore = getRoot<RootStore>();

    rootStore.dataStores.todosStore.addTodo('new todo', this.id);
  }

  @computed
  get todos() {
    const rootStore = getRoot<RootStore>();

    return rootStore.dataStores.todosStore.getUserTodos(this.id);
  }

  @computed
  get completed() {
    return this.todos.filter((todo) => Boolean(todo.isCompleted));
  }

  @computed
  get incompleted() {
    return this.todos.filter((todo) => !todo.isCompleted);
  }
}
