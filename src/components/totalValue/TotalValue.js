import React, { Component, Fragment, useState, useEffect } from 'react';
import { MediaQuery } from 'react-responsive'
import { observer } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import useStores from '../../useStores';

import { numberWithCommas, capitalize, replaceAll, getCurrencyUnit, getCurrencyUnitFullName, getCurrencyDigit, getOfficialDefiName } from '../../util/Util';

import TvlLink from './tvlLink/TvlLink';

import Chart from "react-google-charts";

import defistationApplicationList from "../../defistationApplicationList.json";

import loading from "../../assets/images/loading.gif";

import defaultIcon from "../../assets/images/defiLogo/project-none@2x.png";
import bscLogo from "../../assets/images/bsc_logo@2x.png";
import bscScanLogo from "../../assets/images/bscscan_logo@2x.png";
import exchangeLogo from "../../assets/images/exchange_logo@2x.png";
import cosmostationLogo from "../../assets/images/cosmostation_logo@2x.png";
// 프로젝트 아이콘
import alphafinance from "../../assets/images/defiLogo/alphafinance@2x.png";
import bakeryswap from "../../assets/images/defiLogo/bakeryswap@2x.png";
import beefyfinance from "../../assets/images/defiLogo/beefyfinance@2x.png";
import bscswap from "../../assets/images/defiLogo/bscswap@2x.png";
import burgerswap from "../../assets/images/defiLogo/burgerswap@2x.png";
import creamfinance from "../../assets/images/defiLogo/creamfinance@2x.png";
import fortube from "../../assets/images/defiLogo/fortube@2x.png";
import fryworld from "../../assets/images/defiLogo/fryworld@2x.png";
import pancake from "../../assets/images/defiLogo/pancakeswap@2x.png";
import peachswap from "../../assets/images/defiLogo/peachswap@2x.png";
import spartanprotocol from "../../assets/images/defiLogo/spartanprotocol@2x.png";
import stakecow from "../../assets/images/defiLogo/stakecow@2x.png";
import streamity from "../../assets/images/defiLogo/streamity@2x.png";
import stormswap from "../../assets/images/defiLogo/stormswap@2x.png";
import narwhalswap from "../../assets/images/defiLogo/narwhalswap@2x.png";
import bnexchange from "../../assets/images/defiLogo/bnexchange@2x.png";
import softdrinkswap from "../../assets/images/defiLogo/softdrinkswap@2x.png";
import nyanswap from "../../assets/images/defiLogo/nyanswap@2x.png";
import sevenupfinance from "../../assets/images/defiLogo/7upfinance@2x.png";
import bfisfinance from "../../assets/images/defiLogo/bfisfinance@2x.png";
import bstablefinance from "../../assets/images/defiLogo/bstablefinance@2x.png";
import dego from "../../assets/images/defiLogo/dego@2x.png";
import equatorfinance from "../../assets/images/defiLogo/equatorfinance@2x.png";
import stablexswap from "../../assets/images/defiLogo/stablexswap@2x.png";
import qian from "../../assets/images/defiLogo/qian@2x.png";
import pancakebunny from "../../assets/images/defiLogo/pancakebunny@2x.png";
import julswap from "../../assets/images/defiLogo/julswap@2x.png";
import justliquidity from "../../assets/images/defiLogo/justliquidity@2x.png";
import anyswap from "../../assets/images/defiLogo/anyswap@2x.png";
import cokefinance from "../../assets/images/defiLogo/cokefinance@2x.png";
import renvm from "../../assets/images/defiLogo/renvm@2x.png";
import unifiprotocol from "../../assets/images/defiLogo/unifiprotocol@2x.png";
import venus from "../../assets/images/defiLogo/venus@2x.png";
import thugs from "../../assets/images/defiLogo/thugs@2x.png";
import cberry from "../../assets/images/defiLogo/cberry@2x.png";
import jetfuel from "../../assets/images/defiLogo/jetfuel@2x.png";
import acryptos from "../../assets/images/defiLogo/acryptos@2x.png";
import autofarm from "../../assets/images/defiLogo/autofarm@2x.png";
import basddollar from "../../assets/images/defiLogo/basddollar@2x.png";
import bdollar from "../../assets/images/defiLogo/bdollar@2x.png";
import bscfarm from "../../assets/images/defiLogo/bscfarm@2x.png";
import MidasDollar from "../../assets/images/defiLogo/MidasDollar@2x.png";
import LinearFinance from "../../assets/images/defiLogo/LinearFinance@2x.png";
import KEEP3RBSC from "../../assets/images/defiLogo/KEEP3RBSC@2x.png";
import kebab from "../../assets/images/defiLogo/kebab@2x.png";
import goosefinance from "../../assets/images/defiLogo/goosefinance@2x.png";
import CrowFinance from "../../assets/images/defiLogo/CrowFinance@2x.png";
import CheeseSwap from "../../assets/images/defiLogo/CheeseSwap@2x.png";
import bscex from "../../assets/images/defiLogo/bscex@2x.png";
import derifinance from "../../assets/images/defiLogo/derifinance@2x.png";
import beltfinance from "../../assets/images/defiLogo/belt@2x.png";
import bifi from "../../assets/images/defiLogo/bififinance@2x.png";
import blackholeswap from "../../assets/images/defiLogo/blackholeswap@2x.png";
import multiplier from "../../assets/images/defiLogo/multiplier@2x.png";
import pikafinance from "../../assets/images/defiLogo/pikafinance@2x.png";
import bscrunner from "../../assets/images/defiLogo/bscrunner@2x.png";
import ellipsisfinance from "../../assets/images/defiLogo/ellipsisfinance@2x.png";
import demex from "../../assets/images/defiLogo/demex@2x.png";
import dodo from "../../assets/images/defiLogo/dodo@2x.png";
import helmet from "../../assets/images/defiLogo/helmet@2x.png";
import ariesfinancial from "../../assets/images/defiLogo/ariesfinancial@2x.png";

