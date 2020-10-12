import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
// import useStores from '../../../useStores';

import '../../App.css';

const Banner = observer((props) => {

    useEffect(() => {
        
        return () => {

        };
    }, [])

    return (
        <div className="banner">
            <span className="bannerTitle">Binance Smart Chain</span>
            <p className="bannerContent">Uniswap is a fully decentralized on-chain protocol for token exchange on Ethereum that uses liquidity pools instead of order books. </p>
        </div>
    );
})

export default Banner;