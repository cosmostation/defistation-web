import React, { Component, Suspense, useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
// import useStores from '../../useStores';

import { numberWithCommas, capitalize, replaceAll } from '../../util/Util';

import '../../App.css';

import TopBar from '../topBar/TopBar';
import Footer from '../footer/Footer';

import cosmostationLogoWhite from "../../assets/images/cosmostationlogowhite@2x.png";
import cosmostationLogo from "../../assets/images/cosmostationlogo.svg";
import linkIcon from "../../assets/images/official_ic.svg";

const About = observer(() => {
    const history = useHistory();

    function openWindow(path) {
        window.open(path);
    }

    function movePage(path) {
        history.push(path);
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
                <div className="navBox noDrag"><span className="navHome" onClick={() => movePage("/")}>DEFISTATION</span> &gt; <span className="navDefiName">About</span></div>
                <div className="aboutBox">
                    <span className="defiOverviewTitle">What is Defistation?</span><br /><div className="defiOverviewBr"></div>
                    <span className="defiOverviewContent">
                    Defistation is a DeFi leaderboard and analytics website for decentralized finance projects building and operating on Binance Smart Chain. This project is developed 
and maintained by Cosmostation and funded by Binance. Discover and track the total value locked into DeFi projects on Binance Smart Chain in real-time. 
The metrics and charts displayed on Defistation allows you to gain insight into the growing trends and movements in decentralized finance.
                    </span><br /><br /><br />

                    <span className="defiOverviewTitle">What is Binance Smart Chain?</span><br /><div className="defiOverviewBr"></div>
                    <span className="defiOverviewContent">
                    Binance Smart Chain is an Ethereum Virtual Machine (EVM) compatible Proof-of-Stake network built by Binance. Users can build decentralized applications and digital 
assets on Binance Smart Chain to take advantage of its fast transaction speed and robust security. Applications originally built on Ethereum can easily be migrated to 
Binance Smart Chain, allowing for an inclusive ecosystem with a platitude of use-cases to flourish on. Decentralized finance projects built on Binance Smart Chain can 
enjoy a fast block time of ~5 seconds and make use of the vibrant ecosystem tools built by Binance such as the Panama cross-chain transfer feature and more.
                    </span><br /><br /><br />

                    <span className="defiOverviewTitle">How do I get listed on Defistation?</span><br /><div className="defiOverviewBr"></div>
                    <span className="defiOverviewContent">
                    If you are a DeFi project operating on Binance Smart Chain, please fill out this <span className="formLinkOnAbout" onClick={() => window.open("https://david407562.typeform.com/to/emRhsYx0", "_blank")}>form</span> to go 
through our initial screening process. Defistation will reach out to projects individually after assessing each application. For any questions or inquiries, 
please e-mail defistation@stamper.network
                    </span><br /><br /><br />

                    <span className="defiOverviewTitle">How is "Change 24h" calculated?</span><br /><div className="defiOverviewBr"></div>
                    <span className="defiOverviewContent">
                    Defistation calculates the 24 hour change in TVL by counting the change in Total Value Locked in the past 24 hours from the time you are visiting the website. 
For example, if you visit Defistation at 3:20 PM, the “Change 24h” will represent the change in TVL between 3:00 PM the day before and 3:00 PM today.
                    </span><br /><br /><br />

                    <span className="defiOverviewTitle">What does “Verified” mean?</span><br /><div className="defiOverviewBr"></div>
                    <span className="defiOverviewContent">
                    All DeFi projects listed on Defistation go through an initial screening process, followed by strict due diligence and communication to confirm the validity of 
information we display. Projects that have a “Verified” badge next to their name are projects that have confirmed that the list of contracts included in 
TVL calculation is up-to-date and accurate.
                    </span><br /><br /><br />

                    <span className="defiOverviewTitle">How is Total Value Locked (TVL) calculated on Defistation?</span><br /><div className="defiOverviewBr"></div>
                    <span className="defiOverviewContent">
                    Defistation collects the list of contracts and contract ABIs of each project to monitor their balance on Binance Smart Chain. We pull the total balance of each 
smart contract by aggregating the total amount of BNB and BSC tokens every hour. The total value locked is displayed by taking this amount and multiplying them 
by the current USD value of each token.
                    </span><br /><br /><br />

                    <img className="cosmostationLogoOnAbout" src={cosmostationLogo} /><br /><div className="defiOverviewBr"></div>
                    <span className="defiOverviewContent">
                    Cosmostation is an enterprise-level validator node infrastrcuture provider and end-user application developer based in Seoul, South Korea. 
Prior to entering the node infrastructure landscape, Cosmostation specialized in application development, building non-custodial mobile wallet and 
web applications for various blockchain since 2017.<br /><br />

As a validator node operator, we secure various PoS networks including the Cosmos Hub, Chainlink, CertiK Chain, Kava Network, Band Protocol, Iris Hub, 
and many more with over $50 million in assets staked collectively. Cosmostation also develops and maintains powerful end-user applications. The suite of products include Mintscan Block Explorer, Cosmostation Mobile Wallet (iOS/Android), Cosmostation Web Wallet, Keystation (end-to-end encrypted key management system), 
and open-source contributions for JavaScript development in Cosmos (CosmosJS). We also previously worked with Binance under the Binance X fellowship program 
to build a block explorer for Binance Chain.<br /><br />

Cosmostation develops, operates, and maintains all of its services in the spirit of the Cypherpunk manifesto.<br /><br />
                    </span>

                    <ul className="defiOverviewWebsiteLinkUl" onClick={() => window.open("https://www.cosmostation.io/", "_blank")}>
                        <li><img src={linkIcon} /></li>
                        <li><span className="defiOverviewWebsiteLink">Official Website</span></li>
                    </ul>
                    <br />

                    <span className="productOnAbout">Product by Cosmostation</span><br /><br />

                    <div className="productListBox">
                        <span onClick={() => openWindow("https://apps.apple.com/app/cosmostation/id1459830339")}>iOS Wallet</span><br />
                        <span onClick={() => openWindow("https://play.google.com/store/apps/details?id=wannabit.io.cosmostaion")}>Android Wallet</span><br />
                        <span onClick={() => openWindow("https://www.mintscan.io/")}>Mintscan Block Explorer</span><br />
                    </div>
                    



                </div>
                <Footer />
            </div>
        </>
    );
})

export default About;
