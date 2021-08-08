import { wrapRoot } from 'mobx-easy';
import Todoservice from '../../services/todo-service';
import RootStore from '../root-store';

export interface RootEnv {
  todoService: Todoservice;
  isDev: Boolean;
}

export const createStore = () => {
  const env: RootEnv = {
    todoService: new Todoservice(),
    isDev: process.env.NODE_ENV == 'development',
  };

  const rootStore = wrapRoot({ RootStore, env });

  return rootStore as RootStore;
};
