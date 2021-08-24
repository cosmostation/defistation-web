import React, { Component, Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';

import defistationLogo from "../../assets/images/defistation_logo@2x.png";
import defistationLogoAlpha from "../../assets/images/defistation_logo_alpha.svg";
import defistationLogoBeta from "../../assets/images/defistation_logo_beta.svg";
import defistationLogoLightBeta from "../../assets/images/defistation_logo_light_beta.svg";

import bscLogo from "../../assets/images/bsc_logo@2x.png";
import bscScanLogo from "../../assets/images/bscscan_logo@2x.png";
import exchangeLogo from "../../assets/images/exchange_logo@2x.png";
import cosmostationLogo from "../../assets/images/cosmostation_logo@2x.png";

const TopBar = observer((props) => {

    const location = useLocation();
    const history = useHistory();

    const [sideMenuFlag, setSideMenuFlag] = useState(false);

    function movePage(path) {
        history.push(path);
    }

    function scrollDisable() {
        document.body.classList.add('hidden');
    }
    function scrollEnable() {
        document.body.classList.remove('hidden');
    }

    function openSideMenu() {
        scrollDisable();
        setSideMenuFlag(true);
    }

    function closeSideMenu() {
        scrollEnable();
        setSideMenuFlag(false);
    }

    function openWindow(path) {
        window.open(path);
    }

    function movePage(path) {
        history.push(path);
        closeSideMenu();
    }

    useEffect(() => {

        return () => {
            console.log('cleanup');
        };
    }, [])

    return (
        <div className="topBar">
            <div className="sideMenu" style={!sideMenuFlag ? {display: "none"} : undefined}>
                <div className="sideMenuBox">
                    <div className="closeBtn">
                        <span 
                            class="material-icons" 
                            style={{"font-size":"40px", "color": "#6b7583"}} 
                            onClick={() => closeSideMenu()}
                        >close</span>
                    </div>
                    <ul className="sideMenuUl">
                        {/* <li><span onClick={() => openWindow("https://t.me/defistation")}>Community <span class="material-icons" style={{"font-size":"13px"}}>open_in_new</span></span></li> */}
                        <li><span onClick={() => openWindow("https://t.me/defistation")}>Community</span></li>
                        <li><span onClick={() => movePage("/about")}>About</span></li>
                        <li><span onClick={() => movePage("/projects")}>Projects</span></li>
                        <hr className="sideMenuLine" />
                        <li>
                            <ul className="sideMenuIconLabel" onClick={() => openWindow("https://www.binance.org/en/smartChain")}>
                                <li><img src={bscLogo} style={{"width":"24px"}} /></li>
                                <li><span>Binance Smart Chain</span></li>
                            </ul>
                        </li>
                        <li>
                            <ul className="sideMenuIconLabel" onClick={() => openWindow("https://bscscan.com/")}>
                                <li><img src={bscScanLogo} style={{"width":"24px"}} /></li>
                                <li><span>BscScan</span></li>
                            </ul>
                        </li>
                        <li>
                            <ul className="sideMenuIconLabel" onClick={() => openWindow("https://www.binance.com/en?ref=39076268")}>
                                <li><img src={exchangeLogo} style={{"width":"24px"}} /></li>
                                <li><span>Exchange</span></li>
                            </ul>
                        </li>
                        <li>
                            <ul className="sideMenuIconLabel" onClick={() => openWindow("https://www.cosmostation.io/")}>
                                <li><img src={cosmostationLogo} style={{"width":"24px"}} /></li>
                                <li><span>Cosmostation</span></li>
                            </ul>
                        </li>
                    </ul>
                    
                </div>
                <div className="sideMenuCover" onClick={() => closeSideMenu()}></div>
            </div>
            <ul className="topBarUl">
                <li>
                    {/* <img src={topBarLogo} style={{"width":"260px"}} onClick={() => movePage("/")} /> */}
                    {/* Defistation Default Theme: Dark */}
                    <img src={defistationLogoLightBeta} style={{"width":"260px"}} onClick={() => movePage("/")} />
                </li>
                {/* <li><span onClick={() => openWindow("https://t.me/defistation")}>Community <span class="material-icons" style={{"font-size":"13px"}}>open_in_new</span></span></li> */}
                <li><span onClick={() => openWindow("https://t.me/defistation")}>Community</span></li>
                <li><span onClick={() => movePage("/about")}>About</span></li>
                <li><span onClick={() => movePage("/projects")}>Projects</span></li>
                <li>
                    <span onClick={() => openSideMenu()} class="material-icons">menu</span>
                </li>
            </ul>
        </div>
    );
})

export default TopBar;