import alphahomora from "../../assets/images/defiLogo/alphahomora@2x.png";
import cobaltfinance from "../../assets/images/defiLogo/cobaltfinance@2x.png";
import swampfinance from "../../assets/images/defiLogo/swampfinance@2x.png";

// Defi Link 아이콘
import defiOfficialSiteIcon from "../../assets/images/defiLink/officialsite.svg";
import defiGithubIcon from "../../assets/images/defiLink/github.svg";
import defiDocsIcon from "../../assets/images/defiLink/docs.svg";
import defiTwitterIcon from "../../assets/images/defiLink/twitter.svg";
import defiTelegramIcon from "../../assets/images/defiLink/telegram.svg";
import defiBlogIcon from "../../assets/images/defiLink/blog.svg";
import { find } from 'lodash';

const TotalValue = observer((props) => {
    const { global } = useStores();

    const history = useHistory();
    const location = useLocation();

    const [responseError, setResponseError] = useState();
    const [response, setResponse] = useState({});

    // all, 1year, 90days
    const [chartPeriod, setChartPeriod] = useState("90");    // 7, 30, 90, 365

    const [chartLegendLabel, setChartLegendLabel] = useState();

    const [chartData, setChartData] = useState(['x', 'TVL(USD)']);
    const [totalValueLockedUsd, setTotalValueLockedUsd] = useState(0);
    const [minTvl, setMinTvl] = useState(0);
    const [linkTag, setLinkTag] = useState("");
    const [defiIcon, setDefiIcon] = useState();

    // 차트 오른쪽 Unit: TXs or USD
    const [dualYUnitText, setDualYUnitText] = useState("TXs");

    const [projectBtnLink, setProjectBtnLink] = useState();

    const [currencyFullName, setCurrencyFullName] = useState("");

    // PC에서는 Total Value Locked, mobile에서는 TVL
    // const [tvlChartCardTitleValue, setTvlChartCardTitleValue] = useState("Total Value Locked");
    // const [tvlChartCardTitleValue, setTvlChartCardTitleValue] = useState("TVL & TXs in BSC");
    const [tvlChartCardTitleValue, setTvlChartCardTitleValue] = useState("TVL");

    // 1) 1034px 이상
    const [viewWidth, setViewWidth] = useState("740px");
    // const [viewWidth, setViewWidth] = useState("80vw");
    const [chartWidth, setChartWidth] = useState("89%");

    // https://github.com/rakannimer/react-google-charts/issues/209
    const [fakeControls, setFakeControls] = useState([]);

    // 2) 1024px: 270px, 88%
    // 3) 768px: 270px, 88%
    // 4) 414px ~ 767px: 374px, 88%
    // 5) 360px ~ 413px: 290px, 88%
    // 6) 1px ~ 359px: 270px, 88%

    // const defistationApiUrl = "https://api.defistation.io";

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function getMonthAndDay(date) {
        let monthName = monthNames[date.getMonth()];
        let day = date.getDate();
        return monthName + " " + day;
    }

    // const [urlFlag1, setUrlFlag1] = useState(false);
    const [urlFlagDetail, setUrlFlagDetail] = useState("");

    async function getChart(defiName) {
        // if (defiName == "DeFi") {
        //     if (urlFlag1) return;
        // }
        // setUrlFlag1(true);
        
        // console.log("getChart 함수 시작");

        let urlStr = "";
        if (defiName == "DeFi") {
            urlStr = "all";
            setChartData(['x', 'TVL(USD)', 'TXs in BSC']);
        } else {
            urlStr = defiName;
            setChartData(['x', 'TVL(USD)', 'Token Price(USD)']);
        }

        // console.log("urlStr: ", urlStr);
        if (urlStr == "") {
            global.changeTotalValueLockedUsd("$ 0");
            global.changeTvl1DayPercent(0);
            return;
        }

        // let chartFullUrl;
        // if (chartPeriod == 7) {
        //     // default
        //     chartFullUrl = "/chart/" + urlStr + "?days=" + chartPeriod;
        // } else {
        //     chartFullUrl = "/chart/" + urlStr + "?days=" + chartPeriod;
        // }

        let chartFullUrl = "/chart/" + urlStr + "?days=" + chartPeriod;

        // detail
        if (urlFlagDetail == chartFullUrl) return;
        setUrlFlagDetail(chartFullUrl);

        const res = await fetch(global.defistationApiUrl + chartFullUrl, {
            method: 'GET',
            headers: {
                Authorization: global.auth
            }
        });
        res
            .json()
            .then(res => {
                // console.log("res: ", res);

                // data={[
                //     ['x', 'TVL(USD)'],
                //     ["Jan", 1400],
                //     ["Feb", 1300],
                //     ["Mar", 3510],
                //     ["Apr", 1070],
                //     ["May", 2480],
                //     ["Jun", 5140],
                //     ["Jul", 5520],
                //     ["Aug", 8830],
                // ]}
                // let tempChartData = [['x', 'TVL(USD)']];

                // ------------ 메인 페이지 TVL ------------
                let tempChartData = [];
                let initProjectTvlIndex = -1;

                let currentTokenPrice = 0;

                if (res.result == null) {
                    setMinTvl(0);
                    global.changeTotalValueLockedUsd("$ 0");
                    return;
                }

                // res.result 를 배열로 바꾸기 
                let resultObj = res.result;
                var resultArr = Object.keys(resultObj).map((key) => [Number(key), resultObj[key]]);

                // ------------ 메인 페이지 TXs ------------
                if (defiName == "DeFi") {
                    setChartLegendLabel(<><span className="circleYellow">⦁</span> TVL <span className="circleGray">⦁</span> TXs in BSC</>);

                    let dailyTxObj = res.dailyTx;
                    var dailyTxArr = Object.keys(dailyTxObj).map((key) => [Number(key), dailyTxObj[key]]);

                    // console.log("dailyTxArr: ", dailyTxArr);

                    // 최신 TXs 값 구하기. 최신 TXs 변화 % 계산하기
                    let latestTxVal = 0;
                    let latestTxChange = 0;
                    for (var j = 0; j < dailyTxArr.length; j++) {
                        if (j > 0) {
                            if (dailyTxArr[j][1] > 0) latestTxVal = dailyTxArr[j][1];
                            if (dailyTxArr[j - 1][1] > 0 && dailyTxArr[j][1] > 0) latestTxChange = (dailyTxArr[j][1] - dailyTxArr[j - 1][1]) / dailyTxArr[j][1] * 100;
                        }
                    }
                    
                    console.log("latestTxVal: ", latestTxVal);
                    console.log("latestTxChange: ", latestTxChange.toFixed(2));

                    global.changeTransactions24h(numberWithCommas(latestTxVal));
                    global.changeTransactions24hPercent(latestTxChange.toFixed(2));
                } else {
                    // 서브 페이지
                    let index = findDefiIndexNum(defiName);
                    let tokenSymbolName = (defistationApplicationList[index]["Ticker"]).toUpperCase();

                    setTvlChartCardTitleValue("TVL & " + "Token" + " Price");

                    // token price
                    let priceObj = res.price;
                    var priceArr = Object.keys(priceObj).map((key) => [Number(key), priceObj[key]]);
                    // console.log("priceArr: ", priceArr);

                    if (priceArr.length > 0) {
                        setChartLegendLabel(<><span className="circleYellow">⦁</span> TVL <span className="circleGreen">⦁</span> {tokenSymbolName} Price</>);
                    } else {
                        // defi 프로젝트에 토큰 가격이 없는 경우
                        setChartLegendLabel(<><span className="circleYellow">⦁</span> TVL</>);
                    }

                    // // 최신 TXs 값 구하기. 최신 TXs 변화 % 계산하기
                    // let latestTxVal = 0;
                    // let latestTxChange = 0;
                    // for (var j = 0; j < priceArr.length; j++) {
                    //     if (j > 0) {
                    //         if (priceArr[j][1] > 0) latestTxVal = priceArr[j][1];
                    //         if (priceArr[j - 1][1] > 0 && priceArr[j][1] > 0) latestTxChange = (priceArr[j][1] - priceArr[j - 1][1]) / priceArr[j][1] * 100;
                    //     }
                    // }
                }

                // console.log("dailyTxArr: ", dailyTxArr);

                let initTimestamp = 0;
                let tempMinTvl;

                // K, M, B 기준은 최초 0번째 데이터(단, 0번째가 0이 아닐때)
                // let digit = getCurrencyDigit(resultArr[0][1]);
                // let currencyUnit = getCurrencyUnit(resultArr[0][1]);
                // let tempCurrencyFullName = getCurrencyUnitFullName(resultArr[0][1]);
                let digit;
                let currencyUnit;
                let tempCurrencyFullName;
                // if (resultArr[0][1] > 0) {
                //     digit = getCurrencyDigit(resultArr[0][1]);
                //     currencyUnit = getCurrencyUnit(resultArr[0][1]);
                //     tempCurrencyFullName = getCurrencyUnitFullName(resultArr[0][1]);
                // } else {
                //     digit = getCurrencyDigit(resultArr[resultArr.length - 1][1]);
                //     currencyUnit = getCurrencyUnit(resultArr[resultArr.length - 1][1]);
                //     tempCurrencyFullName = getCurrencyUnitFullName(resultArr[resultArr.length - 1][1]);
                // }
                // Billion!
                digit = getCurrencyDigit(resultArr[resultArr.length - 1][1]);
                currencyUnit = getCurrencyUnit(resultArr[resultArr.length - 1][1]);
                tempCurrencyFullName = getCurrencyUnitFullName(resultArr[resultArr.length - 1][1]);
                setCurrencyFullName(tempCurrencyFullName);

                // console.log("resultArr.length: ", resultArr.length);
                
                for (var i = 0; i < resultArr.length; i++) {
                    if (i == 0) {
                        initTimestamp = resultArr[i][0];
                    }

                    // console.log("resultArr[i][0]: ", resultArr[i][0]);
                    // console.log("resultArr[i][1]: ", resultArr[i][1]);

                    // let digit = getCurrencyDigit(resultArr[i][1]);
                    // console.log("digit: ", digit);

                    let currencyNum = (resultArr[i][1] / digit).toFixed(3) * 1;

                    // console.log("currencyNum: ", currencyNum);

                    if (i == 0) {
                        // tempMinTvl = currencyNum;
                        if (currencyNum > 0) {
                            tempMinTvl = currencyNum;
                        }
                    } else {
                        // 가장 작은 값 찾기(vAxis 최솟값)
                        if (tempMinTvl > currencyNum) {
                            // tempMinTvl = currencyNum;
                            if (currencyNum > 0) {
                                tempMinTvl = currencyNum;
                            }
                        }
                    }

                    // console.log("tempMinTvl: ", tempMinTvl);

                    // 이전 연속 2개의 값이 0이 아니라면 직전 값으로 보정한다. (미싱 데이터 보정)
                    if (currencyNum == 0) {
                        // 이전 2개의 값이 0인가?
                        if (i > 2) {
                            let prevCurrentNum1 = (resultArr[i - 1][1] / digit).toFixed(3) * 1;
                            let prevCurrentNum2 = (resultArr[i - 2][1] / digit).toFixed(3) * 1;

                            // if (prevCurrentNum1 > 0 && prevCurrentNum2 > 0) {
                            //     currencyNum = prevCurrentNum1;
                            // }
                            if (prevCurrentNum1 > 0) {
                                currencyNum = prevCurrentNum1;
                            } else if (prevCurrentNum2 > 0) {
                                currencyNum = prevCurrentNum2;
                            }
                        }
                    }

                    // 신규 프로젝트인 경우 7d, 30d 일 때 앞에 tvl 값이 0이 연속으로 오는 경우 해당 배열 요소 제거
                    // tempChartData[0][1] 이 0인가?
                    // 연속으로 0인가? -> 차트 추가 안함
                    if (i == 0) {
                        if (currencyNum == 0) {
                            initProjectTvlIndex = 0;
                        }
                    }

                    if (initProjectTvlIndex > -1) {
                        if (currencyNum == 0) {
                            initProjectTvlIndex = i;
                        } else {
                            initProjectTvlIndex = -1;
                        }
                    }
                    
                    
                    
                    // dailyTxArr
                    if (initProjectTvlIndex == -1) {
                        if (defiName == "DeFi") {
                            // 메인 페이지
                            let tempDailyTx = dailyTxArr[i][1];
                            if (tempDailyTx == 0) {
                                tempDailyTx = null;
                            }
                            tempChartData.push([getMonthAndDay(new Date(resultArr[i][0] * 1000)), currencyNum, tempDailyTx]);
                        } else {
                            // console.log("[0416] 테스트3333333");
                            // 서브 페이지
                            let tempPrice = null;
                            // let prevPrice = null;
                            // console.log("[0416] priceArr: ", priceArr);
                            if (priceArr.length > 0) {
                                tempPrice = priceArr[i][1];
                                tempChartData.push([getMonthAndDay(new Date(resultArr[i][0] * 1000)), currencyNum, tempPrice]);

                                // 서브 페이지 miniCard 용
                                // global.changeTokenPrice(tempPrice);

                                // if (priceArr[i - 1] != undefined) {
                                //     prevPrice = priceArr[i - 1][1];
                                // }

                                // let tempPriceChange24h = (tempPrice - prevPrice) / tempPrice;
                                // if (tempPriceChange24h != 0) {
                                //     console.log("[0423] tempPriceChange24h: ", tempPriceChange24h);
                                //     global.changeTokenPrice24hPercent(tempPriceChange24h);
                                // }
                                
                            } else {
                                tempChartData.push([getMonthAndDay(new Date(resultArr[i][0] * 1000)), currencyNum]);
                            }

                            // <span className="circleGray">⦁</span> TXs in BSC
                            // setChartLegendLabel(<><span className="circleYellow">⦁</span> TVL <span className="circleGray">⦁</span> TXs in BSC</>);
                        }
                    } else {
                        if (defiName == "DeFi") {
                            // 메인 페이지
                            tempChartData.push([getMonthAndDay(new Date(resultArr[i][0] * 1000)), null, null]);
                        } else {
                            // 서브 페이지
                            // tempChartData.push([getMonthAndDay(new Date(resultArr[i][0] * 1000)), null]);
                        }
                    }
                    
                    if (i == resultArr.length - 1) {
                        setTotalValueLockedUsd(currencyNum + " " + currencyUnit);
                        // global.changeTotalValueLockedUsd("$ " + currencyNum + " " + currencyUnit);
                        global.changeTotalValueLockedUsd("$ " + numberWithCommas(resultArr[i][1]));
                    }
                }
                
                // 차트 데이터가 7개가 안채워졌으면 앞에 채워넣기
                // if (chartPeriod - resultArr.length > 0) {
                //     let createEmptyDataLength = chartPeriod - resultArr.length;
                //     // console.log("createEmptyDataLength: ", createEmptyDataLength);
                //     for (var i = 0; i < createEmptyDataLength; i++) {
                //         let calTimestamp = initTimestamp - (86400 * (i + 1));
                //         // tempChartData 의 제일 앞에 넣어야함
                //         tempChartData.unshift([getMonthAndDay(new Date(calTimestamp * 1000)), 0]);
                //     }
                // }

                // 차트 데이터가 7개 또는 30개가 안채워졌으면 뒤에 채워넣기
                // let chartGap = resultArr.length - tempChartData.length;
                // if (chartGap > 0) {
                //     let lastTimestamp = resultArr[resultArr.length - 1][0];
                //     for (var i = 0; i < chartGap; i++) {
                //         let calTimestamp = lastTimestamp + (86400 * (i + 1));
                //         tempChartData.push([getMonthAndDay(new Date(calTimestamp * 1000)), null]);
                //     }
                // }

                // 차트: 7d, 30d
                if (tempChartData.length > chartPeriod) {
                    let remainDataLength = tempChartData.length - chartPeriod;
                    for (var i = 0; i < remainDataLength; i++) {
                        tempChartData.shift();  // 맨 앞 원소 제거
                    }
                }

                tempMinTvl = Math.floor(tempMinTvl * 0.9);
                // 차트 최솟값 설정(차트 모양 예쁘게 하기 위함)
                setMinTvl(tempMinTvl);
                // 차트 데이터 적용
                if (defiName == "DeFi") {
                    // 메인 페이지
                    tempChartData.unshift(['x', 'TVL(USD)', 'TXs in BSC']);
                } else {
                    // 서브 페이지
                    if (priceArr.length > 0) {
                        tempChartData.unshift(['x', 'TVL(USD)', 'Token Price(USD)']);
                    } else {
                        tempChartData.unshift(['x', 'TVL(USD)']);
                    }
                }
                setChartData(tempChartData);

                // TVL 1 DAY(%)
                // resultArr 가 2개 이상 요소를 가지고 있어야함. 그리고 가장 마지막과 그 이전의 % 차이를 계산하면 됨
                if (resultArr.length >= 2) {
                    let latestTvl = resultArr[resultArr.length - 1][1];
                    let pastTvl = resultArr[resultArr.length - 2][1];

                    // console.log("latestTvl: ", latestTvl);
                    // console.log("pastTvl: ", pastTvl);
                    // console.log("((1 - pastTvl / latestTvl) * 100).toFixed(2) * 1: ", ((1 - pastTvl / latestTvl) * 100).toFixed(2) * 1);

                    let resultTvl1DayPercent = ((1 - pastTvl / latestTvl) * 100).toFixed(2) * 1;
                    if (!isNaN(resultTvl1DayPercent)) {
                        // 숫자인 경우에만
                        global.changeTvl1DayPercent(resultTvl1DayPercent);
                    } else {
                        global.changeTvl1DayPercent(0);
                    }

                    // 숫자가 이상한 경우 (2020.12.7 09:00 PM)
                    if (resultTvl1DayPercent > 1000) {
                        global.changeTvl1DayPercent(0);
                    }
                } else {
                    // 계산할 값이 없으면 0
                    global.changeTvl1DayPercent(0);
                }

                // 홈 하단 1 Day Change 계산
                console.log("res.details: ", res.details);  // undefined
                let resultDetailsObj = res.details;
                global.changeChartDataDetails(resultDetailsObj);
            })
            .catch(err => setResponseError(err));
    }

    function movePage(path) {
        history.push(path);
    }

    function openWindow(path) {
        window.open(path);
    }

    function findDefiIndexNum(defiName) {
        // 예외처리
        if (defiName == "pancake") {
            defiName = "PancakeSwap";
        }
        
        let index = 0;
        for (var i = 0; i < defistationApplicationList.length; i++) {
            if (defistationApplicationList[i]["Official Project Name"] == defiName) {
                index = i;
                break;
            }
        }
        return index;
    }

    function findLogoUrl(defiName) {
        // defistationApplicationList 에서 Official Project Name 이 defiName와 일치하는 것 찾기

        // 예외처리
        if (defiName == "pancake") {
            defiName = "PancakeSwap";
        }
        
        let logoUrl = "";
        for (var i = 0; i < defistationApplicationList.length; i++) {
            if (defistationApplicationList[i]["Official Project Name"] == defiName) {
                logoUrl = defistationApplicationList[i]["Project Logo URL (68px*68px png ONLY. Given link should directly DISPLAY Logo image without any BACKGROUND. Google drive link is NOT accepted.)"];
                break;
            }
        }
        return logoUrl;
    }

    function selectOfficialLink(defiName) {
        switch (defiName) {
            case "pancake":
                setDefiIcon(pancake);
                break;
            case "Peach Swap":
                setDefiIcon(peachswap);
                break;   
            case "Streamity":
                setDefiIcon(streamity);
                break;   
            case "bscSwap":
                setDefiIcon(bscswap);
                break;   
            case "Spartan Protocol":
                setDefiIcon(spartanprotocol);
                break;   
            case "Burger Swap":
                setDefiIcon(burgerswap);
                break;   
            case "Stakecow":
                setDefiIcon(stakecow);
                break;   
            case "Alpha Finance":
                setDefiIcon(alphafinance);
                break;   
            case "Cream Finance":
                setDefiIcon(creamfinance);
                break;   
            case "Bakery Swap":
                setDefiIcon(bakeryswap);
                break;   
            case "ForTube":
                setDefiIcon(fortube);
                break;   
            case "FryWorld":
                setDefiIcon(fryworld);
                break;   
            case "beefy.finance":
                setDefiIcon(beefyfinance);
                break;
            case "Narwhalswap":
                setDefiIcon(narwhalswap);
                break;   
            case "STORMSWAP":
                setDefiIcon(stormswap);
                break;       
            case "BnEX":
                setDefiIcon(bnexchange);
                break;
            case "7up.finance":
                setDefiIcon(sevenupfinance);
                break;
            case "BFis.finance":
                setDefiIcon(bfisfinance);
                break;
            case "bStable.finance":
                setDefiIcon(bstablefinance);
                break;
            case "Dego":
                setDefiIcon(dego);
                break;
            case "Equator.finance":
                setDefiIcon(equatorfinance);
                break;
            case "StableXSwap":
                setDefiIcon(stablexswap);
                break;
            case "QIAN":
                setDefiIcon(qian);
                break;    
            case "PancakeBunny":
                setDefiIcon(pancakebunny);
                break;
            case "JulSwap":
                setDefiIcon(julswap);
                break;
            case "JustLiquidity":
                setDefiIcon(justliquidity);
                break;
            case "AnySwap":
                setDefiIcon(anyswap);
                break;
            case "CokeFinance":
                setDefiIcon(cokefinance);
                break;
            case "renVM":
                setDefiIcon(renvm);
                break;
            case "UniFi":
                setDefiIcon(unifiprotocol);
                break;
            case "Venus":
                setDefiIcon(venus);
                break;   
            case "Thugs":
                setDefiIcon(thugs);
                break; 
            case "CBerry":
                setDefiIcon(cberry);
                break; 
            case "Jetfuel.Finance":
                setDefiIcon(jetfuel);
                break;  
            case "ACryptoS":
                setDefiIcon(acryptos);
                break; 
            case "BSC Farm":
                setDefiIcon(bscfarm);
                break;   
            case "bDollar Protocol":
                setDefiIcon(bdollar);
                break;   
            case "Autofarm":
                setDefiIcon(autofarm);
                break;   
            case "Binance Agile Set Dollar":
                setDefiIcon(basddollar);
                break;
            case "Kebab Finance":
                setDefiIcon(kebab);
                break;
            case "KEEP3R BSC NETWORK":
                setDefiIcon(KEEP3RBSC);
                break;
            case "CheeseSwap":
                setDefiIcon(CheeseSwap);
                break;
            case "Midas Dollar":
                setDefiIcon(MidasDollar);
                break;
            case "CrowFinance":
                setDefiIcon(CrowFinance);
                break;
            case "Goose Finance":
                setDefiIcon(goosefinance);
                break;
            case "BSCex":
                setDefiIcon(bscex);
                break;
            case "Linear Finance":
                setDefiIcon(LinearFinance);
                break;
            case "Deri Protocol":
                setDefiIcon(derifinance);
                break;
            case "Belt Finance":
                setDefiIcon(beltfinance);
                break;
            case "BiFi":
                setDefiIcon(bifi);
                break;
            case "Multi-Chain Lend (MCL)":
                setDefiIcon(multiplier);    
                break;    
            case "BlackHoleSwap":
                setDefiIcon(blackholeswap);    
                break;
            case "Pika Finance":
                setDefiIcon(pikafinance);    
                break;  
            case "Bscrunner":
                setDefiIcon(bscrunner);    
                break;    
            case "Ellipsis Finance":
                setDefiIcon(ellipsisfinance);    
                break;
            case "DODO":
                setDefiIcon(dodo);
                break;
            case "Demex":
                setDefiIcon(demex);
                break;
            case "Helmet":
                setDefiIcon(helmet);
                break;  
            case "ARIES FINANCIAL":
                setDefiIcon(ariesfinancial);
                break; 
            case "Alpha Homora":
                setDefiIcon(alphahomora);
                break;    
            case "Cobalt.finance":
                setDefiIcon(cobaltfinance);
                break;
            case "SwampFinance":
                setDefiIcon(swampfinance);
                break;
            default:
                let logoUrl = findLogoUrl(defiName);

                console.log("logoUrl: ", logoUrl);

                if (logoUrl != "") {
                    setDefiIcon(logoUrl);
                } else {
                    setLinkTag("");
                }
                break;    
        }

        {/* pancake */}
        // <div className="defiDetailPageLink noDrag" style={props.defiName == "pancake" ? undefined : { display: "none" } }>
        //     <div className="subPageDefiLinkBox" onClick={() => openWindow("https://pancakeswap.finance/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
        //     <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/pancakeswap")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
        //     <div className="subPageDefiLinkBox" onClick={() => openWindow("https://docs.pancakeswap.finance/")} style={{"clear": "both"}}><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
        //     <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/pancakeswap")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
        //     <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/PancakeSwap")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
        //     <div className="subPageDefiLinkBox" onClick={() => openWindow("https://medium.com/@pancakeswap")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
        // </div>

        // defistationApplicationList.json 에서 i 번째... i가 뭔지 찾기

        let index = findDefiIndexNum(defiName);

        setProjectBtnLink(
            <div className="defiDetailPageLink noDrag">
                {
                    defistationApplicationList[index]["Project Official Website (URL)"] != undefined
                    ? <div className="subPageDefiLinkBox" onClick={() => openWindow(defistationApplicationList[index]["Project Official Website (URL)"])}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                    : <div className="subPageDefiLinkBox disableBtn"><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                }
                {
                    defistationApplicationList[index]["Github URL"] != undefined
                    ? <div className="subPageDefiLinkBox" onClick={() => openWindow(defistationApplicationList[index]["Github URL"])}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                    : <div className="subPageDefiLinkBox disableBtn"><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                }
                {
                    defistationApplicationList[index]["Developer Docs URL"] != undefined
                    ? <div className="subPageDefiLinkBox" onClick={() => openWindow(defistationApplicationList[index]["Developer Docs URL"])}><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                    : <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                }
                {
                    defistationApplicationList[index]["Twitter URL"] != undefined
                    ? <div className="subPageDefiLinkBox" onClick={() => openWindow(defistationApplicationList[index]["Twitter URL"])}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                    : <div className="subPageDefiLinkBox disableBtn"><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                }
                {
                    defistationApplicationList[index]["Telegram(EN) URL"] != undefined
                    ? <div className="subPageDefiLinkBox" onClick={() => openWindow(defistationApplicationList[index]["Telegram(EN) URL"])}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                    : <div className="subPageDefiLinkBox disableBtn"><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                }
                {
                    defistationApplicationList[index]["Medium Blog URL"] != undefined
                    ? <div className="subPageDefiLinkBox" onClick={() => openWindow(defistationApplicationList[index]["Medium Blog URL"])}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                    : <div className="subPageDefiLinkBox disableBtn"><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                }
            </div>
        );
    }

    // ------------ 모바일 구글 차트를 위한 resize 체크 START ------------
    // function resizeChart() {
    //     chart.draw(ChartData, options);
    // }

    function resizedw(){
        // Haven't resized in 100ms!

        console.log("[0427] window.innerWidth: ", window.innerWidth);
        console.log("[0427] screen.width: ", screen.width);

        if (isMobile) {
            if (screen.width <= 320) {
                if (viewWidth != "89vw") {
                    setViewWidth("89vw");
                }
            } else if (screen.width <= 1034) {
                console.log("1034 이하");
                if (viewWidth != "91vw") {
                    window.location.replace(location.pathname);
                }
            } else {
                console.log("1034 초과");
                if (viewWidth != "740px") {
                    window.location.replace(location.pathname);
                }
            }
        } else {
            if (window.innerWidth <= 320) {
                if (viewWidth != "89vw") {
                    setViewWidth("89vw");
                }
            } else if (window.innerWidth <= 1034) {
                console.log("1034 이하");
                if (viewWidth != "91vw") {
                    window.location.replace(location.pathname);
                }
            } else {
                console.log("1034 초과");
                if (viewWidth != "740px") {
                    window.location.replace(location.pathname);
                }
            }
        }
    }
    
    var doit;
    function checkWindowWidth() {
        // var doit;
        var width = window.innerWidth;
        // var height = window.innerHeight;

        window.onresize = function(){
            clearTimeout(doit);
            // doit = setTimeout(resizedw, 100);

            // if (window.innerWidth != width) {
            //     //Do something
            //     doit = setTimeout(resizedw, 100);
            // }

            // if ($(window).width() != width || $(window).height() != height) {
            //     //Do something
            // }

            if (window.innerWidth != width) {
                clearTimeout(doit);
                doit = setTimeout(resizedw, 100);
            }
        };
    }

    // function checkWindowWidth() {
    //     if (window.matchMedia("(max-width: 1035px)").matches) {
    //         /* the viewport is less than or exactly 500 pixels wide */
    //         console.log("1034 이하");
    //         // 홈 화면인 경우
    //         window.location.replace(location.pathname);

    //     } else {
    //         /* the viewport is more than 500 pixels wide */
    //         console.log("1034 초과");
    //         // 홈 화면인 경우
    //         window.location.replace(location.pathname);
    //     }
    // }
    // ------------ 모바일 구글 차트를 위한 resize 체크 END ------------

    var isMobile = false;

    useEffect(() => {
        getChart(props.defiName);

        

        // 2) 414px ~ 1034px: 374px, 88%
        // 3) 360px ~ 413px: 290px, 88%
        // 4) 1px ~ 359px: 270px, 88%

        // if (window.innerWidth >= 414 && window.innerWidth <= 1034) {
        //     setViewWidth("374px");
        //     setChartWidth("88%");
        //     setTvlChartCardTitleValue("TVL");
        // } else if (window.innerWidth >= 360 && window.innerWidth < 414) {
        //     setViewWidth("290px");
        //     setChartWidth("88%");
        //     setTvlChartCardTitleValue("TVL");
        // } else if (window.innerWidth >= 0 && window.innerWidth < 360) {
        //     setViewWidth("270px");
        //     setChartWidth("88%");
        //     setTvlChartCardTitleValue("TVL");
        // }

        // if (window.innerWidth <= 1034) {
        //     setViewWidth("870px");
        //     setChartWidth("89%");
        // } else {
        //     setViewWidth("740px");
        //     setChartWidth("89%");
        // }

        console.log("screen.width: ", screen.width);

        // 2) 1024px: 970px, 94%
        // 3) 768px: 708px, 94%
        // 4) 414px ~ 767px: 374px, 88%
        // 5) 360px ~ 413px: 290px, 88%
        // 6) 1px ~ 359px: 270px, 88%

        // var isMobile = false; //initiate as false
        // device detection
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
            isMobile = true;
        }

        // console.log("window.screen.orientation: ", window.screen.orientation);
        // if (isMobile && String(window.screen.orientation).indexOf("landscape") != -1 && screen.height >= 768) {
        //     setViewWidth("708px");
        //     setChartWidth("94%");
        //     setTvlChartCardTitleValue("TVL");
        // } else {
        //     if (!isMobile && window.innerWidth <= 1034) {
        //         setViewWidth("364px");
        //         setChartWidth("88%");
        //         setTvlChartCardTitleValue("TVL");
        //     } else {
        //         if (screen.width >= 1024 && screen.width < 1034) {
        //             setViewWidth("970px");
        //             setChartWidth("94%");
        //             setTvlChartCardTitleValue("TVL");
        //         } else if (screen.width >= 768 && screen.width < 1024) {
        //             setViewWidth("708px");
        //             setChartWidth("94%");
        //             setTvlChartCardTitleValue("TVL");
        //         } else if (screen.width >= 414 && screen.width < 768) {
        //             setViewWidth("364px");
        //             setChartWidth("88%");
        //             setTvlChartCardTitleValue("TVL");
        //         } else if (screen.width >= 360 && screen.width < 414) {
        //             setViewWidth("290px");
        //             setChartWidth("88%");
        //             setTvlChartCardTitleValue("TVL");
        //         } else if (screen.width >= 1 && screen.width < 360) {
        //             setViewWidth("270px");
        //             setChartWidth("88%");
        //             setTvlChartCardTitleValue("TVL");
        //         }
        //     }
        // }

        setFakeControls([]);
        // if (window.innerWidth <= 1034) {
        //     console.log("1034 이하");
        //     setViewWidth("91vw");
        // } else {
        //     console.log("1034 초과");
        //     setViewWidth("740px");
        // }

        if (isMobile) {
            console.log("[0427] 모바일 기기");

            if (screen.width > 1034) {
                console.log("1034 초과");
                setViewWidth("740px");
            } else if (screen.width <= 1034 && screen.width > 320) {
                console.log("1034 이하");
                // setViewWidth("91vw");

                if (props.defiName == "DeFi") {
                    // 메인 페이지
                    setViewWidth("91vw");
                } else {
                    // 서브 페이지
                    setViewWidth("88vw");
                }


            } else {
                console.log("320 이하");
                setViewWidth("87vw");
            }
        } else {
            if (window.innerWidth > 1034) {
                console.log("1034 초과");
                setViewWidth("740px");
            } else if (window.innerWidth <= 1034 && window.innerWidth > 320) {
                console.log("1034 이하");
                setViewWidth("91vw");
            } else {
                console.log("320 이하");
                setViewWidth("87vw");
            }
        }
        
        checkWindowWidth();

        console.count("TotalValue render");
        console.log("props.defiName: ", props.defiName);

        selectOfficialLink(props.defiName);

        if (props.defiName == "DeFi") {
            // 메인 페이지
            setDualYUnitText("TXs");
        } else {
            // 서브 페이지
            setDualYUnitText("USD");
        }

        return () => {
            // console.log('cleanup');
            // clearTimeout(timer);
        };
    }, [props.defiName, global.tvl1DayPercent, linkTag, viewWidth, chartPeriod])

    return (
        <div className="totalValue">
            {/* subpage 타이틀 */}
            <div>
                <ul className="tvlTitleBox" style={props.defiName != "DeFi" ? undefined : {display: "none"}}>
                    <li>
                        <ul className="tvlSubPageTitleIconLabel">
                            <li><img src={defiIcon} onError={(e)=>{e.target.onerror = null; e.target.src=defaultIcon}} /></li>
                            <li><span>{getOfficialDefiName(props.defiName)}</span></li>
                        </ul>
                    </li>
                    <li>
                        <div className="navBox noDrag"><span className="navHome" onClick={() => movePage("/")}>DEFISTATION</span> &gt; <span className="navDefiName">{props.defiName}</span></div>
                    </li>
                </ul>
            </div>
            
            <ul className="totalValueUl">
                <li>
                    {/* style={props.defiName != "DeFi" ? {backgroundColor: "#171a20"} : {backgroundColor: "#262932"}} */}
                    <div className="tvlChartCard" style={props.defiName != "DeFi" ? {backgroundColor: "#262932"} : {backgroundColor: "#262932"}}>
                        <ul className="tvlChartCardUl">
                            <li>
                                <p className="tvlChartLegend">{chartLegendLabel}</p>

                                {/* Total Value Locked in ... */}
                                <span className="tvlChartCardTitle">{tvlChartCardTitleValue} in {getOfficialDefiName(props.defiName)}</span>
                                <p className="tvlValueUsd">$ {totalValueLockedUsd}</p>
                                <p className="tvlChartUnitY">({currencyFullName} USD)</p>
                                <p className="tvlChartUnitYRight">({dualYUnitText})</p>

                                {/* Main Chart: dual Y 차트 */}
                                <div style={props.defiName != "DeFi" ? {display: "none"} : undefined}>
                                    <Chart
                                    controls={fakeControls}
                                    width={viewWidth}
                                    height={'220px'}
                                    id="tvlGoogleChart"
                                    style={{"margin-left":"-5px"}}
                                    chartType="LineChart"
                                    loader={<div style={{ "width": viewWidth, "height": "220px", "text-align": "center", "margin-top": "70px" }}>< img src={loading} /></div>}
                                    data={chartData}
                                    options={{
                                        backgroundColor: "#262932",
                                        legend: "none",
                                        // animation : { duration:400, easing:'out'},
                                        // Gives each series an axis that matches the vAxes number below.
                                        series: {
                                            0: {targetAxisIndex: 0},
                                            1: {targetAxisIndex: 1}
                                        },
                                        hAxis: {
                                            textStyle: {
                                                color: '#757f8e',
                                                fontSize: 11,
                                            },
                                            slantedText: true,
                                            baselineColor: '#fff',
                                            gridlineColor: '#3D424D',
                                        },
                                        vAxis: {
                                            minValue: minTvl,
                                            textStyle: {
                                                color: '#757f8e',
                                            },
                                            baselineColor: '#fff',
                                            gridlineColor: '#3D424D',
                                        },
                                        colors: ["#f0b923", "#888A8F"],
                                        chartArea: { width: chartWidth, height: '70%' },
                                        }}
                                    rootProps={{ 'data-testid': '2' }}
                                    />
                                </div>
                                {/* Subpage Chart */}
                                <div style={props.defiName != "DeFi" ? undefined : {display: "none"}}>
                                    <Chart
                                    id="tvlGoogleChart"
                                    width={viewWidth}
                                    height={'220px'}
                                    style={{"margin-left":"-5px"}}
                                    chartType="LineChart"
                                    loader={<div style={{ "width": viewWidth, "height": "220px", "text-align": "center", "margin-top": "70px" }}>< img src={loading} /></div>}
                                    data={chartData}
                                    options={{
                                        backgroundColor: "#262932",
                                        legend: "none",
                                        // animation : { duration:400, easing:'out'},
                                        // Gives each series an axis that matches the vAxes number below.
                                        series: {
                                            0: {targetAxisIndex: 0},
                                            1: {targetAxisIndex: 1}
                                        },
                                        hAxis: {
                                            textStyle: {
                                                color: '#757f8e',
                                                fontSize: 11,
                                            },
                                            slantedText: true,
                                            baselineColor: '#fff',
                                            gridlineColor: '#3D424D',
                                        },
                                        vAxis: {
                                            minValue: minTvl,
                                            textStyle: {
                                                color: '#757f8e',
                                            },
                                            baselineColor: '#fff',
                                            gridlineColor: '#3D424D',
                                        },
                                        colors: ["#f0b923", "#34ab62"],
                                        chartArea: { width: chartWidth, height: '70%' },
                                        }}
                                    rootProps={{ 'data-testid': '2' }}
                                    />
                                </div>    
                            </li>
                            <li>
                                {/* <button className="periodBtnSelected" onClick={() => setChartPeriod("7")}>7d</button>
                                <button className="periodBtn" onClick={() => setChartPeriod("30")}>30d</button> */}
                                <div className="periodBtns">
                                    <button style={chartPeriod == 7 ? undefined : { display: "none" }} className="periodBtnSelected">7d</button>
                                    <button style={chartPeriod == 7 ? { display: "none" } : undefined } className="periodBtn" onClick={() => setChartPeriod("7")}>7d</button>

                                    <button style={chartPeriod == 30 ? undefined : { display: "none" }} className="periodBtnSelected">30d</button>
                                    <button style={chartPeriod == 30 ? { display: "none" } : undefined } className="periodBtn" onClick={() => setChartPeriod("30")}>30d</button>

                                    <button style={chartPeriod == 90 ? undefined : { display: "none" }} className="periodBtnSelected">90d</button>
                                    <button style={chartPeriod == 90 ? { display: "none" } : undefined } className="periodBtn" onClick={() => setChartPeriod("90")}>90d</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="buttonsNextToChart">
                    {/* Home */}
                    <div className="tvlLink0" style={props.defiName == "DeFi" ? undefined : { display: "none" } }>
                        <TvlLink icon={bscLogo} title="Binance Smart Chain" subTitle="EVM compatible PoS" goPage="https://www.binance.org/en/smartChain" />
                        <TvlLink icon={bscScanLogo} title="BscScan" subTitle="BSC Explorer" goPage="https://bscscan.com/" />
                        <TvlLink icon={exchangeLogo} title="Exchange" subTitle="Crypto asset exchange" goPage="https://www.binance.com/en?ref=39076268" />
                        <TvlLink icon={cosmostationLogo} title="Cosmostation" subTitle="Access DeFi" goPage="https://www.cosmostation.io/" />
                    </div>
                    <div className="tvlLink" style={props.defiName == "DeFi" ? { display: "none" } : undefined }>
                        {projectBtnLink}
                    </div>
                </li>
            </ul>
        </div>
    );
})

export default TotalValue;