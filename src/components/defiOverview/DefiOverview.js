import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
// import useStores from '../../../useStores';

import '../../App.css';

import binanceImg1 from "../../assets/images/binance_img@2x.png";

const DefiOverview = observer((props) => {

    const [overviewTag, setOverviewTag] = useState();

    useEffect(() => {

        switch (props.defiName.toLowerCase()) {
            case "pancake":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewTitle">What is pancake Swap?</span><br /><br />
                        <span className="defiOverviewContent">
                        BscSwap is a fully decentralized on-chain protocol for token exchange on Binance Smart Chain that uses liquidity pools instead of order books.
            Anyone can quickly swap between BNB and any BEP20 token or earn fees by supplying any amount of liquidity. And anyone can create a market 
            (i.e., liquidity pool) by supplying an equal value of BNB and an BEP20 token. BscSwap allows only one market per BEP20 token. 
                        </span><br /><br />
                        <span className="defiOverviewTitle">How to use BSC Swap?</span><br /><br />
                        <span className="defiOverviewContent">
                        BscSwap is a fully decentralized on-chain protocol for token exchange on Binance Smart Chain that uses liquidity pools instead of order books.
            Anyone can quickly swap between BNB and any BEP20 token or earn fees by supplying any amount of liquidity. And anyone can create a market 
            (i.e., liquidity pool) by supplying an equal value of BNB and an BEP20 token. BscSwap allows only one market per BEP20 token. 
                        </span>
                    </div>
                );
                break;
            default:
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewTitle">-</span><br /><br />
                        <span className="defiOverviewContent">
                        -
                        </span>
                    </div>
                );
                break;
        }
        
        return () => {

        };
    }, [props.defiName])

    return (
        <>
            {overviewTag}
        </>
    );
})

export default DefiOverview;