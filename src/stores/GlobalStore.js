import { action, observable } from 'mobx';

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

  // TXs 24h
  @observable transactions24h = 0;
  @action changeTransactions24h = (value) => {
    this.transactions24h = value;
  };

  // TXs 24h 변화(%)
  @observable transactions24hPercent = "";
  @action changeTransactions24hPercent = (value) => {
    this.transactions24hPercent = value;
  };

  // Trending
  @observable trending = [];
  @action changeTrending = (value) => {
    this.trending = value;
  };

  // Trending 24h 변화(%)
  @observable trending24hPercent = [];
  @action changeTrending24hPercent = (value) => {
    this.trending24hPercent = value;
  };

  // // Token Price
  // @observable tokenPrice = 0;
  // @action changeTokenPrice = (value) => {
  //   this.tokenPrice = value;
  // };

  // // Token Price 24h 변화(%)
  // @observable tokenPrice24hPercent = 0;
  // @action changeTokenPrice24hPercent = (value) => {
  //   this.tokenPrice24hPercent = value;
  // };
}