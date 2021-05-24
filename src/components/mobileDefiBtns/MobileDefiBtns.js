import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import useStores from '../../useStores';
import { numberWithCommas, capitalize, replaceAll, getCurrencyUnit, getCurrencyDigit } from '../../util/Util';

import '../../App.css';

import MobileDefiBtn from './mobileDefiBtn/MobileDefiBtn';
import defistationApplicationList from "../../defistationApplicationList.json";

const MobileDefiBtns = observer((props) => {

    function findDefiIndexNum(defiName) {
        // 예외처리
        if (defiName == "pancake") {
            defiName = "PancakeSwap";
        } else if (defiName == "Stakecow") {
            defiName = "Milk Protocol";
        }
        
        let index = 0;
        for (var i = 0; i < defistationApplicationList.length; i++) {
            if (defistationApplicationList[i]["Official Project Name"] == defiName) {
                index = i;
                break;
            }
        }
        return index;
    }

    useEffect(() => {
        
        return () => {

        };

    }, [props.defiName])

    return (
        <ul className="mobileDefiBtnsUl">
            <MobileDefiBtn defiName={props.defiName} iconName="officialsite" url={defistationApplicationList[findDefiIndexNum(props.defiName)]["Project Official Website (URL)"]} />
            <MobileDefiBtn defiName={props.defiName} iconName="github" url={defistationApplicationList[findDefiIndexNum(props.defiName)]["Github URL"]} />
            <MobileDefiBtn defiName={props.defiName} iconName="docs" url={defistationApplicationList[findDefiIndexNum(props.defiName)]["Developer Docs URL"]} />
            <MobileDefiBtn defiName={props.defiName} iconName="twitter" url={defistationApplicationList[findDefiIndexNum(props.defiName)]["Twitter URL"]} />
            <MobileDefiBtn defiName={props.defiName} iconName="telegram" url={defistationApplicationList[findDefiIndexNum(props.defiName)]["Telegram(EN) URL"]} />
            <MobileDefiBtn defiName={props.defiName} iconName="medium" url={defistationApplicationList[findDefiIndexNum(props.defiName)]["Medium Blog URL"]} />
        </ul>
    );
})

export default MobileDefiBtns;