import { observable, action } from 'mobx';

export default class GlobalStore {
  // @observable globalStore = 'hello';

  // constructor(root) {
  //   this.root = root;
  // }

  // @action changeStoreValue = (value) => {
  //   this.globalStore = value;
  // };
  // @action changeToWorld = () => {
  //   this.globalStore = "World";
  // }

  constructor(root) {
    this.root = root;
  }

  // @observable loginFlag = false;
  // @action changeLoginFlag = (value) => {
  //   this.loginFlag = value;
  // };

  // @observable selectedChain = 'cosmos';
  // @action changeSelectedChain = (value) => {
  //   this.selectedChain = value;
  // };

  // @observable selectedChainNum = 0;
  // @action changeSelectedChainNum = (value) => {
  //   this.selectedChainNum = value;
  // };

  // @observable TIMEOUT = 1000;
  // @observable LONG_TIMEOUT = 10000;

  // @observable transport = null;
  // @action changeTransport = (value) => {
  //   this.transport = value;
  // };

  // @observable hdPath = [44, 118, 0, 0, 0];
  // @action changeHdPath = (value) => {
  //   this.hdPath = value;
  // };

  // @observable userAddr = "";
  // @action changeUserAddr = (value) => {
  //   this.userAddr = value;
  // };

  // // 유저 리워드 이자 받는 주소
  // @observable userRewardAddr = "";
  // @action changeUserRewardAddr = (value) => {
  //   this.userRewardAddr = value;
  // };

  // // ----------------------- ConnectBtn -----------------------
  // @observable ledgerApiUsingNonce = 0;
  // @action changeLedgerApiUsingNonce = (value) => {
  //   this.ledgerApiUsingNonce = value;
  // };
  
  // @observable currentPageNumOnConnectAddrTable = 0;
  // @action changeCurrentPageNumOnConnectAddrTable = (value) => {
  //   this.currentPageNumOnConnectAddrTable = value;
  // };

  // // ----------------------- Market 정보 -----------------------
  // @observable coinPrice = "";
  // @action changeCoinPrice = (value) => {
  //   this.coinPrice = value;
  // };

  // @observable coinPriceChange = "";
  // @action changeCoinPriceChange = (value) => {
  //   this.coinPriceChange = value;
  // };

  // @observable coinMarketCap = 0;
  // @action changeCoinMarketCap = (value) => {
  //   this.coinMarketCap = value;
  // };

  @observable totalValueLockedUsd = "$ 0";
  @action changeTotalValueLockedUsd = (value) => {
    this.totalValueLockedUsd = value;
  };

}