import React, { Component, Suspense, useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
// import useStores from '../../useStores';

import { textEllipsis } from '../../util/Util';

import '../../App.css';

import TopBar from '../topBar/TopBar';
import Footer from '../footer/Footer';

import yellowArrow from "../../assets/images/arrowic@2x.png";
// 프로젝트 아이콘
import alphafinance from "../../assets/images/defiLogo/alphafinance@2x.png";
import bakeryswap from "../../assets/images/defiLogo/bakeryswap@2x.png";
import beefyfinance from "../../assets/images/defiLogo/beefyfinance@2x.png";
import bscswap from "../../assets/images/defiLogo/bscswap@2x.png";
import burgerswap from "../../assets/images/defiLogo/burgerswap@2x.png";
import creamfinance from "../../assets/images/defiLogo/creamfinance@2x.png";
import fortube from "../../assets/images/defiLogo/fortube@2x.png";
import fryworld from "../../assets/images/defiLogo/fryworld@2x.png";
import pancake from "../../assets/images/defiLogo/pancakeswap@2x.png";
import peachswap from "../../assets/images/defiLogo/peachswap@2x.png";
import spartanprotocol from "../../assets/images/defiLogo/spartanprotocol@2x.png";
import stakecow from "../../assets/images/defiLogo/stakecow@2x.png";
import streamity from "../../assets/images/defiLogo/streamity@2x.png";
import stormswap from "../../assets/images/defiLogo/stormswap@2x.png";
import narwhalswap from "../../assets/images/defiLogo/narwhalswap@2x.png";

const TheDefiList = observer(() => {
    // const { global } = useStores();

    const location = useLocation();

    const history = useHistory();

    const [responseError, setResponseError] = useState();
    const [response, setResponse] = useState({});

    const [urlPathName, setUrlPathName] = useState();
    const [defiName, setDefiName] = useState("");
    // const [invalidNameFlag, setInvalidNameFlag] = useState(false);

    // const defistationApiUrl = "https://api.defistation.io";

    useEffect(() => {
        
        return () => {
            console.log('cleanup');
        };
    }, [])

    return (
        <>
            <div className="wrapper">
                <TopBar />
                <div className="navBox noDrag"><span className="navHome">DEFISTATION</span> &gt; <span className="navDefiName">Projects</span></div>
                <div className="applyBtn" onClick={() => window.open("https://david407562.typeform.com/to/emRhsYx0", "_blank")}>
                    <ul className="applyBtnUl">
                        <li>
                            <span className="applyBtnTitle">Apply to be listed</span><br />
                            <span className="applyBtnText">The DeFi List Application - Add your project to The DeFi List!</span>
                        </li>
                        <li>
                            <img src={yellowArrow} width="40px" />
                        </li>
                    </ul>
                </div>
                <ul className="theDefiListUl">
                    <li onClick={() => history.push("pancake")}>
                        {/* icon */}
                        <img src={pancake} width="40px" /><br />
                        {/* 이름 */}
                        <span className="theDefiListCardTitle">Pancake Swap</span><br />
                        {/* 설명 */}
                        <span className="theDefiListCardText">{textEllipsis("PancakeSwap is one of the top liquidity providers on BSC in terms of swap volume, active users, and gas fee contribution to the BSC ecosystem. Its unique gamification program sets PancakeSwap apart from other AMM protocols, bringing stronger incentive for user participation as well as more token use cases.")}</span>
                    </li>
                    <li onClick={() => window.open("https://peachswap.org/", "_blank")}>
                        {/* icon */}
                        <img src={peachswap} width="40px" /><br />
                        {/* 이름 */}
                        <span className="theDefiListCardTitle">Peach Swap</span><br />
                        {/* 설명 */}
                        <span className="theDefiListCardText">{textEllipsis("An evolution of Uniswap with Peach tokenomics on Binance Smart Chain.")}</span>
                    </li>
                    <li onClick={() => window.open("https://streamity.org/", "_blank")}>
                        {/* icon */}
                        <img src={streamity} width="40px" /><br />
                        {/* 이름 */}
                        <span className="theDefiListCardTitle">Streamity</span><br />
                        {/* 설명 */}
                        <span className="theDefiListCardText">{textEllipsis("Streamity is an autonomous company on the Binance Smart Chain to provide services in finance, education, healthcare, science and sports spheres.")}</span>
                    </li>
                    <li onClick={() => history.push("bscswap")}>
                        {/* icon */}
                        <img src={bscswap} width="40px" /><br />
                        {/* 이름 */}
                        <span className="theDefiListCardTitle">BSC Swap</span><br />
                        {/* 설명 */}
                        <span className="theDefiListCardText">{textEllipsis("Launched on 9 September 2020, BSCswap is a decentralized exchange and an Automated Market Making protocol for Binance Smart Chain. It supports multiple BEP20 tokens over BSC ecosystem to create liquidity and fetch price oracles via on-chain smart contracts. Users can also yield-farm BSCswap LP tokens from the supported projects from BSC ecosystem.")}</span>
                    </li>
                    <li onClick={() => window.open("https://spartanprotocol.org/", "_blank")}>
                        {/* icon */}
                        <img src={spartanprotocol} width="40px" /><br />
                        {/* 이름 */}
                        <span className="theDefiListCardTitle">Spartan Protocol</span><br />
                        {/* 설명 */}
                        <span className="theDefiListCardText">{textEllipsis("A protocol for incentivised liquidity and synthetic assets on Binance Smart Chain. ")}</span>
                    </li>
                    <li onClick={() => window.open("https://burgerswap.org/", "_blank")}>
                        {/* icon */}
                        <img src={burgerswap} width="40px" /><br />
                        {/* 이름 */}
                        <span className="theDefiListCardTitle">Burger Swap</span><br />
                        {/* 설명 */}
                        <span className="theDefiListCardText">{textEllipsis("Democratized DeFi platform on Binance Smart Chain. List and trade any BEP20 asset. Provide liquidity and participate in community governance to earn from tx fees and liquidity mining rewards.")}</span>
                    </li>
                    <li onClick={() => history.push("stakecow")}>
                        {/* icon */}
                        <img src={stakecow} width="40px" /><br />
                        {/* 이름 */}
                        <span className="theDefiListCardTitle">Stakecow</span><br />
                        {/* 설명 */}
                        <span className="theDefiListCardText">Stakecow is a yield farming project based on BSC. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </li>
                    <li onClick={() => window.open("https://alphafinance.io/", "_blank")}>
                        {/* icon */}
                        <img src={alphafinance} width="40px" /><br />
                        {/* 이름 */}
                        <span className="theDefiListCardTitle">Alpha Finance</span><br />
                        {/* 설명 */}
                        <span className="theDefiListCardText">{textEllipsis("Alpha Finance Lab is an ecosystem of DeFi products, starting on Binance Smart Chain and Ethereum. Alpha Finance Lab is focused on building an ecosystem of automated yield-maximizing Alpha products that interoperate to bring optimal alpha to users on a cross-chain level.")}</span>
                    </li>
                    <li onClick={() => history.push("creamfinance")}>
                        {/* icon */}
                        <img src={creamfinance} width="40px" /><br />
                        {/* 이름 */}
                        <span className="theDefiListCardTitle">Cream Financep</span><br />
                        {/* 설명 */}
                        <span className="theDefiListCardText">{textEllipsis("C.R.E.A.M. is a peer to peer lending and exchange platform on Ethereum and BSC.")}</span>
                    </li>
                    <li onClick={() => history.push("bakeryswap")}>
                        {/* icon */}
                        <img src={bakeryswap} width="40px" /><br />
                        {/* 이름 */}
                        <span className="theDefiListCardTitle">Bakery Swap</span><br />
                        {/* 설명 */}
                        <span className="theDefiListCardText">{textEllipsis("Bakery Swap is the first AMM and NFT platform on Binance Smart Chain.")}</span>
                    </li>
                    <li onClick={() => window.open("https://for.tube/home", "_blank")}>
                        {/* icon */}
                        <img src={fortube} width="40px" /><br />
                        {/* 이름 */}
                        <span className="theDefiListCardTitle">ForTube</span><br />
                        {/* 설명 */}
                        <span className="theDefiListCardText">{textEllipsis("Based on The Force Protocol, ForTube is committed to providing decentralized lending services for cryptoasset enthusiasts around the world.")}</span>
                    </li>
                    <li onClick={() => window.open("https://fry.world/", "_blank")}>
                        {/* icon */}
                        <img src={fryworld} width="40px" /><br />
                        {/* 이름 */}
                        <span className="theDefiListCardTitle">FryWorld</span><br />
                        {/* 설명 */}
                        <span className="theDefiListCardText">{textEllipsis("Automated Market Maker built on Binance Smart Chain.")}</span>
                    </li>
                    <li onClick={() => history.push("narwhalswap")}>
                        {/* icon */}
                        <img src={narwhalswap} width="40px" /><br />
                        {/* 이름 */}
                        <span className="theDefiListCardTitle">Narwhal Swap</span><br />
                        {/* 설명 */}
                        <span className="theDefiListCardText">{textEllipsis("Narwhalswap is an AMM protocol but is on Binance Smart Chain.")}</span>
                    </li>
                </ul>
                <Footer />
            </div>
        </>
    );
})

export default TheDefiList;
