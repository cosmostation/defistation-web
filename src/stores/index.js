import GlobalStore from './GlobalStore';

export default class RootStore {
  constructor() {
    this.global = new GlobalStore(this);
  }
}