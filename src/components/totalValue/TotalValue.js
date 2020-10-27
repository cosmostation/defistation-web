import React, { Component, Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import useStores from '../../useStores';

import { numberWithCommas, capitalize, replaceAll, getCurrencyUnit, getCurrencyDigit } from '../../util/Util';

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

const TotalValue = observer((props) => {
    const { global } = useStores();

    const history = useHistory();

    // all, 1year, 90days
    const [chartPeriod, setChartPeriod] = useState("7");    // 7, 30, 90, 365

    const [chartData, setChartData] = useState(['x', 'TVL(USD)']);
    const [totalValueLockedUsd, setTotalValueLockedUsd] = useState(0);
    const [minTvl, setMinTvl] = useState(0);
    const [linkTag, setLinkTag] = useState("");
    const [defiIcon, setDefiIcon] = useState();

    const [responseError, setResponseError] = useState();
    const [response, setResponse] = useState({});

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

        const res = await fetch(global.defistationApiUrl + "/chart/" + urlStr);
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

                // K, M, B 기준은 최초 0번째 데이터
                let digit = getCurrencyDigit(resultArr[0][1]);
                let currencyUnit = getCurrencyUnit(resultArr[0][1]);
                
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
                } else {
                    // 계산할 값이 없으면 0
                    global.changeTvl1DayPercent(0);
                }

                // 홈 하단 1 Day Change 계산
                console.log("res.details: ", res.details);
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
                setLinkTag("https://pancakeswap.finance/");
                break;
            case "Peach Swap":
                setDefiIcon(peachswap);
                setLinkTag("https://peachswap.org/");
                break;   
            case "Streamity":
                setDefiIcon(streamity);
                setLinkTag("https://streamity.org/");
                break;   
            case "bscSwap":
                setDefiIcon(bscswap);
                setLinkTag("https://bscswap.com/");
                break;   
            case "Spartan Protocol":
                setDefiIcon(spartanprotocol);
                setLinkTag("https://spartanprotocol.org/");
                break;   
            case "Burger Swap":
                setDefiIcon(burgerswap);
                setLinkTag("https://burgerswap.org/");
                break;   
            case "Stakecow":
                setDefiIcon(stakecow);
                setLinkTag("https://stakecow.com/");
                break;   
            case "Alpha Finance":
                setDefiIcon(alphafinance);
                setLinkTag("https://alphafinance.io/");
                break;   
            case "Cream Finance":
                setDefiIcon(creamfinance);
                setLinkTag("https://cream.finance/");
                break;   
            case "Bakery Swap":
                setDefiIcon(bakeryswap);
                setLinkTag("https://www.bakeryswap.org/#/home");
                break;   
            case "ForTube":
                setDefiIcon(fortube);
                setLinkTag("https://for.tube/home");
                break;   
            case "FryWorld":
                setDefiIcon(fryworld);
                setLinkTag("https://fry.world/");
                break;   
            case "beefy.finance":
                setDefiIcon(beefyfinance);
                setLinkTag("https://beefy.finance/");
                break;
            case "Narwhalswap":
                setDefiIcon(narwhalswap);
                setLinkTag("https://narwhalswap.org");
                break;    
            default:
                setLinkTag("");
                break;    
        }
    }

    useEffect(() => {
        getChart(props.defiName);


        console.count("TotalValue render");
        console.log("props.defiName: ", props.defiName);

        selectOfficialLink(props.defiName);

        return () => {
            // console.log('cleanup');
            // clearTimeout(timer);
        };
    }, [props.defiName, global.tvl1DayPercent, linkTag])

    return (
        <div className="totalValue">
            <ul className="totalValueUl">
                <li>
                    <div className="tvlChartCard" style={props.defiName != "DeFi" ? {"background-color": "#171a20"} : {"background-color": "#262932"}}>
                        <ul className="tvlChartCardUl">
                            <li>
                                <span className="tvlChartCardTitle">Total Value Locked (USD) in {props.defiName}</span>
                                <p className="tvlValueUsd">$ {totalValueLockedUsd}</p>

                                {/* Main Chart */}
                                <div id="tvlGoogleChart" style={props.defiName != "DeFi" ? {display: "none"} : undefined}>
                                    <Chart
                                    id="tvlGoogleChart"
                                    width={'750px'}
                                    height={'220px'}
                                    chartType="LineChart"
                                    loader={<div style={{ "height": "750px", "width": "220px" }}></div>}
                                    data={chartData}
                                    options={{
                                        backgroundColor: "#262932",
                                        legend: "none",
                                        hAxis: {
                                            textStyle: {
                                                color: '#bbbebf',
                                            },
                                            baselineColor: '#fff',
                                            gridlineColor: '#20232a',
                                        },
                                        vAxis: {
                                            minValue: minTvl,
                                            textStyle: {
                                                color: '#bbbebf',
                                            },
                                            baselineColor: '#fff',
                                            gridlineColor: '#20232a',
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
                                    width={'750px'}
                                    height={'220px'}
                                    chartType="LineChart"
                                    loader={<div style={{ "height": "750px", "width": "220px" }}></div>}
                                    data={chartData}
                                    options={{
                                        backgroundColor: "#171a20",
                                        legend: "none",
                                        hAxis: {
                                            textStyle: {
                                                color: '#bbbebf',
                                            },
                                            baselineColor: '#fff',
                                            gridlineColor: '#20232a',
                                        },
                                        vAxis: {
                                            minValue: minTvl,
                                            textStyle: {
                                                color: '#bbbebf',
                                            },
                                            baselineColor: '#fff',
                                            gridlineColor: '#20232a',
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
                                <button className="periodBtnSelected" onClick={() => setChartPeriod("7")}>7 Days</button>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    {/* Home */}
                    <div className="tvlLink" style={props.defiName == "DeFi" ? undefined : { display: "none" } }>
                        <TvlLink icon={bscLogo} title="Binance Smart Chain" subTitle="EVM compatible PoS" goPage="https://www.binance.org/en/smartChain" />
                        <TvlLink icon={bscScanLogo} title="BscScan" subTitle="BSC Explorer" goPage="https://bscscan.com/" />
                        <TvlLink icon={exchangeLogo} title="Exchange" subTitle="Crypto asset exchange" goPage="https://www.binance.com/en?ref=39076268" />
                        <TvlLink icon={cosmostationLogo} title="Cosmostation" subTitle="Access DeFi" goPage="https://www.cosmostation.io/" />
                    </div>
                    <div className="tvlLink" style={props.defiName == "DeFi" ? { display: "none" } : undefined }>
                        <TvlLink icon={defiIcon} title={props.defiName} subTitle="Official Website" goPage={linkTag} />
                        {/* pancake */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "pancake" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            <span onClick={() => openWindow("https://github.com/pancakeswap")}>Github</span><br />
                            <span onClick={() => openWindow("https://docs.pancakeswap.finance/")}>Docs</span><br />
                            <span onClick={() => openWindow("https://twitter.com/pancakeswap")}>Twitter</span><br />
                            <span onClick={() => openWindow("https://t.me/PancakeSwap")}>Telegram</span><br />
                            <span onClick={() => openWindow("https://medium.com/@pancakeswap")}>Blog</span><br />
                        </div>
                        {/* peachswap */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "peachswap" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            {/* <span onClick={() => openWindow("https://peachswap.org/")}>Official Website</span><br /> */}
                            <span onClick={() => openWindow("https://github.com/peachswapprotocol")}>Github</span><br />
                            {/* <span onClick={() => openWindow("https://docs.pancakeswap.finance/")}>Docs</span><br /> */}
                            <span onClick={() => openWindow("https://twitter.com/peachswap")}>Twitter</span><br />
                            <span onClick={() => openWindow("https://t.me/PeachSwapOfficial")}>Telegram</span><br />
                            {/* <span onClick={() => openWindow("https://medium.com/@pancakeswap")}>Blog</span><br /> */}
                        </div>
                        {/* Streamity */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "streamity" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            {/* <span onClick={() => openWindow("https://streamity.org/")}>Official Website</span><br /> */}
                            <span onClick={() => openWindow("https://github.com/streamity/")}>Github</span><br />
                            {/* <span onClick={() => openWindow("https://docs.pancakeswap.finance/")}>Docs</span><br /> */}
                            <span onClick={() => openWindow("https://twitter.com/streamityorg")}>Twitter</span><br />
                            <span onClick={() => openWindow("https://t.me/stm_international")}>Telegram</span><br />
                            <span onClick={() => openWindow("https://medium.com/@streamityorg")}>Blog</span><br />
                        </div>
                        {/* bscSwap */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "bscSwap" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            {/* <span onClick={() => openWindow("https://bscswap.com/")}>Official Website</span><br /> */}
                            <span onClick={() => openWindow("https://github.com/bscswap/contracts")}>Github</span><br />
                            {/* <span onClick={() => openWindow("https://docs.pancakeswap.finance/")}>Docs</span><br /> */}
                            <span onClick={() => openWindow("https://twitter.com/BSCswapProtocol")}>Twitter</span><br />
                            <span onClick={() => openWindow("https://t.me/bscswap")}>Telegram</span><br />
                            <span onClick={() => openWindow("https://bscswapprotocol.medium.com/")}>Blog</span><br />
                        </div>
                        {/* Spartan Protocol */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "Spartan Protocol" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            {/* <span onClick={() => openWindow("https://spartanprotocol.org/")}>Official Website</span><br /> */}
                            <span onClick={() => openWindow("https://github.com/spartan-protocol")}>Github</span><br />
                            {/* <span onClick={() => openWindow("https://docs.pancakeswap.finance/")}>Docs</span><br /> */}
                            <span onClick={() => openWindow("https://twitter.com/SpartanProtocol")}>Twitter</span><br />
                            <span onClick={() => openWindow("https://t.me/SpartanProtocolOrg")}>Telegram</span><br />
                            <span onClick={() => openWindow("https://medium.com/@spartanprotocol")}>Blog</span><br />
                        </div>
                        {/* burgerswap */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "burgerswap" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            {/* <span onClick={() => openWindow("https://burgerswap.org/")}>Official Website</span><br /> */}
                            <span onClick={() => openWindow("https://github.com/burgerswap-org/burgerswap-core")}>Github</span><br />
                            {/* <span onClick={() => openWindow("https://docs.pancakeswap.finance/")}>Docs</span><br /> */}
                            {/* <span onClick={() => openWindow("https://twitter.com/SpartanProtocol")}>Twitter</span><br /> */}
                            <span onClick={() => openWindow("https://t.me/burgerswap")}>Telegram</span><br />
                            <span onClick={() => openWindow("https://medium.com/@bnburgerking/")}>Blog</span><br />
                        </div>
                        {/* Stakecow */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "Stakecow" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            {/* <span onClick={() => openWindow("https://stakecow.com/")}>Official Website</span><br /> */}
                            <span onClick={() => openWindow("https://github.com/milk-protocol")}>Github</span><br />
                            {/* <span onClick={() => openWindow("https://docs.pancakeswap.finance/")}>Docs</span><br /> */}
                            {/* <span onClick={() => openWindow("https://twitter.com/SpartanProtocol")}>Twitter</span><br /> */}
                            <span onClick={() => openWindow("https://t.me/stakecow_en")}>Telegram</span><br />
                            {/* <span onClick={() => openWindow("https://medium.com/@bnburgerking/")}>Blog</span><br /> */}
                        </div>
                        {/* alphafinance */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "alphafinance" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            {/* <span onClick={() => openWindow("https://alphafinance.io/")}>Official Website</span><br /> */}
                            <span onClick={() => openWindow("https://github.com/AlphaFinanceLab")}>Github</span><br />
                            {/* <span onClick={() => openWindow("https://docs.pancakeswap.finance/")}>Docs</span><br /> */}
                            <span onClick={() => openWindow("https://twitter.com/alphafinancelab")}>Twitter</span><br />
                            <span onClick={() => openWindow("https://t.me/AlphaFinanceLab")}>Telegram</span><br />
                            <span onClick={() => openWindow("https://blog.alphafinance.io/")}>Blog</span><br />
                        </div>
                        {/* creamfinance */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "Cream Finance" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            {/* <span onClick={() => openWindow("https://cream.finance/")}>Official Website</span><br /> */}
                            {/* <span onClick={() => openWindow("https://github.com/AlphaFinanceLab")}>Github</span><br /> */}
                            {/* <span onClick={() => openWindow("https://docs.pancakeswap.finance/")}>Docs</span><br /> */}
                            <span onClick={() => openWindow("https://twitter.com/CreamdotFinance")}>Twitter</span><br />
                            <span onClick={() => openWindow("https://t.me/CreamdotFinance")}>Telegram</span><br />
                            <span onClick={() => openWindow("https://medium.com/@CreamdotFinance")}>Blog</span><br />
                        </div>
                        {/* Bakery Swap */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "Bakery Swap" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            {/* <span onClick={() => openWindow("https://www.bakeryswap.org/#/home")}>Official Website</span><br /> */}
                            <span onClick={() => openWindow("https://github.com/BakeryProject")}>Github</span><br />
                            {/* <span onClick={() => openWindow("https://docs.pancakeswap.finance/")}>Docs</span><br /> */}
                            <span onClick={() => openWindow("https://twitter.com/bakery_swap")}>Twitter</span><br />
                            <span onClick={() => openWindow("https://t.me/bakeryswap")}>Telegram</span><br />
                            <span onClick={() => openWindow("https://medium.com/@BakerySwap")}>Blog</span><br />
                        </div>
                        {/* fortube */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "fortube" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            {/* <span onClick={() => openWindow("https://for.tube/home")}>Official Website</span><br /> */}
                            <span onClick={() => openWindow("https://github.com/thefortube")}>Github</span><br />
                            <span onClick={() => openWindow("https://docs.for.tube/")}>Docs</span><br />
                            <span onClick={() => openWindow("https://twitter.com/ForTubeFi")}>Twitter</span><br />
                            <span onClick={() => openWindow("https://t.me/theforceprotocol666")}>Telegram</span><br />
                            <span onClick={() => openWindow("https://fortube.medium.com/")}>Blog</span><br />
                        </div>
                        {/* fryworld */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "fryworld" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            {/* <span onClick={() => openWindow("https://fry.world/")}>Official Website</span><br /> */}
                            <span onClick={() => openWindow("https://github.com/fryworld-finance/fryworld-farming-core")}>Github</span><br />
                            {/* <span onClick={() => openWindow("https://docs.for.tube/")}>Docs</span><br /> */}
                            <span onClick={() => openWindow("https://twitter.com/fry_world")}>Twitter</span><br />
                            <span onClick={() => openWindow("https://t.me/FryWorldFinance")}>Telegram</span><br />
                            <span onClick={() => openWindow("https://medium.com/@fryworld")}>Blog</span><br />
                        </div>
                        {/* beefy.finance */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "beefy.finance" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            <span onClick={() => openWindow("https://github.com/beefyfinance")}>Github</span><br />
                            {/* <span onClick={() => openWindow("https://docs.for.tube/")}>Docs</span><br /> */}
                            <span onClick={() => openWindow("https://twitter.com/beefyfinance")}>Twitter</span><br />
                            <span onClick={() => openWindow("https://t.me/beefyfinance")}>Telegram</span><br />
                            <span onClick={() => openWindow("https://medium.com/beefyfinance")}>Blog</span><br />
                        </div>
                        {/* Narwhalswap */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "Narwhalswap" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            <span onClick={() => openWindow("https://github.com/narwhalswap")}>Github</span><br />
                            <span onClick={() => openWindow("https://docs.narwhalswap.org/")}>Docs</span><br />
                            <span onClick={() => openWindow("https://twitter.com/narwhalswap")}>Twitter</span><br />
                            <span onClick={() => openWindow("https://t.me/narwhalswap")}>Telegram</span><br />
                            {/* <span onClick={() => openWindow("https://medium.com/beefyfinance")}>Blog</span><br /> */}
                        </div>

                    </div>
                </li>
            </ul>
        </div>
    );
})

export default TotalValue;