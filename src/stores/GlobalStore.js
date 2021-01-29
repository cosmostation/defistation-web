import { observable, action } from 'mobx';

export default class GlobalStore {
  constructor(root) {
    this.root = root;
  }

  @observable defistationApiUrl = "https://api.defistation.io";
  @observable auth = "Basic OmMyNDVhNGEyLTYxZjgtMTFlYi1hZTkzLTAyNDJhYzEzMDAwMg==";

  // 메인에서 차트 데이터 가져올 때 details 저장용(홈화면 하단 1 Day Change 보여주기 위해...)
  @observable chartDataDetails = null;
  @action changeChartDataDetails = (value) => {
    this.chartDataDetails = value;
  };

  @observable totalValueLockedUsd = "$ 0";
  @action changeTotalValueLockedUsd = (value) => {
    this.totalValueLockedUsd = value;
  };

  @observable tvl1DayPercent = 0;
  @action changeTvl1DayPercent = (value) => {
    this.tvl1DayPercent = value;
  };


}