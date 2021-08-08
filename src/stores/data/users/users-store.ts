import { makeObservable, observable, action } from 'mobx';

import RootStore from '../../root-store';
import User from './user';

export default class UsersStore {
  private readonly rootStore: RootStore;

  @observable
  usersList: User[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @action
  addUser(name: string) {
    this.usersList.push(new User(name, this.rootStore));
  }

  getUser(name: string) {
    return this.usersList.find((user) => user.name === name);
  }

  @action
  delUser(name: string) {
    const user = this.getUser(name);

    // user?.todos.forEach(todo => this.rootStore.dataStores.todosStore.delTodo(todo.name))
    if (user) {
      user.todos.forEach((todo) => todo.remove());

      this.usersList.splice(this.usersList.indexOf(user), 1);
    }
  }
}
