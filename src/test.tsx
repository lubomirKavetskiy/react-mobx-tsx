import { observer } from 'mobx-react-lite'

import Todo from './stores/data/todos/todo'
import RootStore from './stores/root-store'

const newTodo = new Todo('new todo', 100, new RootStore())

const Test = observer(() => {
  return <div>
    <div>{newTodo.name}</div>

    <button onClick={() => newTodo.changeName('first name ')}>add new todo</button>
    <button onClick={() => newTodo.changeName('second name ')}>add new todo</button>
  </div>
})

export default Test
