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
    const [miniCardData3, setMiniCardData3] = useState("");

    const [totalBnbLockedNum, setTotalBnbLockedNum] = useState(0);
    const [projectNum, setProjectNum] = useState(0);

    const [lockedBnbAmount, setLockedBnbAmount] = useState();

    const [tvl1DayPercentTag, setTvl1DayPercentTag] = useState();

    async function getTotalBnbLocked(defiName) {
        // console.log("getTotalBnbLocked 함수 시작");

        let urlStr = "";
        if (defiName == "DeFi") {
            urlStr = "all";
        } else {
            urlStr = defiName;
        }

        // console.log("urlStr: ", urlStr);
        if (urlStr == "") return;
        const res = await fetch(global.defistationApiUrl + "/bnblockedList/" + urlStr);
        res
            .json()
            .then(res => {

                // res.result 를 배열로 바꾸고 가장 마지막 요소(최신) 확인
                let resultObj = res.result;
                var resultArr = Object.keys(resultObj).map((key) => [Number(key), resultObj[key]]);

                // console.log("res: ", res);
                setTotalBnbLockedNum(numberWithCommas(Math.floor(resultArr[resultArr.length - 1][1])));

                // setLockedBnbAmount(resultArr[resultArr.length - 1][1]);
                // 해당 Defi BNB와 전체 BNB 유통량 비율
                if (props.defiName != "DeFi") {
                    // 유통량: 147883948
                    setMiniCardData3(((resultArr[resultArr.length - 1][1] * 1 / 147883948 * 100).toFixed(4) * 1) + "%");
                }
            })
            .catch(err => setResponseError(err));
    }

    async function getProjectNumOnHome(defiName) {
        // console.log("getProjectNum 함수 시작");

        let urlStr = "";
        if (defiName == "DeFi") {
            urlStr = "all";
        } else {
            urlStr = defiName;
        }

        // console.log("urlStr: ", urlStr);
        const res = await fetch(global.defistationApiUrl + "/defiNames");
        res
            .json()
            .then(res => {
                // console.log("res: ", res);
                setMiniCardData3(numberWithCommas(res.length));
            })
            .catch(err => setResponseError(err));
    }

    function showTvl1Day() {
        // console.log("showTvl1Day 함수 시작");
        // console.log("global.tvl1DayPercent: ", global.tvl1DayPercent);
        if (global.tvl1DayPercent > 0) { 
            setTvl1DayPercentTag("+" + global.tvl1DayPercent + "%");
        } else {
            setTvl1DayPercentTag(global.tvl1DayPercent + "%");
        }
    }

    useEffect(() => {
        // console.log("props.defiName: ", props.defiName);

        getTotalBnbLocked(props.defiName);
        showTvl1Day();
        
        if (props.defiName == "DeFi") {
            // 메인에서 프로젝트 숫자 보여주기
            getProjectNumOnHome();

            setMiniCardTitle3("Projects");
            // setMiniCardData3(3);
        } else {
            setMiniCardTitle3("Supply Locked");
            //props.defiName 에 따라 다른 데이터 넣으면 됨
        }
        
        return () => {

        };
    }, [props.defiName, global.tvl1DayPercent])

    return (
        <div className="miniCards">
            <ul className="miniCardUl">
                <MiniCard title="Total Value Locked" dataNum={global.totalValueLockedUsd} />
                <MiniCard title="Total BNB Locked" dataNum={totalBnbLockedNum} symbol="BNB" />
                <MiniCard title={miniCardTitle3} dataNum={miniCardData3} />
                <MiniCard title="TVL Change 24h" dataNum={tvl1DayPercentTag} />
            </ul>
        </div>
    );
})

export default MiniCards;