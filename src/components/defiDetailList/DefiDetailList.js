import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import useStores from '../../useStores';

import _ from "lodash";

import '../../App.css';

import { numberWithCommas, capitalize, replaceAll, getCurrencyUnit, getCurrencyDigit, convertDateFormat, convertDateFormat3, convertToBMK } from '../../util/Util';

import questionIcon from "../../assets/images/question_ic.svg";

// table board icon
import tableBoardLeftIcon from "../../assets/images/tableBoardIcons/chevron_left_black_24dp.svg";
import tableBoardRightIcon from "../../assets/images/tableBoardIcons/chevron_right_black_24dp.svg";
import tableBoardFirstPageIcon from "../../assets/images/tableBoardIcons/first_page_black_24dp.svg";
import tableBoardLastPageIcon from "../../assets/images/tableBoardIcons/last_page_black_24dp.svg";

const DefiDetailList = observer((props) => {
    const { global } = useStores();

    const history = useHistory();

    // all, 1year, 90days
    const [chartPeriod, setChartPeriod] = useState("180");    // 7, 30, 90, 180

    const [responseError, setResponseError] = useState();
    const [response, setResponse] = useState({});

    const [defiDataTag1, setDefiDataTag1] = useState();
    const [defiDataTag2, setDefiDataTag2] = useState();
    const [defiDataTag3, setDefiDataTag3] = useState();
    const [defiDataTag4, setDefiDataTag4] = useState();
    const [defiDataTag5, setDefiDataTag5] = useState();
    const [defiDataTag6, setDefiDataTag6] = useState();
    const [defiDataTag7, setDefiDataTag7] = useState();
    const [defiDataTag8, setDefiDataTag8] = useState();
    const [defiDataTag9, setDefiDataTag9] = useState();
    const [defiDataTag10, setDefiDataTag10] = useState();
    const [defiDataTag11, setDefiDataTag11] = useState();
    const [defiDataTag12, setDefiDataTag12] = useState();

    const [currentTablePage, setCurrentTablePage]   = useState(1);
    const [totalTablePage, setTotalTablePage]       = useState(12);

    const [mobileFlag, setMobileFlag] = useState(false);

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
            const res = await fetch(global.defistationApiUrl + "/bnblockedList/" + defiName + "?days=180", {
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

    // 메인페이지의 테이블 셀 스위칭: Token Price <-> MarketCap, TVL <-> holders
    let isSwitched = false;
    function switchDefiListTable() {
        // 모바일 또는 1034 px 이하인 경우
        let isMobile = false;
        let advanceSwitchFlag = false;

        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
            isMobile = true;
        }

        if (isMobile) {
            if (screen.width <= 1034) {
                advanceSwitchFlag = true;
            }
        } else {
            if (window.innerWidth <= 1034) {
                advanceSwitchFlag = true;
            }
        }
        
        // 모바일 뷰, 스크린 조건일 때 스위치 기능 실행
        if (advanceSwitchFlag) {
            if (!isSwitched) {
                document.querySelectorAll('.switchable2').forEach(function(el) {
                    el.style.display = 'none';
                });
                document.querySelectorAll('.switchable3').forEach(function(el) {
                    el.style.display = 'table-cell';
                });
        
                document.querySelectorAll('.switchable4').forEach(function(el) {
                    el.style.display = 'table-cell';
                });
                document.querySelectorAll('.switchable5').forEach(function(el) {
                    el.style.display = 'none';
                });

                isSwitched = true;
            } else {
                document.querySelectorAll('.switchable2').forEach(function(el) {
                    el.style.display = 'table-cell';
                });
                document.querySelectorAll('.switchable3').forEach(function(el) {
                    el.style.display = 'none';
                });
        
                document.querySelectorAll('.switchable4').forEach(function(el) {
                    el.style.display = 'none';
                });
                document.querySelectorAll('.switchable5').forEach(function(el) {
                    el.style.display = 'table-cell';
                });

                isSwitched = false;
            }
        }
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

                // 최근 30개만 남기기
                // let tempResultArr = _.filter(resultArr, (value, key)=> {
                //     return (key >= chartPeriod - 30);
                // })

                let tempResultArr = _.filter(resultArr, (value, key)=> {
                    return (key >= 0);
                })

                for (var i = 0; i < tempResultArr.length; i++) {
                    if (i == 0) {
                        initTimestamp = tempResultArr[i][0];
                    }

                    if (tempResultArr[i][1] == 0) {
                        continue;
                    }

                    let tvlChange = 0;
                    if (i > 0) {
                        // tvlChange = (1 - tempResultArr[i - 1][1] / tempResultArr[i][1]);
                        tvlChange = (tempResultArr[i][1] / tempResultArr[i - 1][1] - 1);
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
                        if (lockedBnbArr[i] != undefined) {
                            if (lockedBnbArr[i][1] > 0) {
                                if (lockedBnbArr[i - 1] != undefined) {
                                    if (lockedBnbArr[i - 1][1] > 0) {
                                        bnbChange = (lockedBnbArr[i][1] / lockedBnbArr[i - 1][1] - 1);
                                    } else {
                                        // console.log("[0429] lockedBnbArr[i - 2]: ", lockedBnbArr[i - 2]);
                                        if (lockedBnbArr[i - 2] != undefined) {
                                            if (lockedBnbArr[i - 2][1] > 0) {
                                                bnbChange = (lockedBnbArr[i][1] / lockedBnbArr[i - 2][1] - 1);
                                            } else {
                                                if (lockedBnbArr[i - 3] != undefined) {
                                                    if (lockedBnbArr[i - 3][1] > 0) {
                                                        bnbChange = (lockedBnbArr[i][1] / lockedBnbArr[i - 3][1] - 1);
                                                    } else {
                                                        if (lockedBnbArr[i - 4] != undefined) {
                                                            if (lockedBnbArr[i - 4][1] > 0) {
                                                                bnbChange = (lockedBnbArr[i][1] / lockedBnbArr[i - 4][1] - 1);
                                                            } else {
                                                                if (lockedBnbArr[i - 5] != undefined) {
                                                                    bnbChange = (lockedBnbArr[i][1] / lockedBnbArr[i - 5][1] - 1);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
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
                    let digit = getCurrencyDigit(tempResultArr[i][1]);
                    let currencyUnit = getCurrencyUnit(tempResultArr[i][1]);
                    let currencyNum;
                    // tvl이 M 이하 단위인 경우 소숫점 1자리만, B 단위 이상은 소숫점 2자리로 표현
                    if (digit <= 1000000) {
                        currencyNum = (tempResultArr[i][1] / digit).toFixed(1) * 1;
                    } else {
                        currencyNum = (tempResultArr[i][1] / digit).toFixed(2) * 1;
                    }

                    // Token Price
                    let tokenPrice = 0;
                    let tokenPriceChange = 0;
                    let priceObj = resultBnblockedList.price;

                    if (i > 0 && Object.keys(priceObj).length > 0) {
                        tokenPrice = priceObj[Object.keys(priceObj)[i]];
                        if (tokenPrice >= 1) {
                            tokenPriceTag = "$ " + numberWithCommas((tokenPrice).toFixed(2), false);
                        } else {
                            tokenPriceTag = "$ " + numberWithCommas(tokenPrice, false);
                        }

                        if (tokenPrice <= 0.0001) {
                            tokenPriceTag = "-";
                        }

                        tokenPriceChange = (priceObj[Object.keys(priceObj)[i]] / priceObj[Object.keys(priceObj)[i - 1]] - 1);
                        
                        if (tokenPriceChange == "Infinity" || tokenPrice <= 0.0001) {
                            tokenPriceChangeTag = "";
                        } else {
                            if (tokenPriceChange > 0) {
                                tokenPriceChangeTag = <span className="textGreen">+{(tokenPriceChange * 100).toFixed(2)}%</span>;
                            } else if (tokenPriceChange == 0) {
                                tokenPriceChangeTag = <span className="textGray">{(tokenPriceChange * 100).toFixed(2)}%</span>;
                            } else if (tokenPriceChange < 0) {
                                tokenPriceChangeTag = <span className="textRed">{(tokenPriceChange * 100).toFixed(2)}%</span>;
                            }
                        }
                    } else {
                        tokenPriceTag = "-";
                    }

                    // MarketCap
                    let marketCapObj = resultBnblockedList.marketCap;
                    let marketCap = 0;
                    let marketCapChange = 0;
                    if (i > 0 && Object.keys(marketCapObj).length > 0) {
                        marketCap = marketCapObj[Object.keys(marketCapObj)[i]];
                        // marketCapTag = "$ " + (marketCap).toFixed(0);
                        marketCapTag = "$ " + convertToBMK(marketCap);

                        if (marketCap <= 0.01) {
                            marketCapTag = "-";
                        }

                        marketCapChange = (marketCapObj[Object.keys(marketCapObj)[i]] / marketCapObj[Object.keys(marketCapObj)[i - 1]] - 1);
                        if (marketCapChange == "Infinity" || marketCap <= 0.01) {
                            marketCapChangeTag = "";
                        } else {
                            if (marketCapChange > 0) {
                                marketCapChangeTag = <span className="textGreen">+{(marketCapChange * 100).toFixed(2)}%</span>;
                            } else if (marketCapChange == 0) {
                                marketCapChangeTag = <span className="textGray">{(marketCapChange * 100).toFixed(2)}%</span>;
                            } else if (marketCapChange < 0) {
                                marketCapChangeTag = <span className="textRed">{(marketCapChange * 100).toFixed(2)}%</span>;
                            }
                        }
                    } else {
                        marketCapChangeTag = "-";
                    }

                    // Holders
                    let holdersObj = resultBnblockedList.holders;
                    // console.log("holdersObj: ", holdersObj);
                    let holders = 0;
                    let holdersChange = 0;
                    if (i > 0 && Object.keys(holdersObj).length > 0) {
                        holders = holdersObj[Object.keys(holdersObj)[i]];
                        if (holders == 0 || holders == undefined) {
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

                    if (holdersTag == undefined) {
                        holdersTag = "-";
                    }

                    // Sponsored
                    if (props.defiName == "ARIES FINANCIAL") {
                        holdersTag = "-";
                        holdersChangeTag = <span className="textGray"></span>;
                    }

                    // console.log("[0429] Test 2222222222");

                    // 30일의 change 24h 를 보여주려면 제일 첫번째껀 change 값이 Null 이다. null인 row는 가리기
                    if (tvlChangeTag != null) {
                        console.log("tempResultArr[" + i + "][0]: ", tempResultArr[i][0]);

                        defiDataTagArr.unshift(<tr key={i}>
                            <td>{convertDateFormat3(new Date(tempResultArr[i][0] * 1000))}</td>
                            <td className="switchable2" onClick={() => switchDefiListTable()}>
                                {tokenPriceTag}
                                <br /><span className="defiListTableSubText">{tokenPriceChangeTag}</span>
                            </td>
                            <td className="switchable3" onClick={() => switchDefiListTable()}>
                                {marketCapTag}
                                <br /><span className="defiListTableSubText">{marketCapChangeTag}</span>
                            </td>
                            <td className="switchable4" onClick={() => switchDefiListTable()}>
                                {holdersTag}
                                <br /><span className="defiListTableSubText">{holdersChangeTag}</span>
                            </td>
                            <td className="switchable5" onClick={() => switchDefiListTable()}>
                                {bnbLockedAmountTag == undefined ? "-" : bnbLockedAmountTag}
                                <br /><span className="defiListTableSubText">{bnbChangeTag}</span>
                            </td>
                            <td onClick={() => switchDefiListTable()}>
                                $ {convertToBMK(tempResultArr[i][1])}
                                <br /><span className="defiListTableSubText">{tvlChangeTag}</span>
                            </td>
                        </tr>);
                    }
                }

                let cellNum = 15;
                setDefiDataTag1(defiDataTagArr.slice(0, cellNum * 1));
                setDefiDataTag2(defiDataTagArr.slice(cellNum * 1, cellNum * 2));
                setDefiDataTag3(defiDataTagArr.slice(cellNum * 2, cellNum * 3));
                setDefiDataTag4(defiDataTagArr.slice(cellNum * 3, cellNum * 4));
                setDefiDataTag5(defiDataTagArr.slice(cellNum * 4, cellNum * 5));
                setDefiDataTag6(defiDataTagArr.slice(cellNum * 5, cellNum * 6));
                setDefiDataTag7(defiDataTagArr.slice(cellNum * 6, cellNum * 7));
                setDefiDataTag8(defiDataTagArr.slice(cellNum * 7, cellNum * 8));
                setDefiDataTag9(defiDataTagArr.slice(cellNum * 8, cellNum * 9));
                setDefiDataTag10(defiDataTagArr.slice(cellNum * 9, cellNum * 10));
                setDefiDataTag11(defiDataTagArr.slice(cellNum * 10, cellNum * 11));
                setDefiDataTag12(defiDataTagArr.slice(cellNum * 11, cellNum * 12 - 1));
            })
            .catch(err => setResponseError(err));
    }

    function movePageLeft() {
        if (currentTablePage - 1 > 0) {
            let tempPageNum = currentTablePage - 1;
            setCurrentTablePage(tempPageNum);
        }
    }

    function movePageRight() {
        if (currentTablePage + 1 <= totalTablePage) {
            let tempPageNum = currentTablePage + 1;
            setCurrentTablePage(tempPageNum);
        }
    }

    useEffect(() => {
        getChart(props.defiName);

        let isMobile = false;
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
            isMobile = true;
        }

        if (isMobile) {
            setMobileFlag(true);
        } else {
            if (screen.width <= 1034 || window.innerWidth <= 1034) {
                setMobileFlag(true);
            }
        }
        
        return () => {

        };
    }, [props.defiName, mobileFlag])

    return (
        <div className="defiDetailList">
            <table className="defiDetailListTable">
                <thead className="defiDetailListTableHead">
                    <tr>
                        <th>Date</th>
                        <th className="switchable2">Token Price</th>
                        <th className="switchable3">Mkt Cap</th>
                        <th className="switchable4">
                            {/* PC */}
                            <a 
                            data-tip 
                            data-for="subTableHeader4"
                            style={!mobileFlag ? undefined : {display: "none"}}
                            >
                            Holders
                            </a>
                            <ReactTooltip
                            id="subTableHeader4"
                            className='tableHeaderTooptip'
                            place="bottom" 
                            type="light" 
                            effect="solid">
                            <span>The number of wallets with a balance exceeding zero</span>
                            </ReactTooltip>
                            {/* Mobile (Tooltip 없음) */}
                            <span style={mobileFlag ? undefined : {display: "none"}}>Holders</span>
                        </th>
                        <th className="switchable5">BNB Locked</th>
                        <th>
                            {/* PC */}
                            <a 
                            data-tip 
                            data-for="subTableHeader6"
                            style={!mobileFlag ? undefined : {display: "none"}}
                            >
                            TVL
                            </a>
                            <ReactTooltip
                            id="subTableHeader6"
                            className='tableHeaderTooptip'
                            place="bottom" 
                            type="light" 
                            effect="solid">
                            <span>Total value locked</span>
                            </ReactTooltip>
                            {/* Mobile (Tooltip 없음) */}
                            <span style={mobileFlag ? undefined : {display: "none"}}>TVL</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="defiDetailListTableBody">
                    {currentTablePage == 1 ? defiDataTag1 : undefined}
                    {currentTablePage == 2 ? defiDataTag2 : undefined}
                    {currentTablePage == 3 ? defiDataTag3 : undefined}
                    {currentTablePage == 4 ? defiDataTag4 : undefined}
                    {currentTablePage == 5 ? defiDataTag5 : undefined}
                    {currentTablePage == 6 ? defiDataTag6 : undefined}
                    {currentTablePage == 7 ? defiDataTag7 : undefined}
                    {currentTablePage == 8 ? defiDataTag8 : undefined}
                    {currentTablePage == 9 ? defiDataTag9 : undefined}
                    {currentTablePage == 10 ? defiDataTag10 : undefined}
                    {currentTablePage == 11 ? defiDataTag11 : undefined}
                    {currentTablePage == 12 ? defiDataTag12 : undefined}
                </tbody>
            </table>
            <br />

            <ul className="tableBoardPageIconsUl">
                <li onClick={() => setCurrentTablePage(1)}><img src={tableBoardFirstPageIcon} /></li>
                <li onClick={() => movePageLeft()}><img src={tableBoardLeftIcon} /></li>
                {/* 현재 페이지를 기준으로 -2, +2 까지 보여주기 */}
                <li style={currentTablePage >= 1 && currentTablePage <= 3 ? undefined : {display: "none"}} className={currentTablePage == 1 ? "selectedPage" : undefined} onClick={() => setCurrentTablePage(1)}>1</li>
                <li style={currentTablePage >= 1 && currentTablePage <= 4 ? undefined : {display: "none"}} className={currentTablePage == 2 ? "selectedPage" : undefined} onClick={() => setCurrentTablePage(2)}>2</li>
                <li style={currentTablePage >= 1 && currentTablePage <= 5 ? undefined : {display: "none"}} className={currentTablePage == 3 ? "selectedPage" : undefined} onClick={() => setCurrentTablePage(3)}>3</li>
                <li style={currentTablePage >= 1 && currentTablePage <= 6 ? undefined : {display: "none"}} className={currentTablePage == 4 ? "selectedPage" : undefined} onClick={() => setCurrentTablePage(4)}>4</li>
                <li style={currentTablePage >= 1 && currentTablePage <= 7 ? undefined : {display: "none"}} className={currentTablePage == 5 ? "selectedPage" : undefined} onClick={() => setCurrentTablePage(5)}>5</li>
                <li style={currentTablePage >= 4 && currentTablePage <= 8 ? undefined : {display: "none"}} className={currentTablePage == 6 ? "selectedPage" : undefined} onClick={() => setCurrentTablePage(6)}>6</li>
                <li style={currentTablePage >= 5 && currentTablePage <= 9 ? undefined : {display: "none"}} className={currentTablePage == 7 ? "selectedPage" : undefined} onClick={() => setCurrentTablePage(7)}>7</li>
                <li style={currentTablePage >= 6 && currentTablePage <= 12 ? undefined : {display: "none"}} className={currentTablePage == 8 ? "selectedPage" : undefined} onClick={() => setCurrentTablePage(8)}>8</li>
                <li style={currentTablePage >= 7 && currentTablePage <= 12 ? undefined : {display: "none"}} className={currentTablePage == 9 ? "selectedPage" : undefined} onClick={() => setCurrentTablePage(9)}>9</li>
                <li style={currentTablePage >= 8 && currentTablePage <= 12 ? undefined : {display: "none"}} className={currentTablePage == 10 ? "selectedPage" : undefined} onClick={() => setCurrentTablePage(10)}>10</li>
                <li style={currentTablePage >= 9 && currentTablePage <= 12 ? undefined : {display: "none"}} className={currentTablePage == 11 ? "selectedPage" : undefined} onClick={() => setCurrentTablePage(11)}>11</li>
                <li style={currentTablePage >= 10 && currentTablePage <= 12 ? undefined : {display: "none"}} className={currentTablePage == 12 ? "selectedPage" : undefined} onClick={() => setCurrentTablePage(12)}>12</li>
                <li onClick={() => movePageRight()}><img src={tableBoardRightIcon} /></li>
                <li onClick={() => setCurrentTablePage(12)}><img src={tableBoardLastPageIcon} /></li>
            </ul>
        </div>
    );
})

export default DefiDetailList;