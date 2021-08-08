import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useStore } from '../stores/helpers/use-store';
import TodoList from './TodoList';

const UserList = () => {
  const [text, setText] = useState('');
  const {
    dataStores: { usersStore },
  } = useStore();
  const [currUser, setCurrUser] = useState(usersStore.usersList[0]);

  const addUser = () => {
    usersStore.addUser(text);
    setCurrUser(usersStore.usersList[usersStore.usersList.length - 1]);
    setText('');
  };

  return (
    <div>
      <div>
        <input
          type='text'
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
        <button onClick={addUser}>Add new user</button>
        <div>Uers</div>
        <ul>
          {usersStore.usersList.map((user) => (
            <li
              key={user.id}
              onClick={() => setCurrUser(user)}
              style={{ color: `${user.id === currUser.id ? 'red' : 'green'}` }}
            >
              <span>{user.name}</span>
              <button onClick={() => usersStore.delUser(user.name)}>
                remove
              </button>
            </li>
          ))}
        </ul>
        <TodoList user={currUser} />
      </div>
    </div>
  );
};

export default observer(UserList);
