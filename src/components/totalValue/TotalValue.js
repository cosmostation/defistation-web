import React, { Component, Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import useStores from '../../useStores';

import { numberWithCommas, capitalize, replaceAll, getCurrencyUnit, getCurrencyUnitFullName, getCurrencyDigit, getOfficialDefiName } from '../../util/Util';

import TvlLink from './tvlLink/TvlLink';

import Chart from "react-google-charts";

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
import dodo from "../../assets/images/defiLogo/dodo@2x.png";
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

// Defi Link 아이콘
import defiOfficialSiteIcon from "../../assets/images/defiLink/officialsite.svg";
import defiGithubIcon from "../../assets/images/defiLink/github.svg";
import defiDocsIcon from "../../assets/images/defiLink/docs.svg";
import defiTwitterIcon from "../../assets/images/defiLink/twitter.svg";
import defiTelegramIcon from "../../assets/images/defiLink/telegram.svg";
import defiBlogIcon from "../../assets/images/defiLink/blog.svg";

const TotalValue = observer((props) => {
    const { global } = useStores();

    const history = useHistory();
    const location = useLocation();

    const [responseError, setResponseError] = useState();
    const [response, setResponse] = useState({});

    // all, 1year, 90days
    const [chartPeriod, setChartPeriod] = useState("7");    // 7, 30, 90, 365

    const [chartData, setChartData] = useState(['x', 'TVL(USD)']);
    const [totalValueLockedUsd, setTotalValueLockedUsd] = useState(0);
    const [minTvl, setMinTvl] = useState(0);
    const [linkTag, setLinkTag] = useState("");
    const [defiIcon, setDefiIcon] = useState();

    const [currencyFullName, setCurrencyFullName] = useState("");

    const [viewWidth, setViewWidth] = useState("750px");

    // const defistationApiUrl = "https://api.defistation.io";

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function getMonthAndDay(date) {
        let monthName = monthNames[date.getMonth()];
        let day = date.getDate();
        return monthName + " " + day;
    }

    async function getChart(defiName) {
        // console.log("getChart 함수 시작");

        let urlStr = "";
        if (defiName == "DeFi") {
            urlStr = "all";
        } else {
            urlStr = defiName;
        }

        // console.log("urlStr: ", urlStr);
        if (urlStr == "") {
            global.changeTotalValueLockedUsd("$ 0");
            global.changeTvl1DayPercent(0);
            return;
        }

        const res = await fetch(global.defistationApiUrl + "/chart/" + urlStr, {
            method: 'GET',
            headers: {
                Authorization: 'Basic Og=='
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

                let tempChartData = [];

                if (res.result == null) {
                    setMinTvl(0);
                    global.changeTotalValueLockedUsd("$ 0");
                    return;
                }

                // res.result 를 배열로 바꾸기 
                let resultObj = res.result;
                var resultArr = Object.keys(resultObj).map((key) => [Number(key), resultObj[key]]);

                let initTimestamp = 0;
                let tempMinTvl = 0;

                // K, M, B 기준은 최초 0번째 데이터(단, 0번째가 0이 아닐때)
                // let digit = getCurrencyDigit(resultArr[0][1]);
                // let currencyUnit = getCurrencyUnit(resultArr[0][1]);
                // let tempCurrencyFullName = getCurrencyUnitFullName(resultArr[0][1]);
                let digit;
                let currencyUnit;
                let tempCurrencyFullName;
                if (resultArr[0][1] > 0) {
                    digit = getCurrencyDigit(resultArr[0][1]);
                    currencyUnit = getCurrencyUnit(resultArr[0][1]);
                    tempCurrencyFullName = getCurrencyUnitFullName(resultArr[0][1]);
                } else {
                    digit = getCurrencyDigit(resultArr[resultArr.length - 1][1]);
                    currencyUnit = getCurrencyUnit(resultArr[resultArr.length - 1][1]);
                    tempCurrencyFullName = getCurrencyUnitFullName(resultArr[resultArr.length - 1][1]);
                }
                setCurrencyFullName(tempCurrencyFullName);
                
                for (var i = 0; i < resultArr.length; i++) {
                    if (i == 0) {
                        initTimestamp = resultArr[i][0];
                    }

                    // console.log("resultArr[i][0]: ", resultArr[i][0]);
                    // console.log("resultArr[i][1]: ", resultArr[i][1]);

                    // let digit = getCurrencyDigit(resultArr[i][1]);
                    // console.log("digit: ", digit);

                    let currencyNum = (resultArr[i][1] / digit).toFixed(3) * 1;

                    if (i == 0) {
                        tempMinTvl = currencyNum;
                    } else {
                        // 가장 작은 값 찾기(vAxis 최솟값)
                        if (tempMinTvl > currencyNum) {
                            tempMinTvl = currencyNum;
                        }
                    }

                    tempChartData.push([getMonthAndDay(new Date(resultArr[i][0] * 1000)), currencyNum]);

                    if (i == resultArr.length - 1) {
                        setTotalValueLockedUsd(currencyNum + " " + currencyUnit);
                        // global.changeTotalValueLockedUsd("$ " + currencyNum + " " + currencyUnit);
                        global.changeTotalValueLockedUsd("$ " + numberWithCommas(resultArr[i][1]));
                    }
                }
                
                // 차트 데이터가 7개가 안채워졌으면 앞에 채워넣기
                if (chartPeriod - resultArr.length > 0) {
                    let createEmptyDataLength = chartPeriod - resultArr.length;
                    // console.log("createEmptyDataLength: ", createEmptyDataLength);
                    for (var i = 0; i < createEmptyDataLength; i++) {
                        let calTimestamp = initTimestamp - (86400 * (i + 1));
                        // tempChartData 의 제일 앞에 넣어야함
                        tempChartData.unshift([getMonthAndDay(new Date(calTimestamp * 1000)), 0]);
                    }
                }

                // 차트: 7d
                if (tempChartData.length > 7) {
                    let remainDataLength = tempChartData.length - 7;
                    for (var i = 0; i < remainDataLength; i++) {
                        tempChartData.shift();  // 맨 앞 원소 제거
                    }
                }

                tempMinTvl = Math.floor(tempMinTvl * 0.9);
                // 차트 최솟값 설정(차트 모양 예쁘게 하기 위함)
                setMinTvl(tempMinTvl);
                // 차트 데이터 적용
                tempChartData.unshift(['x', 'TVL(USD)']);
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

                // // tvl1DayChangeArr["pancake"] 이렇게 사용하도록 형식 변경
                // let resultDetailsObj = res.details;
                // var resultDetailsArr = Object.keys(resultDetailsObj).map((key) => [key, resultDetailsObj[key]]);

                // console.log("resultDetailsArr: ", resultDetailsArr);

                // let tvl1DayChangesArr = new Object;
                // for (var i = 0; i < resultDetailsArr.length; i++) {
                //     tvl1DayChangesArr[resultDetailsArr[i][0]] = resultDetailsArr[i][1];
                // }

                // console.log("tvl1DayChangesArr: ", tvl1DayChangesArr);
            })
            .catch(err => setResponseError(err));
    }

    function movePage(path) {
        history.push(path);
    }

    function openWindow(path) {
        window.open(path);
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
            case "DODO":
                setDefiIcon(dodo);
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
            default:
                setLinkTag("");
                break;    
        }
    }

    // ------------ 모바일 구글 차트를 위한 resize 체크 START ------------
    function resizedw(){
        // Haven't resized in 100ms!
        if (window.innerWidth <= 1034) {
            console.log("1034 이하");
            // 홈 화면인 경우
            window.location.replace(location.pathname);
        } else {
            console.log("1034 초과");
            window.location.replace(location.pathname);
        }
    }
    
    var doit;
    function checkWindowWidth() {
        var width = window.innerWidth;
        // var height = window.innerHeight;

        window.onresize = function(){
            // clearTimeout(doit);
            // doit = setTimeout(resizedw, 100);

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

    useEffect(() => {
        getChart(props.defiName);

        {/* PC: 750px, Mobile: 300px */}
        if (window.innerWidth <= 1034) {
            setViewWidth("300px");
        }

        checkWindowWidth();

        console.count("TotalValue render");
        console.log("props.defiName: ", props.defiName);

        selectOfficialLink(props.defiName);

        return () => {
            // console.log('cleanup');
            // clearTimeout(timer);
        };
    }, [props.defiName, global.tvl1DayPercent, linkTag, viewWidth])

    return (
        <div className="totalValue">
            {/* subpage 타이틀 */}
            <div>
                <ul className="tvlTitleBox" style={props.defiName != "DeFi" ? undefined : {display: "none"}}>
                    <li>
                        <ul className="tvlSubPageTitleIconLabel">
                            <li><img src={defiIcon} /></li>
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
                                <span className="tvlChartCardTitle">Total Value Locked in {getOfficialDefiName(props.defiName)}</span>
                                <p className="tvlValueUsd">$ {totalValueLockedUsd}</p>
                                <p className="tvlChartUnitY">({currencyFullName} USD)</p>

                                {/* Main Chart */}
                                <div id="tvlGoogleChart" style={props.defiName != "DeFi" ? {display: "none"} : undefined}>
                                    {/* PC: 750px, Mobile: 300px */}
                                    <Chart
                                    id="tvlGoogleChart"
                                    width={viewWidth}
                                    height={'220px'}
                                    chartType="LineChart"
                                    loader={<div style={{ "width": viewWidth, "height": "220px" }}></div>}
                                    data={chartData}
                                    options={{
                                        backgroundColor: "#262932",
                                        legend: "none",
                                        hAxis: {
                                            textStyle: {
                                                color: '#757f8e',
                                            },
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
                                        series: {
                                        // 0: { curveType: 'function' },
                                        },
                                        colors: ['#f0b923'],
                                        chartArea: { width: '86%', height: '75%' },
                                    }}
                                    rootProps={{ 'data-testid': '2' }}
                                    />
                                </div>
                                {/* Subpage Chart */}
                                <div id="tvlGoogleChart" style={props.defiName != "DeFi" ? undefined : {display: "none"}}>
                                    <Chart
                                    id="tvlGoogleChart"
                                    width={viewWidth}
                                    height={'220px'}
                                    chartType="LineChart"
                                    loader={<div style={{ "width": viewWidth, "height": "220px" }}></div>}
                                    data={chartData}
                                    // options={{
                                    //     backgroundColor: "#171a20",
                                    //     legend: "none",
                                    //     hAxis: {
                                    //         textStyle: {
                                    //             color: '#bbbebf',
                                    //         },
                                    //         baselineColor: '#fff',
                                    //         gridlineColor: '#3D424D',
                                    //     },
                                    //     vAxis: {
                                    //         minValue: minTvl,
                                    //         textStyle: {
                                    //             color: '#bbbebf',
                                    //         },
                                    //         baselineColor: '#fff',
                                    //         gridlineColor: '#3D424D',
                                    //     },
                                    //     series: {
                                    //     // 0: { curveType: 'function' },
                                    //     },
                                    //     colors: ['#f0b923'],
                                    //     chartArea: { width: '86%', height: '75%' },
                                    // }}
                                    options={{
                                        backgroundColor: "#262932",
                                        legend: "none",
                                        hAxis: {
                                            textStyle: {
                                                color: '#757f8e',
                                            },
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
                                        series: {
                                        // 0: { curveType: 'function' },
                                        },
                                        colors: ['#f0b923'],
                                        chartArea: { width: '86%', height: '75%' },
                                    }}
                                    rootProps={{ 'data-testid': '2' }}
                                    />
                                </div>    
                            </li>
                            <li>
                                {/* <button className="periodBtnSelected" onClick={() => setChartPeriod("all")}>All</button>
                                <button className="periodBtn" onClick={() => setChartPeriod("1year")}>1 Year</button>
                                <button className="periodBtn" onClick={() => setChartPeriod("90days")}>90 Days</button> */}
                                <button className="periodBtnSelected" onClick={() => setChartPeriod("7")}>7d</button>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    {/* Home */}
                    <div className="tvlLink0" style={props.defiName == "DeFi" ? undefined : { display: "none" } }>
                        <TvlLink icon={bscLogo} title="Binance Smart Chain" subTitle="EVM compatible PoS" goPage="https://www.binance.org/en/smartChain" />
                        <TvlLink icon={bscScanLogo} title="BscScan" subTitle="BSC Explorer" goPage="https://bscscan.com/" />
                        <TvlLink icon={exchangeLogo} title="Exchange" subTitle="Crypto asset exchange" goPage="https://www.binance.com/en?ref=39076268" />
                        <TvlLink icon={cosmostationLogo} title="Cosmostation" subTitle="Access DeFi" goPage="https://www.cosmostation.io/" />
                    </div>
                    <div className="tvlLink" style={props.defiName == "DeFi" ? { display: "none" } : undefined }>
                        {/* <TvlLink icon={defiIcon} title={getOfficialDefiName(props.defiName)} subTitle="Official Website" goPage={linkTag} /> */}
                        {/* pancake */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "pancake" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://pancakeswap.finance/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/pancakeswap")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://docs.pancakeswap.finance/")} style={{"clear": "both"}}><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/pancakeswap")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/PancakeSwap")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://medium.com/@pancakeswap")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* peachswap */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "peachswap" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://peachswap.org/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/peachswapprotocol")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/peachswap")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/PeachSwapOfficial")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* Streamity */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "Streamity" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://streamity.org/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/streamity/")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/streamityorg")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/stm_international")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://medium.com/@streamityorg")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* bscSwap */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "bscSwap" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://bscswap.com/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/bscswap/contracts")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/BSCswapProtocol")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/bscswap")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://bscswapprotocol.medium.com/")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* Spartan Protocol */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "Spartan Protocol" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://spartanprotocol.org/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/spartan-protocol")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/SpartanProtocol")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/SpartanProtocolOrg")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://medium.com/@spartanprotocol")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* Burger Swap */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "Burger Swap" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://burgerswap.org/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/burgerswap-org/burgerswap-core")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/burgerswap")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://medium.com/@bnburgerking/")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* Stakecow */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "Stakecow" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://stakecow.com/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/milk-protocol")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/stakecow_en")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* alphafinance */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "alphafinance" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://alphafinance.io/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/AlphaFinanceLab")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/alphafinancelab")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/AlphaFinanceLab")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://blog.alphafinance.io/")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* creamfinance */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "Cream Finance" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://cream.finance/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/CreamFi")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://docs.cream.finance/")}><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/CreamdotFinance")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/CreamdotFinance")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://medium.com/@CreamdotFinance")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* Bakery Swap */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "Bakery Swap" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://www.bakeryswap.org/#/home")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/BakeryProject")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/bakery_swap")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/bakeryswap")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://medium.com/@BakerySwap")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* fortube */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "ForTube" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://for.tube/home")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/thefortube")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://docs.for.tube/")}><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/ForTubeFi")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/theforceprotocol666")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://fortube.medium.com/")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* fryworld */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "FryWorld" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://fry.world/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/fryworld-finance/fryworld-farming-core")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/fry_world")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/FryWorldFinance")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://medium.com/@fryworld")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* beefy.finance */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "beefy.finance" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://beefy.finance/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/beefyfinance")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/beefyfinance")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/beefyfinance")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://medium.com/beefyfinance")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* Narwhalswap */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "Narwhalswap" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://narwhalswap.org/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/narwhalswap")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://docs.narwhalswap.org/")}><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/narwhalswap")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/narwhalswap")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* Storm Swap */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "STORMSWAP" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://dex.stormswap.io/#/home")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/stormswap")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/storm_swap")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* BnEX */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "BnEX" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://bnex.org/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/bnex-finance")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/BnEXchange")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/bnexswap")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://medium.com/bnex")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* 7up.finance */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "7up.finance" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://7up.finance/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>    
                        {/* BFis.finance */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "BFis.finance" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://bfis.finance/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>    
                        {/* bStable.finance */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "bStable.finance" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://bstable.finance/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/bStableDeFi")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/bStableFi")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("http://t.me/bStable")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("http://bstable.medium.com/")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>    
                        {/* Dego */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "Dego" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://bsc.dego.finance/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>    
                        {/* DODO */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "DODO" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://dodoex.io/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>    
                        {/* Equator.finance */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "Equator.finance" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://www.equator.finance/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* StableXSwap */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "StableXSwap" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://stablexswap.com/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* QIAN */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "QIAN" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://qian.finance/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/QIAN-Protocol/")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/QIAN_stablecoin")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/qianprotocol")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* PancakeBunny */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "PancakeBunny" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://pancakebunny.finance/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/PancakeBunny-finance")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/PancakeBunnyFin")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/pancake_bunny")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://pancakebunny.medium.com/")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* JulSwap */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "JulSwap" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://julswap.com/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/justliquidity/SwapLiquidity")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/JustLiquidity")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/justliquidity")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://justliquidity.medium.com/")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* JustLiquidity */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "JustLiquidity" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://justliquidity.org/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/JustLiquidity")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/JustLiquidity")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/justliquidity")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://justliquidity.medium.com/")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* AnySwap */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "AnySwap" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://bsc.anyswap.exchange/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/anyswap")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/AnyswapNetwork")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/anyswap")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://anyswap.medium.com/")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>    
                        {/* CokeFinance */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "CokeFinance" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://cokefinance.com/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/cokefinance/coke-core")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/CokeFinance")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/cokefinance")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>    
                        {/* renVM */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "renVM" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://renproject.io/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/renproject")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://docs.renproject.io/developers/")}><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/renprotocol")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/renproject")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://medium.com/renproject")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>    
                        {/* UniFi */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "UniFi" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://unifiprotocol.com/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox disableBtn"><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/unifiprotocol")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/unifiprotocol")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://medium.com/@unifiprotocol")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                        {/* Venus */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "Venus" ? undefined : { display: "none" } }>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://venus.io/")}><img src={defiOfficialSiteIcon} /><span className="subPageDefiLinkBoxTitle">Official Website</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://github.com/SwipeWallet/Venus-Protocol")}><img src={defiGithubIcon} /><span className="subPageDefiLinkBoxTitle">Github</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://docs.venus.io/")}><img src={defiDocsIcon} /><span className="subPageDefiLinkBoxTitle">Docs</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://twitter.com/VenusProtocol")}><img src={defiTwitterIcon} /><span className="subPageDefiLinkBoxTitle">Twitter</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://t.me/VenusProtocol")}><img src={defiTelegramIcon} /><span className="subPageDefiLinkBoxTitle">Telegram</span></div>
                            <div className="subPageDefiLinkBox" onClick={() => openWindow("https://medium.com/venusprotocol")}><img src={defiBlogIcon} /><span className="subPageDefiLinkBoxTitle">Blog</span></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
})

export default TotalValue;