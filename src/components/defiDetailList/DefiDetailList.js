import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import useStores from '../../useStores';

import '../../App.css';

import defistationApplicationList from "../../defistationApplicationList.json";

import { numberWithCommas, capitalize, replaceAll, getCurrencyUnit, getCurrencyDigit, convertDateFormat, convertDateFormat3, convertToBMK } from '../../util/Util';

import questionIcon from "../../assets/images/question_ic.svg";

const DefiDetailList = observer((props) => {
    const { global } = useStores();

    const history = useHistory();

    // all, 1year, 90days
    const [chartPeriod, setChartPeriod] = useState("30");    // 7, 30, 90, 365

    const [responseError, setResponseError] = useState();
    const [response, setResponse] = useState({});

    const [defiDataTag, setDefiDataTag] = useState();

    const [defiListTableCode, setDefiListTableCode] = useState();

    // const [resultBnblockedList, setResultBnblockedList] = useState();
    let resultBnblockedList = new Object;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function getMonthAndDay(date) {
        let monthName = monthNames[date.getMonth()];
        let day = date.getDate();
        return monthName + " " + day;
    }

    async function getBnbLockedList(defiName) {
        return new Promise(async function(resolve, reject) {
            const res = await fetch(global.defistationApiUrl + "/bnblockedList/" + defiName + "?days=30", {
                method: 'GET',
                headers: {
                    Authorization: global.auth
                }
            });
            res
                .json()
                .then(res => {
                    if (res.result == null) return;
                    // setResultBnblockedList(res);
                    resultBnblockedList = res;
                    let resultObj = res.result;
                    var resultArr = Object.keys(resultObj).map((key) => [Number(key), resultObj[key]]);
                    resolve(resultArr);
                });
        });    
    }

    async function getChart(defiName) {
        // console.log("getChart 함수 시작");

        let urlStr = "";
        if (defiName == "DeFi") {
            urlStr = "all";
        } else {
            urlStr = defiName;
        }

        console.log("urlStr: ", urlStr);
        if (urlStr == "") return;

        let lockedBnbArr = await getBnbLockedList(defiName);
        console.log("[0426] lockedBnbArr: ", lockedBnbArr);

        let chartFullUrl;
        if (chartPeriod == 7) {
            // default
            chartFullUrl = "/chart/" + urlStr;
        } else {
            chartFullUrl = "/chart/" + urlStr + "?days=" + chartPeriod;
        }

        const res = await fetch(global.defistationApiUrl + chartFullUrl, {
            method: 'GET',
            headers: {
                Authorization: global.auth
            }
        });
        res
            .json()
            .then(res => {
                if (res.result == null) return;

                // console.log("test1111111");

                // res.result 를 배열로 바꾸기 
                let resultObj = res.result;
                var resultArr = Object.keys(resultObj).map((key) => [Number(key), resultObj[key]]);

                let initTimestamp = 0;
                let tempMinTvl = 0;

                // K, M, B 기준은 최초 0번째 데이터
                let digit = getCurrencyDigit(resultArr[0][1]);
                let currencyUnit = getCurrencyUnit(resultArr[0][1]);
                
                let defiDataTagArr = [];

                // console.log("test111111111111");

                let bnbLockedAmountTag;

                let tvlChangeTag;
                let bnbChangeTag;

                let tokenPriceTag;
                let tokenPriceChangeTag;
                let marketCapTag;
                let marketCapChangeTag;
                let holdersTag;
                let holdersChangeTag;

                for (var i = 0; i < resultArr.length; i++) {
                    if (i == 0) {
                        initTimestamp = resultArr[i][0];
                    }

                    if (resultArr[i][1] == 0) {
                        continue;
                    }

                    let tvlChange = 0;
                    if (i > 0) {
                        // tvlChange = (1 - resultArr[i - 1][1] / resultArr[i][1]);
                        tvlChange = (resultArr[i][1] / resultArr[i - 1][1] - 1);
                        if (tvlChange == "Infinity") {
                            tvlChange = "";
                        } else {
                            if (tvlChange > 0) {
                                // +
                                tvlChangeTag = <span className="textGreen">+{(tvlChange * 100).toFixed(2)}%</span>;
                            } else if (tvlChange == 0) {
                                tvlChangeTag = <span className="textGray">{(tvlChange * 100).toFixed(2)}%</span>;
                            } else if (tvlChange < 0) {
                                tvlChangeTag = <span className="textRed">{(tvlChange * 100).toFixed(2)}%</span>;
                            }
                        }
                    }

                    // BNB locked 수량
                    if (Math.floor(lockedBnbArr[i][1]) > 0) {
                        bnbLockedAmountTag = numberWithCommas(Math.floor(lockedBnbArr[i][1]));
                    } else {
                        if (i > 0) {
                            if (Math.floor(lockedBnbArr[i - 1][1]) > 0) {
                                bnbLockedAmountTag = numberWithCommas(Math.floor(lockedBnbArr[i - 1][1]));
                            }
                        }
                    }

                    // BNB locked 변화량(개수로 표현)
                    let bnbChange = 0;
                    if (i > 0) {
                        if (lockedBnbArr[i][1] > 0) {
                            if (lockedBnbArr[i - 1][1] > 0) {
                                bnbChange = (lockedBnbArr[i][1] / lockedBnbArr[i - 1][1] - 1);
                            } else {
                                if (lockedBnbArr[i - 2][1] > 0) {
                                    bnbChange = (lockedBnbArr[i][1] / lockedBnbArr[i - 2][1] - 1);
                                } else {
                                    if (lockedBnbArr[i - 3][1] > 0) {
                                        bnbChange = (lockedBnbArr[i][1] / lockedBnbArr[i - 3][1] - 1);
                                    } else {
                                        if (lockedBnbArr[i - 4][1] > 0) {
                                            bnbChange = (lockedBnbArr[i][1] / lockedBnbArr[i - 4][1] - 1);
                                        } else {
                                            bnbChange = (lockedBnbArr[i][1] / lockedBnbArr[i - 5][1] - 1);
                                        }
                                    }
                                }
                            }
                        }
                        
                        if (bnbChange == "Infinity" || bnbLockedAmountTag == undefined) {
                            bnbChangeTag = "";
                        } else {
                            if (bnbChange > 0) {
                                bnbChangeTag = <span className="textGreen">+{(bnbChange * 100).toFixed(2)}%</span>;
                            } else if (bnbChange == 0) {
                                bnbChangeTag = <span className="textGray">{(bnbChange * 100).toFixed(2)}%</span>;
                            } else if (bnbChange < 0) {
                                bnbChangeTag = <span className="textRed">{(bnbChange * 100).toFixed(2)}%</span>;
                            }
                        }
                    }

                    // tvl
                    let digit = getCurrencyDigit(resultArr[i][1]);
                    let currencyUnit = getCurrencyUnit(resultArr[i][1]);
                    let currencyNum;
                    // tvl이 M 이하 단위인 경우 소숫점 1자리만, B 단위 이상은 소숫점 2자리로 표현
                    if (digit <= 1000000) {
                        currencyNum = (resultArr[i][1] / digit).toFixed(1) * 1;
                    } else {
                        currencyNum = (resultArr[i][1] / digit).toFixed(2) * 1;
                    }

                    // Token Price
                    let tokenPrice = 0;
                    let tokenPriceChange = 0;
                    let priceObj = resultBnblockedList.price;
                    if (i > 0) {
                        tokenPrice = priceObj[Object.keys(priceObj)[i]];
                        tokenPriceTag = "$ " + numberWithCommas((tokenPrice).toFixed(2), false);

                        tokenPriceChange = (priceObj[Object.keys(priceObj)[i]] / priceObj[Object.keys(priceObj)[i - 1]] - 1);
                        if (tokenPriceChange > 0) {
                            tokenPriceChangeTag = <span className="textGreen">+{(tokenPriceChange * 100).toFixed(2)}%</span>;
                        } else if (tokenPriceChange == 0) {
                            tokenPriceChangeTag = <span className="textGray">{(tokenPriceChange * 100).toFixed(2)}%</span>;
                        } else if (tokenPriceChange < 0) {
                            tokenPriceChangeTag = <span className="textRed">{(tokenPriceChange * 100).toFixed(2)}%</span>;
                        }
                    }

                    // MarketCap
                    let marketCapObj = resultBnblockedList.marketCap;
                    let marketCap = 0;
                    let marketCapChange = 0;
                    if (i > 0) {
                        marketCap = marketCapObj[Object.keys(marketCapObj)[i]];
                        // marketCapTag = "$ " + (marketCap).toFixed(0);
                        marketCapTag = "$ " + convertToBMK(marketCap);

                        marketCapChange = (marketCapObj[Object.keys(marketCapObj)[i]] / marketCapObj[Object.keys(marketCapObj)[i - 1]] - 1);
                        if (marketCapChange > 0) {
                            marketCapChangeTag = <span className="textGreen">+{(marketCapChange * 100).toFixed(2)}%</span>;
                        } else if (marketCapChange == 0) {
                            marketCapChangeTag = <span className="textGray">{(marketCapChange * 100).toFixed(2)}%</span>;
                        } else if (marketCapChange < 0) {
                            marketCapChangeTag = <span className="textRed">{(marketCapChange * 100).toFixed(2)}%</span>;
                        }
                    }

                    // Holders
                    let holdersObj = resultBnblockedList.holders;
                    let holders = 0;
                    let holdersChange = 0;
                    if (i > 0) {
                        holders = holdersObj[Object.keys(holdersObj)[i]];
                        if (holders == 0) {
                            holdersTag = "-";
                        } else {
                            holdersTag = numberWithCommas(holders, false);
                        }

                        // holders 변화는 % 가 아니라 변화 증가, 감소 숫자로 보여준다
                        if (holders == 0) {
                            holdersChangeTag = <span className="textGray"></span>;
                        } else {
                            holdersChange = holdersObj[Object.keys(holdersObj)[i]] - holdersObj[Object.keys(holdersObj)[i - 1]];
                            if (holdersChange > 0) {
                                if (holdersObj[Object.keys(holdersObj)[i - 1]] == 0) {
                                    holdersChangeTag = <span className="textGray">-</span>;
                                } else {
                                    holdersChangeTag = <span className="textGreen">+{numberWithCommas(holdersChange, false)}</span>;
                                }
                            } else if (holdersChange == 0) {
                                holdersChangeTag = <span className="textGray">{numberWithCommas(holdersChange, false)}</span>;
                                // holdersChangeTag = <span className="textGray">-</span>;
                            } else if (holdersChange < 0) {
                                holdersChangeTag = <span className="textRed">{numberWithCommas(holdersChange, false)}</span>;
                            }
                        }
                        
                    }

                    // 30일의 change 24h 를 보여주려면 제일 첫번째껀 change 값이 Null 이다. null인 row는 가리기
                    if (tvlChangeTag != null) {
                        defiDataTagArr.unshift(<tr key={i}>
                            {/* <td>{convertDateFormat3(new Date(resultArr[i][0] * 1000))}</td>
                            <td>$ {numberWithCommas(resultArr[i][1])}</td>
                            <td>$ {currencyNum + currencyUnit}</td>
                            <td>{tvlChangeTag}</td>
                            <td>{numberWithCommas(Math.floor(lockedBnbArr[i][1]))} <span style={{"color":"#f0b923"}}>BNB</span></td>
                            <td>{bnbChangeTag} <span style={{"color":"#f0b923"}}>BNB</span></td> */}
                            
                            <td>{convertDateFormat3(new Date(resultArr[i][0] * 1000))}</td>
                            <td>
                                {tokenPriceTag}
                                <br /><span className="defiListTableSubText">{tokenPriceChangeTag}</span>
                            </td>
                            <td>
                                {marketCapTag}
                                <br /><span className="defiListTableSubText">{marketCapChangeTag}</span>
                            </td>
                            <td>
                                {holdersTag}
                                <br /><span className="defiListTableSubText">{holdersChangeTag}</span>
                            </td>
                            <td>
                                {/* {numberWithCommas(Math.floor(lockedBnbArr[i][1]))} */}
                                {/* {bnbLockedAmountTag} */}
                                {
                                    bnbLockedAmountTag == undefined ? "-" : bnbLockedAmountTag
                                }
                                <br /><span className="defiListTableSubText">{bnbChangeTag}</span>
                            </td>
                            <td>
                                $ {convertToBMK(resultArr[i][1])}
                                <br /><span className="defiListTableSubText">{tvlChangeTag}</span>
                            </td>
                        </tr>);
                    }
                }

                setDefiDataTag(defiDataTagArr);
                
                // // 차트 데이터가 7개가 안채워졌으면 앞에 채워넣기
                // if (chartPeriod - resultArr.length > 0) {
                //     let createEmptyDataLength = chartPeriod - resultArr.length;
                //     // console.log("createEmptyDataLength: ", createEmptyDataLength);
                //     for (var i = 0; i < createEmptyDataLength; i++) {
                //         let calTimestamp = initTimestamp - (86400 * (i + 1));
                //         // tempChartData 의 제일 앞에 넣어야함
                //         tempChartData.unshift([getMonthAndDay(new Date(calTimestamp * 1000)), 0]);
                //     }
                // }

            })
            .catch(err => setResponseError(err));
    }

    function movePage(path) {
        history.push(path);
    }

    useEffect(() => {
        // getDefiList();
        console.log("props.defiName22222: ", props.defiName);
        getChart(props.defiName);
        
        return () => {

        };
    }, [props.defiName])

    return (
        <div className="defiDetailList">
            <table className="defiDetailListTable">
                <thead className="defiDetailListTableHead">
                    <tr>
                        <th>Date</th>
                        <th>Token Price</th>
                        <th>Mkt Cap	</th>
                        <th>
                            <ul className="defiListTableHeadCellRight">
                                <li>Holders</li>
                                <li><span data-tip="The number of wallets with a balance exceeding zero"><img src={questionIcon} /></span><ReactTooltip /></li>
                            </ul>
                        </th>
                        <th>BNB Locked</th>
                        <th>
                            <ul className="defiListTableHeadCellRight">
                                <li>TVL</li>
                                <li><span data-tip="Total value locked"><img src={questionIcon} /></span><ReactTooltip /></li>
                            </ul>
                        </th>
                    </tr>
                </thead>
                <tbody className="defiDetailListTableBody">
                    {defiDataTag}
                </tbody>
            </table>
            <br />
        </div>
    );
})

export default DefiDetailList;