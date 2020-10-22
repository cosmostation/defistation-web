import { observable, action } from 'mobx';

export default class AccountStore {
    @observable account = "";

    constructor(root) {
      this.root = root;
    }
    
    @action changeAccount = (value) => {
      this.account = value;
    };
}