import { autorun } from 'mobx'
import RootStore from '../root-store'

export default class GlobalView {
  constructor(rootStore: RootStore) {

    autorun(() => {
      const { usersList } = rootStore.dataStores.usersStore
      const { todosList } = rootStore.dataStores.todosStore

      console.log(`we have ${usersList.length} users,
      the name of users are: ${usersList.map(user => `${user.name} - ${user.todos.map(({ name }) => name)}`)}.
      we have ${todosList.length} users,
      the name of todos are: ${todosList.map(({ name }) => name)}.
      `)
    })
  }
}