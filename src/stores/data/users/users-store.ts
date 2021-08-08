import { makeObservable, observable, action } from 'mobx';
import { getRoot } from 'mobx-easy';

import RootStore from '../../root-store';
import User from './user';

export default class UsersStore {
  @observable
  usersList: User[] = [];

  constructor() {
    makeObservable(this);
  }

  @action
  addUser(name: string) {
    this.usersList.push(new User(name));
  }

  getUser(name: string) {
    return this.usersList.find((user) => user.name === name);
  }

  @action
  delUser(name: string) {
    const user = this.getUser(name);

    if (user) {
      // const rootStore = getRoot<RootStore>();
      // user?.todos.forEach(todo => rootStore.dataStores.todosStore.delTodo(todo.name))

      user.todos.forEach((todo) => todo.remove());

      this.usersList.splice(this.usersList.indexOf(user), 1);
    }
  }
}
