import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
// import useStores from '../../../useStores';

import '../../App.css';

import binanceImg1 from "../../assets/images/binance_img@2x.png";

const DefiOverview = observer((props) => {

    const [overviewTag, setOverviewTag] = useState();

    useEffect(() => {

        // console.log("props.defiName2222: ", props.defiName);

        switch (props.defiName) {
            case "pancake":
                setOverviewTag(
            //         <div className="defiOverview">
            //             <span className="defiOverviewTitle">What is pancake Swap?</span><br /><br />
            //             <span className="defiOverviewContent">
            //             BscSwap is a fully decentralized on-chain protocol for token exchange on Binance Smart Chain that uses liquidity pools instead of order books.
            // Anyone can quickly swap between BNB and any BEP20 token or earn fees by supplying any amount of liquidity. And anyone can create a market 
            // (i.e., liquidity pool) by supplying an equal value of BNB and an BEP20 token. BscSwap allows only one market per BEP20 token. 
            //             </span><br /><br />
            //             <span className="defiOverviewTitle">How to use BSC Swap?</span><br /><br />
            //             <span className="defiOverviewContent">
            //             BscSwap is a fully decentralized on-chain protocol for token exchange on Binance Smart Chain that uses liquidity pools instead of order books.
            // Anyone can quickly swap between BNB and any BEP20 token or earn fees by supplying any amount of liquidity. And anyone can create a market 
            // (i.e., liquidity pool) by supplying an equal value of BNB and an BEP20 token. BscSwap allows only one market per BEP20 token. 
            //             </span>
            //         </div>
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        <span className="defiOverviewTitle">What is {props.defiName}?</span><br /><br />
                        PancakeSwap is one of the top liquidity providers on BSC in terms of swap volume, active users, and gas fee contribution to the BSC ecosystem. Its unique gamification program sets PancakeSwap apart from other AMM protocols, bringing stronger incentive for user participation as well as more token use cases.
                        </span>
                    </div>
                );
                break;
            case "peachswap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        <span className="defiOverviewTitle">What is {props.defiName}?</span><br /><br />
                        An evolution of Uniswap with Peach tokenomics on Binance Smart Chain.
                        </span>
                    </div>
                );
                break;
            case "streamity":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        <span className="defiOverviewTitle">What is {props.defiName}?</span><br /><br />
                        Streamity is an autonomous company on the Binance Smart Chain to provide services in finance, education, healthcare, science and sports spheres.
                        </span>
                    </div>
                );
                break;
            case "bscSwap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        <span className="defiOverviewTitle">What is {props.defiName}?</span><br /><br />
                        Launched on 9 September 2020, BSCswap is a decentralized exchange and an Automated Market Making protocol for Binance Smart Chain. It supports multiple BEP20 tokens over BSC ecosystem to create liquidity and fetch price oracles via on-chain smart contracts. Users can also yield-farm BSCswap LP tokens from the supported projects from BSC ecosystem.
                        </span>
                    </div>
                );
                break;
            case "spartanprotocol":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {props.defiName}?</span><br /><br />
                        A protocol for incentivised liquidity and synthetic assets on Binance Smart Chain. 
                        </span>
                    </div>
                );
                break; 
            case "burgerswap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {props.defiName}?</span><br /><br />
                        Democratized DeFi platform on Binance Smart Chain. List and trade any BEP20 asset. Provide liquidity and participate in community governance to earn from tx fees and liquidity mining rewards.
                        </span>
                    </div>
                );
                break;
            case "Stakecow":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {props.defiName}?</span><br /><br />
                        Stakecow is a yield farming project based on BSC
                        </span>
                    </div>
                );
                break;
            case "alphafinance":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {props.defiName}?</span><br /><br />
                        Alpha Finance Lab is an ecosystem of DeFi products, starting on Binance Smart Chain and Ethereum. Alpha Finance Lab is focused on building an ecosystem of automated yield-maximizing Alpha products that interoperate to bring optimal alpha to users on a cross-chain level.
                        </span>
                    </div>
                );
                break;    
            case "Cream Finance":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {props.defiName}?</span><br /><br />
                        C.R.E.A.M. is a peer to peer lending and exchange platform on Ethereum and BSC.
                        </span>
                    </div>
                );
                break; 
            case "Bakery Swap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {props.defiName}?</span><br /><br />
                        Bakery Swap is the first AMM and NFT platform on Binance Smart Chain.
                        </span>
                    </div>
                );
                break;
            case "fortube":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {props.defiName}?</span><br /><br />
                        Based on The Force Protocol, ForTube is committed to providing decentralized lending services for cryptoasset enthusiasts around the world.
                        </span>
                    </div>
                );
                break;
            case "fryworld":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {props.defiName}?</span><br /><br />
                        Automated Market Maker built on Binance Smart Chain
                        </span>
                    </div>
                );
                break;  
            case "Narwhal Swap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {props.defiName}?</span><br /><br />
                            Narwhalswap is an AMM protocol but is on Binance Smart Chain.
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