import GlobalView from './global-view';
import RootStore from '../root-store';

export default class UiStore {
  globalView: GlobalView;

  constructor() {
    this.globalView = new GlobalView();
  }
}
