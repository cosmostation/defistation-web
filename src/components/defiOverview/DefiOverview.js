import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
// import useStores from '../../../useStores';

import { getOfficialDefiName } from '../../util/Util';

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
                        <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        PancakeSwap is one of the top liquidity providers on BSC in terms of swap volume, active users, and gas fee contribution to the BSC ecosystem. Its unique gamification program sets PancakeSwap apart from other AMM protocols, bringing stronger incentive for user participation as well as more token use cases.
                        </span>
                    </div>
                );
                break;
            case "peachswap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        An evolution of Uniswap with Peach tokenomics on Binance Smart Chain.
                        </span>
                    </div>
                );
                break;
            case "Streamity":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        Streamity is an autonomous company on the Binance Smart Chain to provide services in finance, education, healthcare, science and sports spheres.
                        </span>
                    </div>
                );
                break;
            case "bscSwap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                        <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        Launched on 9 September 2020, BSCswap is a decentralized exchange and an Automated Market Making protocol for Binance Smart Chain. It supports multiple BEP20 tokens over BSC ecosystem to create liquidity and fetch price oracles via on-chain smart contracts. Users can also yield-farm BSCswap LP tokens from the supported projects from BSC ecosystem.
                        </span>
                    </div>
                );
                break;
            case "Spartan Protocol":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        A protocol for incentivised liquidity and synthetic assets on Binance Smart Chain. 
                        </span>
                    </div>
                );
                break; 
            case "Burger Swap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        Democratized DeFi platform on Binance Smart Chain. List and trade any BEP20 asset. Provide liquidity and participate in community governance to earn from tx fees and liquidity mining rewards.
                        </span>
                    </div>
                );
                break;
            case "Stakecow":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        MILK Protocol is a yield farming project based on BSC
                        </span>
                    </div>
                );
                break;
            case "alphafinance":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        Alpha Finance Lab is an ecosystem of DeFi products, starting on Binance Smart Chain and Ethereum. Alpha Finance Lab is focused on building an ecosystem of automated yield-maximizing Alpha products that interoperate to bring optimal alpha to users on a cross-chain level.
                        </span>
                    </div>
                );
                break;    
            case "Cream Finance":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        C.R.E.A.M. is a peer to peer lending and exchange platform on Ethereum and BSC.
                        </span>
                    </div>
                );
                break; 
            case "Bakery Swap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        Bakery Swap is the first AMM and NFT platform on Binance Smart Chain.
                        </span>
                    </div>
                );
                break;
            case "ForTube":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        Based on The Force Protocol, ForTube is committed to providing decentralized lending services for cryptoasset enthusiasts around the world.
                        </span>
                    </div>
                );
                break;
            case "FryWorld":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                        Automated Market Maker built on Binance Smart Chain
                        </span>
                    </div>
                );
                break;  
            case "Narwhalswap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            Narwhalswap is an AMM protocol but is on Binance Smart Chain.
                        </span>
                    </div>
                );
                break;  
            case "beefy.finance":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            beefy.finance is a yield farming optimizer on Binance Smart Chain.
                        </span>
                    </div>
                );
                break;    
            case "STORMSWAP":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            Aumomated Market Maker built on Binance Smart Chain.
                        </span>
                    </div>
                );
                break;              
            case "BnEX":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            Decentralized exchange for automated market making built on Binance Smart Chain.
                        </span>
                    </div>
                );
                break;
            // case "7up.finance":
            //     break;
            // case "BFis.finance":
            //     break;
            case "bStable.finance":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            bStable is an open-source, automated market maker (AMM) mechanism especially designed to enable token swaps between any stablecoin on Binance Smart Chain (BSC) at low fees and with minimal price slippage.
                        </span>
                    </div>
                );
                break;
            case "Dego":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            Dego.finance as a NFT+DeFi Fusion Reactor whose transparency and fairness is governed by Law of Codes, for the unprivileged and unbanked underdogs.
                        </span>
                    </div>
                );
                break;
            // case "DODO":
            //     break;
            case "Equator.finance":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            The Generic Liquidity Protocol: Build Customized Pools with Flexibility
                        </span>
                    </div>
                );
                break;
            case "StableXSwap":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            StableXSwap is a stablecoin-focused AMM-style decentralized exchange built on Binance Smart Chain. Similar to what Curve.fi did for the Ethereum DEX space, StableXSwap describes itself as the first DEX featuring lower slippage and lower fees for the trading of stable assets. With minimized impermanent loss and lower gas fees on Binance Smart Chain, the swap mechanism is ideal for casual users and experienced arbitrageurs alike.
                        </span>
                    </div>
                );
                break;
            case "QIAN":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            QIAN stablecoin protocol provides a set of open architecture allowing anyone to generate stable-value tokens with the legal currency of various countries as the pricing standard, anytime and anywhere.
                        </span>
                    </div>
                );
                break;
            case "Venus":
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewContent">
                            <span className="defiOverviewTitle">What is {getOfficialDefiName(props.defiName)}?</span><br /><div className="defiOverviewBr"></div>
                            Venus is an algorithmic-based money market system designed to bring a complete decentralized finance-based lending and credit system onto Binance Smart Chain.
                        </span>
                    </div>
                );
                break;    
            default:
                setOverviewTag(
                    <div className="defiOverview">
                        <span className="defiOverviewTitle">-</span><br /><div className="defiOverviewBr"></div>
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