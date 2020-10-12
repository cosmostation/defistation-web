import React, { Component, Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import useStores from '../../useStores';

import TvlLink from './tvlLink/TvlLink';

import bscLogo from "../../assets/images/bsc_logo@2x.png";
import bscScanLogo from "../../assets/images/bscscan_logo@2x.png";
import exchangeLogo from "../../assets/images/exchange_logo@2x.png";
import cosmostationLogo from "../../assets/images/cosmostation_logo@2x.png";

const TotalValue = observer((props) => {

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
                                <span className="tvlChartCardTitle">Total Value Locked (USD) in DeFi</span>
                                <p className="tvlValueUsd">$00.00B</p>
                            </li>
                            <li>
                                <button className="periodBtnSelected">All</button>
                                <button className="periodBtn">1 Year</button>
                                <button className="periodBtn">90 Day</button>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="tvlLink">
                        <TvlLink icon={bscLogo} title="Binance Smart Chain" subTitle="Crypto asset exchange" />
                        <TvlLink icon={bscScanLogo} title="BscScan" subTitle="decentralized exchange" />
                        <TvlLink icon={exchangeLogo} title="Exchange" subTitle="Crypto asset exchange" />
                        <TvlLink icon={cosmostationLogo} title="Cosmostation" subTitle="Token launch platform" />
                    </div>
                </li>
            </ul>
        </div>
    );
})

export default TotalValue;