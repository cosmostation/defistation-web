import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import useStores from '../../useStores';
import { numberWithCommas, capitalize, replaceAll, getCurrencyUnit, getCurrencyDigit } from '../../util/Util';

import '../../App.css';

import MiniCard from './miniCard/MiniCard';

const MiniCards = observer((props) => {
    const { global } = useStores();

    const [responseError, setResponseError] = useState();
    const [response, setResponse] = useState({});

    const [changeVal0, setChangeVal0] = useState("");     // 0%
    const [changeVal1, setChangeVal1] = useState("");     // 0%
    const [changeVal2, setChangeVal2] = useState("");     // 0%
    const [changeVal3, setChangeVal3] = useState("");     // 0%

    const [miniCardTitle0, setMiniCardTitle0] = useState();
    const [miniCardTitle1, setMiniCardTitle1] = useState();
    const [miniCardTitle2, setMiniCardTitle2] = useState();
    const [miniCardTitle3, setMiniCardTitle3] = useState();

    const [miniCardData0, setMiniCardData0] = useState("0%");
    const [miniCardData1, setMiniCardData1] = useState("0%");
    const [miniCardData2, setMiniCardData2] = useState("");
    const [miniCardData3, setMiniCardData3] = useState("");

    const [miniCardData3b, setMiniCardData3b] = useState("");

    const [totalBnbLockedNum, setTotalBnbLockedNum] = useState(0);
    const [projectNum, setProjectNum] = useState(0);

    const [lockedBnbAmount, setLockedBnbAmount] = useState();

    const [urlFlag1, setUrlFlag1] = useState(false);
    const [urlFlagDetail, setUrlFlagDetail] = useState("");
    
    async function getTotalBnbLocked(defiName) {
        if (defiName == "DeFi") {
            if (urlFlag1) return;
        }
        setUrlFlag1(true);

        // console.log("getTotalBnbLocked 함수 시작");

        let urlStr = "";
        if (defiName == "DeFi") {
            // urlStr = "all";
            urlStr = "all?days=30";
        } else {
            // urlStr = defiName;
            urlStr = defiName + "?days=30";
        }

        // detail
        if (urlFlagDetail == urlStr) return;
        setUrlFlagDetail(urlStr);

        // console.log("urlStr: ", urlStr);
        if (urlStr == "" || urlStr == "?days=30") return;
        const res = await fetch(global.defistationApiUrl + "/bnblockedList/" + urlStr, {
            method: 'GET',
            headers: {
                Authorization: global.auth
            }
        });
        res
            .json()
            .then(res => {

                // res.result 를 배열로 바꾸고 가장 마지막 요소(최신) 확인
                let resultObj = res.result;
                var resultArr = Object.keys(resultObj).map((key) => [Number(key), resultObj[key]]);

                // console.log("res: ", res);
                setTotalBnbLockedNum(numberWithCommas(Math.floor(resultArr[resultArr.length - 1][1])));

                // setLockedBnbAmount(resultArr[resultArr.length - 1][1]);
                // 해당 Defi BNB와 전체 BNB 유통량 비율
                if (props.defiName != "DeFi") {
                    // 서브 페이지
                    // 유통량: 147883948
                    setMiniCardData3(((resultArr[resultArr.length - 1][1] * 1 / 147883948 * 100).toFixed(4) * 1) + "%");
                } else {
                    // 메인 페이지
                    
                    // ---------------------------- BNB locked change ----------------------------
                    let bnbChange24hPercent = (resultArr[resultArr.length - 1][1] - resultArr[resultArr.length - 2][1]) / resultArr[resultArr.length - 1][1] * 100;

                    if (bnbChange24hPercent > 0) {
                        setChangeVal2(<span className="miniCardChange textGreen">+{bnbChange24hPercent.toFixed(2)}%</span>);
                    } else if (bnbChange24hPercent < 0) {
                        setChangeVal2(<span className="miniCardChange textRed">{bnbChange24hPercent.toFixed(2)}%</span>);
                    } else {
                        setChangeVal2(<span className="miniCardChange">{bnbChange24hPercent.toFixed(2)}</span>);
                    }
                }

                // Last updated(UTC) 표현에서 앞에 20, 뒤에 초 제거
                let tempDate;
                console.log("resultArr[resultArr.length - 1][0]: ", resultArr[resultArr.length - 1][0]); 
                if (resultArr[resultArr.length - 1][0] == 0) {
                    tempDate = "-";
                } else {
                    tempDate = new Date(resultArr[resultArr.length - 1][0] * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                    tempDate = tempDate.substring(0, tempDate.length - 3);
                }

                // Last updated(UTC)
                if (props.defiName != "DeFi") {
                    // 서브 페이지
                    setMiniCardData3(tempDate);
                }
            })
            .catch(err => setResponseError(err));
    }

    // function showTvl1Day() {
    //     if (global.tvl1DayPercent > 0) { 
    //         setMiniCardData1("+" + global.tvl1DayPercent + "%");
    //     } else {
    //         setMiniCardData1(global.tvl1DayPercent + "%");
    //     }
    // }

    const [trendingDefiName, setTrendingDefiName] = useState("");

    useEffect(() => {
        getTotalBnbLocked(props.defiName);
        // showTvl1Day();

        // 메인 페이지 or 서브 페이지?
        if (props.defiName == "DeFi") {
            // 메인 페이지
            setMiniCardTitle0("Total Value Locked");
            setMiniCardTitle1("TXs 24h");
            setMiniCardTitle2("Total BNB Locked");
            setMiniCardTitle3("Trending");

            // change0
            if (global.tvl1DayPercent > 0) { 
                setMiniCardData0("+" + global.tvl1DayPercent + "%");
            } else {
                setMiniCardData0(global.tvl1DayPercent + "%");
            }

            // minicard 0 으로 보이는 현상 임시
            if (miniCardData0 == "0%") {
                setTimeout(function() {
                    if (miniCardData0 != "0%") return;
                    console.log("global.totalValueLockedUsd: ", global.totalValueLockedUsd);
                    // showTvl1Day();
                    if (global.tvl1DayPercent > 0) { 
                        setMiniCardData1("+" + global.tvl1DayPercent + "%");
                    } else {
                        setMiniCardData1(global.tvl1DayPercent + "%");
                    }
                }, 3000);
            }

            // Total Value Locked 변화량(%) 값
            if (String(miniCardData0).indexOf("+") != -1) {
                setChangeVal0(<span className="miniCardChange textGreen">{miniCardData0}</span>);
            } else if (String(miniCardData0).indexOf("-") != -1) {
                setChangeVal0(<span className="miniCardChange textRed">{miniCardData0}</span>);
            } else {
                setChangeVal0(<span className="miniCardChange">{miniCardData0}</span>);
            }

            // ---------------------------- TXs ----------------------------
            setMiniCardData1(global.transactions24h);
            console.log("global.transactions24hPercent: ", global.transactions24hPercent);
            if (global.transactions24hPercent * 1 > 0) {
                setChangeVal1(<span className="miniCardChange textGreen">+{global.transactions24hPercent}%</span>);
            } else if (global.transactions24hPercent * 1 < 0) {
                setChangeVal1(<span className="miniCardChange textRed">{global.transactions24hPercent}%</span>);
            } else {
                setChangeVal1(<span className="miniCardChange">{global.transactions24hPercent}%</span>);
            }

            // ---------------------------- Trending ----------------------------
            // random(1~3위)
            let randomNum = Math.floor(Math.random() * 3) * 3;

            //     if (urlFlagDetail == chartFullUrl) return;
            // setUrlFlagDetail(chartFullUrl);

            let trendingArr = global.trending;
            // defiName0, tvl0, change0
            setMiniCardData3b(<span className="trendingDefiName">{trendingArr[randomNum + 0]}</span>);
            setMiniCardData3(trendingArr[randomNum + 1]);
            // setMiniCardData1(global.transactions24h);
            // if (String(global.transactions24hPercent).indexOf("+") != -1) {
            //     setChangeVal1(<span className="miniCardChange textGreen">{global.transactions24hPercent}</span>);
            // } else if (String(global.transactions24hPercent).indexOf("-") != -1) {
            //     setChangeVal1(<span className="miniCardChange textRed">{global.transactions24hPercent}</span>);
            // } else {
            //     setChangeVal1(<span className="miniCardChange">{global.transactions24hPercent}</span>);
            // }

            // change
            if (trendingArr[randomNum + 2] > 0) {
                setChangeVal3(<span className="miniCardChange textGreen">+{(trendingArr[randomNum + 2] * 100).toFixed(2)}%</span>);
            } else if (trendingArr[randomNum + 2] < 0) {
                setChangeVal3(<span className="miniCardChange textRed">{(trendingArr[randomNum + 2] * 100).toFixed(2)}%</span>);
            } else {
                setChangeVal3(<span className="miniCardChange">{(trendingArr[randomNum + 2] * 100).toFixed(2)}</span>);
            }

            setTrendingDefiName(trendingArr[randomNum + 0]);
        } else {
            // 서브 페이지
            setMiniCardTitle0("Total Value Locked");
            setMiniCardTitle1("TVL Change 24h");
            setMiniCardTitle2("Total BNB Locked");
            setMiniCardTitle3("Last updated(UTC)");

            // TVL Change 24h
            // minicard 0 으로 보이는 현상 임시
            if (miniCardData0 == "0%") {
                setTimeout(function() {
                    if (miniCardData0 != "0%") return;
                    // showTvl1Day();
                    if (global.tvl1DayPercent > 0) { 
                        setMiniCardData1("+" + global.tvl1DayPercent + "%");
                    } else {
                        setMiniCardData1(global.tvl1DayPercent + "%");
                    }
                }, 3000);
            }

            // // TVL Change 24h
            // if (global.tvl1DayPercent > 0) { 
            //     setMiniCardData1("+" + global.tvl1DayPercent + "%");
            // } else {
            //     setMiniCardData1(global.tvl1DayPercent + "%");
            // }
        }
        
        return () => {

        };
        // global.totalValueLockedUsd 삭제
    }, [props.defiName, miniCardData1])

    return (
        <div className="miniCards">
            <ul className="miniCardUl">
                <MiniCard title={miniCardTitle0} dataNum={global.totalValueLockedUsd} data24hChange={changeVal0} />
                <MiniCard title={miniCardTitle1} dataNum={miniCardData1} data24hChange={changeVal1} />
                <MiniCard title={miniCardTitle2} dataNum={totalBnbLockedNum} symbol="BNB" data24hChange={changeVal2} />
                <MiniCard title={miniCardTitle3} dataNum={miniCardData3} data24hChange={changeVal3} trendingDefiName={miniCardData3b} />
            </ul>
        </div>
    );
})

export default MiniCards;