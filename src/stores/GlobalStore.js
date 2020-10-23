import { observable, action } from 'mobx';

export default class GlobalStore {
  constructor(root) {
    this.root = root;
  }

  @observable defistationApiUrl = "https://api.defistation.io";

  @observable totalValueLockedUsd = "$ 0";
  @action changeTotalValueLockedUsd = (value) => {
    this.totalValueLockedUsd = value;
  };

  @observable tvl1DayPercent = 0;
  @action changeTvl1DayPercent = (value) => {
    this.tvl1DayPercent = value;
  };


}