import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
// import useStores from '../../../useStores';

import '../../App.css';

import binanceImg1 from "../../assets/images/binanceimg.gif";

const Banner = observer((props) => {

    useEffect(() => {
        
        return () => {

        };
    }, [])

    return (
        <div className="banner" onClick={() => window.open("https://www.binance.org/en/smartChain", "_blank")}>
            <span className="bannerTitle">Binance Smart Chain</span>
            <p className="bannerContent">An Ethereum Virtual Machine-compatible blockchain with a Proof of Staked Authority consensus mechanism</p>
            <img className="noDragImg" src={binanceImg1} />
        </div>
    );
})

export default Banner;