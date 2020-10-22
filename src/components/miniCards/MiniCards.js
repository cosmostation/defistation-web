import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import useStores from '../../useStores';
import { numberWithCommas, capitalize, replaceAll, getCurrencyUnit, getCurrencyDigit } from '../../util/Util';

import '../../App.css';

import MiniCard from './miniCard/MiniCard';

const MiniCards = observer((props) => {
    const { global } = useStores();

    const [responseError, setResponseError] = useState();
    const [response, setResponse] = useState({});

    const [miniCardTitle3, setMiniCardTitle3] = useState();
    const [miniCardData3, setMiniCardData3] = useState();

    const [totalBnbLockedNum, setTotalBnbLockedNum] = useState(0);
    const [projectNum, setProjectNum] = useState(0);

    async function getTotalBnbLocked(defiName) {
        console.log("getTotalBnbLocked 함수 시작");

        let urlStr = "";
        if (defiName == "DeFi") {
            urlStr = "all";
        } else {
            urlStr = defiName;
        }

        console.log("urlStr: ", urlStr);
        const res = await fetch(global.defistationApiUrl + "/totalbnblocked/" + urlStr);
        res
            .json()
            .then(res => {
                console.log("res: ", res);
                setTotalBnbLockedNum(numberWithCommas(Math.floor(res.totalBnbLocked)));
            })
            .catch(err => setResponseError(err));
    }

    async function getProjectNumOnHome(defiName) {
        console.log("getProjectNum 함수 시작");

        let urlStr = "";
        if (defiName == "DeFi") {
            urlStr = "all";
        } else {
            urlStr = defiName;
        }

        console.log("urlStr: ", urlStr);
        const res = await fetch(global.defistationApiUrl + "/defiNames");
        res
            .json()
            .then(res => {
                console.log("res: ", res);
                setMiniCardData3(numberWithCommas(res.length));
            })
            .catch(err => setResponseError(err));
    }

    useEffect(() => {
        console.log("props.defiName: ", props.defiName);

        getTotalBnbLocked(props.defiName);

        if (props.defiName == "DeFi") {
            // 메인에서 프로젝트 숫자 보여주기
            getProjectNumOnHome();

            setMiniCardTitle3("Project");
            // setMiniCardData3(3);
        } else {
            setMiniCardTitle3("Supply Locked (%)");
            //props.defiName 에 따라 다른 데이터 넣으면 됨
            setMiniCardData3("3.04%");
        }
        
        return () => {

        };
    }, [props.defiName])

    return (
        <div className="miniCards">
            <ul className="miniCardUl">
                <MiniCard title="Total Value Locked (USD)" dataNum={global.totalValueLockedUsd} />
                <MiniCard title="Total BNB Locked" dataNum={totalBnbLockedNum} symbol="BNB" />
                <MiniCard title={miniCardTitle3} dataNum={miniCardData3} />
                <MiniCard title="TVL 1 Day (%)" dataNum="+00.00%" />
            </ul>
        </div>
    );
})

export default MiniCards;