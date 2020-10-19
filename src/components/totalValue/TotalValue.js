import React, { Component, Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import useStores from '../../useStores';

import { numberWithCommas, capitalize, replaceAll } from '../../util/Util';

import TvlLink from './tvlLink/TvlLink';

import Chart from "react-google-charts";

import bscLogo from "../../assets/images/bsc_logo@2x.png";
import bscScanLogo from "../../assets/images/bscscan_logo@2x.png";
import exchangeLogo from "../../assets/images/exchange_logo@2x.png";
import cosmostationLogo from "../../assets/images/cosmostation_logo@2x.png";

const TotalValue = observer((props) => {

    // all, 1year, 90days
    const [chartPeriod, setChartPeriod] = useState("all");

    useEffect(() => {

        return () => {
            // console.log('cleanup');
            // clearTimeout(timer);
        };
    }, [])

    return (
        <div className="totalValue">
            <ul className="totalValueUl">
                <li>
                    <div className="tvlChartCard">
                        <ul className="tvlChartCardUl">
                            <li>
                                <span className="tvlChartCardTitle">Total Value Locked (USD) in {props.defiName}</span>
                                <p className="tvlValueUsd">$00.00</p>

                                <div id="tvlGoogleChart">
                                    <Chart
                                    id="tvlGoogleChart"
                                    width={'750px'}
                                    height={'220px'}
                                    chartType="LineChart"
                                    loader={<div style={{ "height": "750px", "width": "220px" }}></div>}
                                    data={[
                                        ['x', 'TVL(USD)'],
                                        ["Jan", 1400],
                                        ["Feb", 1300],
                                        ["Mar", 3510],
                                        ["Apr", 1070],
                                        ["May", 2480],
                                        ["Jun", 5140],
                                        ["Jul", 5520],
                                        ["Aug", 8830],
                                    ]}
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
                                            minValue: 0,
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
                                <button className="periodBtnSelected" onClick={() => setChartPeriod("all")}>All</button>
                                <button className="periodBtn" onClick={() => setChartPeriod("1year")}>1 Year</button>
                                <button className="periodBtn" onClick={() => setChartPeriod("90days")}>90 Day</button>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    {/* Home */}
                    <div className="tvlLink" style={props.defiName == "DeFi" ? undefined : { display: "none" } }>
                        <TvlLink icon={bscLogo} title="Binance Smart Chain" subTitle="EVM compatible PoS" />
                        <TvlLink icon={bscScanLogo} title="BscScan" subTitle="BSC Explorer" />
                        <TvlLink icon={exchangeLogo} title="Exchange" subTitle="Crypto asset exchange" />
                        <TvlLink icon={cosmostationLogo} title="Cosmostation" subTitle="Access DeFi" />
                    </div>
                    <div className="tvlLink" style={props.defiName == "DeFi" ? { display: "none" } : undefined }>
                        <TvlLink icon={bscLogo} title={props.defiName} subTitle="EVM compatible PoS" />
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