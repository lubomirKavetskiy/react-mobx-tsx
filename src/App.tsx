import { observer } from 'mobx-react-lite';
import TodoList from './components/TodoList';
import UserList from './components/UserList';

import { useStore } from './stores/helpers/use-store';
import { Views } from './stores/ui/global-view';
import Test from './test';

const App = () => {
  const {
    uiStores: { globalView },
  } = useStore();

  const getCurrView = () => {
    if (globalView.currView === Views.Todos) return <TodoList />;
    if (globalView.currView === Views.Users) return <UserList />;
    return null;
  };

  return (
    <div className='App'>
      <Test />
      <div>
        <button onClick={() => globalView.updateView(Views.Todos)}>
          show Todos
        </button>
        <button onClick={() => globalView.updateView(Views.Users)}>
          show Users
        </button>
      </div>
      {getCurrView()}
    </div>
  );
};

export default observer(App);
