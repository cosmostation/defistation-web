import AccountStore from './AccountStore';
import GlobalStore from './GlobalStore';

export default class RootStore {
  constructor() {
    // inject 이름 만드는 곳
    this.account = new AccountStore(this);
    this.global = new GlobalStore(this);
  }
}