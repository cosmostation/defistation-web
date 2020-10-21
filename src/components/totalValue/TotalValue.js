import React, { Component, Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
// import useStores from '../../useStores';

import { numberWithCommas, capitalize, replaceAll, getCurrencyUnit, getCurrencyDigit } from '../../util/Util';

import TvlLink from './tvlLink/TvlLink';

import Chart from "react-google-charts";

import bscLogo from "../../assets/images/bsc_logo@2x.png";
import bscScanLogo from "../../assets/images/bscscan_logo@2x.png";
import exchangeLogo from "../../assets/images/exchange_logo@2x.png";
import cosmostationLogo from "../../assets/images/cosmostation_logo@2x.png";

const TotalValue = observer((props) => {
    // const { global } = useStores();

    // all, 1year, 90days
    const [chartPeriod, setChartPeriod] = useState("all");

    const [chartData, setChartData] = useState(['x', 'TVL(USD)']);
    const [totalValueLockedUsd, setTotalValueLockedUsd] = useState(0);
    const [minTvl, setMinTvl] = useState(0);

    const [responseError, setResponseError] = useState();
    const [response, setResponse] = useState({});

    const defistationApiUrl = "https://api.defistation.io";

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function getMonthAndDay(date) {
        let monthName = monthNames[date.getMonth()];
        let day = date.getDate();
        return monthName + " " + day;
    }

    async function getChart(defiName) {
        console.log("getChart 함수 시작");

        let urlStr = "";
        if (defiName == "DeFi") {
            urlStr = "all";
        } else {
            urlStr = defiName;
        }

        console.log("urlStr: ", urlStr);

        const res = await fetch(defistationApiUrl + "/chart/" + urlStr);
        res
            .json()
            .then(res => {
                console.log("res: ", res);

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
                let tempChartData = [['x', 'TVL(USD)']];

                // res.result 를 배열로 바꾸기 
                let resultObj = res.result;
                var resultArr = Object.keys(resultObj).map((key) => [Number(key), resultObj[key]]);

                let tempMinTvl = 0;

                // K, M, B 기준은 최초 0번째 데이터
                let digit = getCurrencyDigit(resultArr[0][1]);
                let currencyUnit = getCurrencyUnit(resultArr[0][1]);
                
                for (var i = 0; i < resultArr.length; i++) {
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
                    }
                }

                tempMinTvl = Math.floor(tempMinTvl * 0.9);

                // 차트 최솟값 설정
                setMinTvl(tempMinTvl);
                setChartData(tempChartData);
            })
            .catch(err => setResponseError(err));
    }

    useEffect(() => {
        getChart(props.defiName);

        return () => {
            // console.log('cleanup');
            // clearTimeout(timer);
        };
    }, [props.defiName])

    return (
        <div className="totalValue">
            <ul className="totalValueUl">
                <li>
                    <div className="tvlChartCard">
                        <ul className="tvlChartCardUl">
                            <li>
                                <span className="tvlChartCardTitle">Total Value Locked (USD) in {props.defiName}</span>
                                <p className="tvlValueUsd">$ {totalValueLockedUsd}</p>

                                <div id="tvlGoogleChart">
                                    <Chart
                                    id="tvlGoogleChart"
                                    width={'750px'}
                                    height={'220px'}
                                    chartType="LineChart"
                                    loader={<div style={{ "height": "750px", "width": "220px" }}></div>}
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
                                        0: { curveType: 'function' },
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
                                <button className="periodBtnSelected" onClick={() => setChartPeriod("7days")}>7 Days</button>
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
                        <TvlLink icon={bscLogo} title={props.defiName} subTitle="EVM compatible PoS" goPage="" />
                        {/* pancake */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "pancake" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            <span>Daistats</span><br />
                            <span>Daistats</span><br />
                            <span>Daistats</span><br />
                            <span>Daistats</span><br />
                            <span>Daistats</span><br />
                        </div>
                        {/* bscswap */}
                        <div className="defiDetailPageLink noDrag" style={props.defiName == "bscswap" ? undefined : { display: "none" } }>
                            <p className="ecoSystemLinkTitle">Ecosystem Links</p>
                            <span>Daistats</span><br />
                        </div>

                    </div>
                </li>
            </ul>
        </div>
    );
})

export default TotalValue;