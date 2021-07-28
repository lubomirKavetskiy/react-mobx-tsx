
import RootStore from '../root-store'
import TodosStore from './todos/todos-store'
import UsersStore from './users/users-store'


export default class DataStore {
  todosStore: TodosStore
  usersStore: UsersStore

  constructor() {
    this.todosStore = new TodosStore()
    this.usersStore = new UsersStore()
  }
}