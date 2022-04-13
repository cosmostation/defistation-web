import '../../../App.css';

import React from "react";
import docsIcon from "../../../assets/images/defiLink/icon-docs.svg";
import githubIcon from "../../../assets/images/defiLink/icon-github.svg";
import mediumIcon from "../../../assets/images/defiLink/icon-medium.svg";
import { observer } from 'mobx-react';
import officialSiteIcon from "../../../assets/images/defiLink/icon-officialsite.svg";
import telegramIcon from "../../../assets/images/defiLink/icon-telegram.svg";
import twitterIcon from "../../../assets/images/defiLink/icon-twitter.svg";

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