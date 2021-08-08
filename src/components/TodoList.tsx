import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import User from '../stores/data/users/user';
import { useStore } from '../stores/helpers/use-store';
import TodoComponent from './Todo';

interface Props {
  user?: User;
}

const TodoList: FC<Props> = ({ user }) => {
  const [text, setText] = useState('');
  const {
    dataStores: { todosStore },
  } = useStore();

  const addTodo = () => {
    todosStore.addTodo(text, user ? user.id : 999);
    setText('');
  };

  const completedTodos = user ? user.completed : todosStore.completed;
  const incompletedTodos = user ? user.incompleted : todosStore.incompleted;

  return (
    <div>
      <div>
        <input
          type='text'
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
        <button onClick={addTodo}>Add new todo</button>
        <div>{`incomleted: ${incompletedTodos.length}`}</div>
        <ul>
          {incompletedTodos.map((todo) => (
            <TodoComponent todo={todo} key={todo.id} />
          ))}
        </ul>
      </div>
      <div>
        <div>{`comleted: ${completedTodos.length}`}</div>
        <ul>
          {completedTodos.map((todo) => (
            <TodoComponent todo={todo} key={todo.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default observer(TodoList);
