import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import useStores from '../../useStores';
import { numberWithCommas, capitalize, replaceAll, getCurrencyUnit, getCurrencyDigit } from '../../util/Util';

import '../../App.css';

import MiniCard from './miniCard/MiniCard';
import MiniCardSlider from './miniCardSlider/MiniCardSlider';

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

    const [miniCardData0, setMiniCardData0] = useState("");
    const [miniCardData1, setMiniCardData1] = useState("0");
    const [miniCardData2, setMiniCardData2] = useState("");
    const [miniCardData3, setMiniCardData3] = useState("");

    const [miniCardData3b, setMiniCardData3b] = useState("");

    const [totalBnbLockedNum, setTotalBnbLockedNum] = useState(0);
    const [projectNum, setProjectNum] = useState(0);

    const [lockedBnbAmount, setLockedBnbAmount] = useState();

    const [miniCard4thTag, setMiniCard4thTag] = useState();

    const [urlFlag2, setUrlFlag2] = useState(false);
    async function getDefiList(defiName) {
        if (urlFlag2) return;
        setUrlFlag2(true);

        console.count("getDefiListCall");

        // if (defiName == "")

        console.log("[0426] defiName: ", defiName);

        const res = await fetch(global.defistationApiUrl + "/defiTvlList", {
            method: 'GET',
            headers: {
                Authorization: global.auth
            }
        });
        res
            .json()
            .then(res => {
                // console.log("[0426 Test] res: ", res);

                let tokenPrice = 0;
                let tokenPriceChange24h = 0;
                for (var i = 0; i < res.length; i++) {
                    if (res[i]["name"] == defiName) {
                        tokenPrice = res[i]["price"];
                        tokenPriceChange24h = res[i]["priceChange24h"];
                        break;
                    }
                }

                console.log("[0426] tokenPrice: ", tokenPrice);

                // minicard2 에 표현
                // -------------------------------- Token Price --------------------------------
                if (tokenPrice != null) setMiniCardData1("$ " + tokenPrice.toFixed(2));

                if (tokenPriceChange24h * 1 > 0) {
                    setChangeVal1(<span className="miniCardChange textGreen">+{(tokenPriceChange24h * 100).toFixed(2)}%</span>);
                } else if (tokenPriceChange24h * 1 < 0) {
                    setChangeVal1(<span className="miniCardChange textRed">{(tokenPriceChange24h * 100).toFixed(2)}%</span>);
                } else {
                    setChangeVal1(<span className="miniCardChange">{(tokenPriceChange24h * 100).toFixed(2)}%</span>);
                }
            })
    }

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
                    // 유통량: 147883948 -> 153432897
                    // setMiniCardData3(((resultArr[resultArr.length - 1][1] * 1 / 153432897 * 100).toFixed(4) * 1) + "%");

                    // ---------------------------- Total BNB locked change(%) ----------------------------
                    console.log("resultArr[resultArr.length - 2][1]: ", resultArr[resultArr.length - 2][1]);

                    let bnbChange24hPercent;
                    if (resultArr[resultArr.length - 2][1] > 0) {
                        bnbChange24hPercent = (resultArr[resultArr.length - 1][1] - resultArr[resultArr.length - 2][1]) / resultArr[resultArr.length - 2][1] * 100;
                    } else {
                        bnbChange24hPercent = 0;
                    }

                    if (bnbChange24hPercent > 0) {
                        setChangeVal2(<span className="miniCardChange textGreen">+{bnbChange24hPercent.toFixed(2)}%</span>);
                    } else if (bnbChange24hPercent < 0) {
                        setChangeVal2(<span className="miniCardChange textRed">{bnbChange24hPercent.toFixed(2)}%</span>);
                    } else {
                        setChangeVal2(<span className="miniCardChange">{bnbChange24hPercent.toFixed(2)}</span>);
                    }

                } else {
                    // 메인 페이지
                    
                    // ---------------------------- Total BNB locked change(%) ----------------------------
                    let bnbChange24hPercent = (resultArr[resultArr.length - 1][1] - resultArr[resultArr.length - 2][1]) / resultArr[resultArr.length - 2][1] * 100;

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

    // const [trendingDefiName, setTrendingDefiName] = useState("");

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
            let trendingArr = global.trending;

            // trending minicard 보여주기
            // ["priceDefiName", "priceStr", price change, "marketCapDefiName", "marketcapStr", marketcap change, "holdersDefiName", "holdersStr", holders change, "tvlDefiName", "tvlStr", tvl change]
            setMiniCard4thTag(
            <MiniCardSlider 
            title0={"Trending (Price)"} defiName0={trendingArr[0]} dataNum0={trendingArr[1] * 1} data24hChange0={trendingArr[2]} 
            title1={"Trending (Mkt Cap)"} defiName1={trendingArr[3]} dataNum1={trendingArr[4] * 1} data24hChange1={trendingArr[5]} 
            title2={"Trending (Holders)"} defiName2={trendingArr[6]} dataNum2={trendingArr[7] * 1} data24hChange2={trendingArr[8]} 
            title3={"Trending (TVL)"} defiName3={trendingArr[9]} dataNum3={trendingArr[10] * 1} data24hChange3={trendingArr[11]}
            />
            );

        } else {
            // 서브 페이지
            setMiniCardTitle0("Total Value Locked");
            setMiniCardTitle1("Token Price");
            setMiniCardTitle2("Total BNB Locked");
            setMiniCardTitle3("Last updated(UTC)");

            // TVL Change 24h
            // minicard 0 으로 보이는 현상 임시
            // if (miniCardData0 == "0%") {
            //     setTimeout(function() {
            //         if (miniCardData0 != "0%") return;
            //         // showTvl1Day();
            //         if (global.tvl1DayPercent > 0) { 
            //             setMiniCardData1("+" + global.tvl1DayPercent + "%");
            //         } else {
            //             setMiniCardData1(global.tvl1DayPercent + "%");
            //         }
            //     }, 3000);
            // }

            // Total Value Locked 변화량(%) 값
            console.log("changeVal0: ", changeVal0);
            if (changeVal0 == "") {
                setTimeout(function() {
                    if (changeVal0 != "") return;
                    if (global.tvl1DayPercent > 0) { 
                        setChangeVal0(<span className="miniCardChange textGreen">+{global.tvl1DayPercent}%</span>);
                    } else if (global.tvl1DayPercent < 0) {
                        setChangeVal0(<span className="miniCardChange textRed">{global.tvl1DayPercent}%</span>);
                    } else {
                        setChangeVal0(<span className="miniCardChange">{global.tvl1DayPercent}%</span>);
                    }
                }, 3000);
            }

            // if (String(global.tvl1DayPercent).indexOf("+") != -1) {
            //     setChangeVal0(<span className="miniCardChange textGreen">{global.tvl1DayPercent}</span>);
            // } else if (String(global.tvl1DayPercent).indexOf("-") != -1) {
            //     setChangeVal0(<span className="miniCardChange textRed">{global.tvl1DayPercent}</span>);
            // } else {
            //     setChangeVal0(<span className="miniCardChange">{global.tvl1DayPercent}</span>);
            // }
            
            // ---------------------------- Token Price ----------------------------
            // console.log("global.tokenPrice: ", global.tokenPrice);
            // setMiniCardData1("$ " + global.tokenPrice);

            // 서브페이지일 때 Token Price 랑 변화량 가져오기 -> minicard2 적용
            if (props.defiName != "") getDefiList(props.defiName);


            // console.log("global.transactions24hPercent: ", global.transactions24hPercent);
            // if (global.transactions24hPercent * 1 > 0) {
            //     setChangeVal1(<span className="miniCardChange textGreen">+{global.transactions24hPercent}%</span>);
            // } else if (global.transactions24hPercent * 1 < 0) {
            //     setChangeVal1(<span className="miniCardChange textRed">{global.transactions24hPercent}%</span>);
            // } else {
            //     setChangeVal1(<span className="miniCardChange">{global.transactions24hPercent}%</span>);
            // }

            // console.log("global.tokenPrice24hPercent: ", global.tokenPrice24hPercent);


            // 서브페이지에서는 trending 이 아니라 일반 minicard 보여주기
            setMiniCard4thTag(
                <MiniCard title={miniCardTitle3} dataNum={miniCardData3} data24hChange={changeVal3} trendingDefiName={miniCardData3b} />
            );
        }

        console.log("[0426 test] props.defiName: ", props.defiName);
        
        return () => {

        };
        // global.totalValueLockedUsd 삭제  miniCardData1
    }, [props.defiName, miniCardData1, miniCardData3])

    return (
        <div className="miniCards">
            <ul className="miniCardUl">
                <MiniCard title={miniCardTitle0} dataNum={global.totalValueLockedUsd} data24hChange={changeVal0} />
                <MiniCard title={miniCardTitle1} dataNum={miniCardData1} data24hChange={changeVal1} />
                <MiniCard title={miniCardTitle2} dataNum={totalBnbLockedNum} symbol="BNB" data24hChange={changeVal2} />
                {/* <MiniCard title={miniCardTitle3} dataNum={miniCardData3} data24hChange={changeVal3} trendingDefiName={miniCardData3b} /> */}
                {/* <MiniCardSlider style={props.defiName == "DeFi" ? undefined : { display: "none" } } /> */}
                {miniCard4thTag}
            </ul>
        </div>
    );
})

export default MiniCards;