import React, { Component, Suspense, useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
// import useStores from '../../useStores';

import { numberWithCommas, capitalize, replaceAll } from '../../util/Util';

import '../../App.css';

import TopBar from '../topBar/TopBar';
import Footer from '../footer/Footer';

import cosmostationLogoWhite from "../../assets/images/cosmostationlogowhite@2x.png";

const About = observer(() => {
    function openWindow(path) {
        window.open(path);
    }

    // useEffect(() => {
        
    //     return () => {
    //         console.log('cleanup');
    //     };
    // }, [])

    return (
        <>
            <div className="wrapper">
                <TopBar />
                <div className="navBox noDrag"><span className="navHome">DEFISTATION</span> &gt; <span className="navDefiName">About</span></div>
                <div className="aboutBox">
                    <span className="defiOverviewTitle">What is Defistation?</span><br /><br />
                    <span className="defiOverviewContent">
                    Defistation is a DeFi leaderboard and analytics website for decentralized finance projects building and operating on Binance Smart Chain. This project is developed 
and maintained by Cosmostation and funded by Binance. Discover and track the total value locked into DeFi projects on Binance Smart Chain in real-time. 
The metrics and charts displayed on Defistation allows you go gain insight into the growing trends and movements in decentralized finance.
                    </span><br /><br /><br />

                    <span className="defiOverviewTitle">What is Binance Smart Chain?</span><br /><br />
                    <span className="defiOverviewContent">
                    Binance Smart Chain is an Ethereum Virtual Machine (EVM) compatible Proof-of-Stake network built by Binance. Users can build decentralized applications and digital 
assets on Binance Smart Chain to take advantage of its fast transaction speed and robust security. Applications originally built on Ethereum can easily be migrated to 
Binance Smart Chain, allowing for an inclusive ecosystem with a platitude of use-cases to flourish on. Decentralized finance projects built on Binance Smart Chain can 
enjoy a fast block time of ~5 seconds and make use of the vibrant ecosystem tools built by Binance such as the Panama cross-chain transfer feature and more.
                    </span><br /><br /><br />

                    <img className="cosmostationLogoOnAbout" src={cosmostationLogoWhite} /><br />
                    <span className="defiOverviewContent">
                    Cosmostation is an enterprise-level validator node infrastrcuture provider and end-user application developer based in Seoul, South Korea. 
Prior to entering the node infrastructure landscape, Cosmostation specialized in application development, building non-custodial mobile wallet and 
web applications for various blockchain since 2017.

As a validator node operator, we secure various PoS networks including the Cosmos Hub, Chainlink, CertiK Chain, Kava Network, Band Protocol, Iris Hub, 
and many more with over $50 million in assets staked collectively. Cosmostation also develops and maintains powerful end-user applications. The suite of products include Mintscan Block Explorer, Cosmostation Mobile Wallet (iOS/Android), Cosmostation Web Wallet, Keystation (end-to-end encrypted key management system), 
and open-source contributions for JavaScript development in Cosmos (CosmosJS). We also previously worked with Binance under the Binance X fellowship program 
to build a block explorer for Binance Chain.

Cosmostation develops, operates, and maintains all of its services in the spirit of the Cypherpunk manifesto.
                    </span><br /><br /><br />

                    
                    <span className="productOnAbout">Product by Cosmostation</span><br /><br />

                    <div className="productListBox">
                        <span onClick={() => openWindow("https://apps.apple.com/app/cosmostation/id1459830339")}>iOS Wallet</span><br />
                        <span onClick={() => openWindow("https://play.google.com/store/apps/details?id=wannabit.io.cosmostaion")}>Android Wallet</span><br />
                        <span onClick={() => openWindow("https://www.mintscan.io/")}>Mintscan Block Explorer</span><br />
                        <span onClick={() => openWindow("https://www.cosmostation.io/")}>Official Website</span>
                    </div>
                    



                </div>
                <Footer />
            </div>
        </>
    );
})

export default About;
