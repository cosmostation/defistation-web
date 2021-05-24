import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import useStores from '../../../useStores';
import { numberWithCommas, capitalize, replaceAll, getCurrencyUnit, getCurrencyDigit } from '../../../util/Util';

import '../../../App.css';

import officialSiteIcon from "../../../assets/images/defiLink/icon-officialsite.svg";
import githubIcon from "../../../assets/images/defiLink/icon-github.svg";
import docsIcon from "../../../assets/images/defiLink/icon-docs.svg";
import twitterIcon from "../../../assets/images/defiLink/icon-twitter.svg";
import telegramIcon from "../../../assets/images/defiLink/icon-telegram.svg";
import mediumIcon from "../../../assets/images/defiLink/icon-medium.svg";

const MobileDefiBtn = observer((props) => {

    function openWindow(path) {
        window.open(path);
    }

    return (
        <li className="mobileDefiBtn">
            {
                (props.url).indexOf("http") != -1
                ? <img style={props.iconName == "officialsite" ? undefined : {display: "none"}} src={officialSiteIcon} onClick={() => openWindow(props.url)} />
                : <img style={props.iconName == "officialsite" ? undefined : {display: "none"}} src={officialSiteIcon} className="disableIcon" />
            }
            {
                (props.url).indexOf("http") != -1
                ? <img style={props.iconName == "github" ? undefined : {display: "none"}} src={githubIcon} onClick={() => openWindow(props.url)} />
                : <img style={props.iconName == "github" ? undefined : {display: "none"}} src={githubIcon} className="disableIcon" />
            }
            {
                (props.url).indexOf("http") != -1
                ? <img style={props.iconName == "docs" ? undefined : {display: "none"}} src={docsIcon} onClick={() => openWindow(props.url)} />
                : <img style={props.iconName == "docs" ? undefined : {display: "none"}} src={docsIcon} className="disableIcon" />
            }
            {
                (props.url).indexOf("http") != -1
                ? <img style={props.iconName == "twitter" ? undefined : {display: "none"}} src={twitterIcon} onClick={() => openWindow(props.url)} />
                : <img style={props.iconName == "twitter" ? undefined : {display: "none"}} src={twitterIcon} className="disableIcon" />
            }
            {
                (props.url).indexOf("http") != -1
                ? <img style={props.iconName == "telegram" ? undefined : {display: "none"}} src={telegramIcon} onClick={() => openWindow(props.url)} />
                : <img style={props.iconName == "telegram" ? undefined : {display: "none"}} src={telegramIcon} className="disableIcon" />
            }
            {
                (props.url).indexOf("http") != -1
                ? <img style={props.iconName == "medium" ? undefined : {display: "none"}} src={mediumIcon} onClick={() => openWindow(props.url)} />
                : <img style={props.iconName == "medium" ? undefined : {display: "none"}} src={mediumIcon} className="disableIcon" />
            }
        </li>
    );
})

export default MobileDefiBtn;