import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import Todo from '../stores/data/todos/todo';

interface Props {
  todo: Todo;
}

const TodoComponent: FC<Props> = ({ todo }) => {
  useEffect(() => {
    console.log('rerender', todo.name, 0);
  });
  const [isEdditing, setEdditing] = useState(false);
  const [text, setText] = useState('');

  const saveTodo = () => {
    setEdditing(false);
    todo.changeName(text);
    setText('');
  };

  const todoName = isEdditing ? (
    <input
      type='text'
      value={text}
      onChange={({ target }) => setText(target.value)}
    />
  ) : (
    <span>
      {todo.name} {todo.id}
    </span>
  );

  const editBtn = isEdditing ? (
    <button onClick={() => saveTodo()}>Save</button>
  ) : (
    <button onClick={() => setEdditing(true)}>Edit</button>
  );

  const toggleTodo = isEdditing ? null : (
    <button onClick={() => todo.toggle()}>Toggle</button>
  );

  const removeBtn = isEdditing ? null : (
    <button onClick={() => todo.remove()}>delete</button>
  );

  return (
    <li>
      {todoName}
      {editBtn}
      {toggleTodo}
      {removeBtn}
    </li>
  );
};

export default observer(TodoComponent);
