import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import useStores from '../../useStores';

import '../../App.css';

import { numberWithCommas, capitalize, replaceAll, getCurrencyUnit, getCurrencyDigit, convertDateFormat } from '../../util/Util';

import rankIcon1 from "../../assets/images/rank1@2x.png";
import rankIcon2 from "../../assets/images/rank2@2x.png";
import rankIcon3 from "../../assets/images/rank3@2x.png";

const DefiDetailList = observer((props) => {
    const { global } = useStores();

    const history = useHistory();

    const [responseError, setResponseError] = useState();
    const [response, setResponse] = useState({});

    const [defiDataTag, setDefiDataTag] = useState();

    const [defiListTableCode, setDefiListTableCode] = useState();

    const defistationApiUrl = "https://api.defistation.io";

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function getMonthAndDay(date) {
        let monthName = monthNames[date.getMonth()];
        let day = date.getDate();
        return monthName + " " + day;
    }

    async function getBnbLockedList(defiName) {
        return new Promise(async function(resolve, reject) {
            const res = await fetch(global.defistationApiUrl + "/bnblockedList/" + defiName);
            res
                .json()
                .then(res => {
                    if (res.result == null) return;

                    let resultObj = res.result;
                    var resultArr = Object.keys(resultObj).map((key) => [Number(key), resultObj[key]]);

                    resolve(resultArr);
                });
        });    
    }

    async function getChart(defiName) {
        // console.log("getChart 함수 시작");

        let urlStr = "";
        if (defiName == "DeFi") {
            urlStr = "all";
        } else {
            urlStr = defiName;
        }

        console.log("urlStr: ", urlStr);
        if (urlStr == "") return;

        let lockedBnbArr = await getBnbLockedList(defiName);
        console.log("lockedBnbArr: ", lockedBnbArr);

        const res = await fetch(global.defistationApiUrl + "/chart/" + urlStr);
        res
            .json()
            .then(res => {
                if (res.result == null) return;

                // console.log("test1111111");

                // res.result 를 배열로 바꾸기 
                let resultObj = res.result;
                var resultArr = Object.keys(resultObj).map((key) => [Number(key), resultObj[key]]);

                let initTimestamp = 0;
                let tempMinTvl = 0;

                // K, M, B 기준은 최초 0번째 데이터
                let digit = getCurrencyDigit(resultArr[0][1]);
                let currencyUnit = getCurrencyUnit(resultArr[0][1]);
                
                let defiDataTagArr = [];

                // console.log("test111111111111");

                let tvlChangeTag;
                let bnbChangeTag;

                for (var i = 0; i < resultArr.length; i++) {
                    if (i == 0) {
                        initTimestamp = resultArr[i][0];
                    }

                    // console.log("resultArr[i][0]: ", resultArr[i][0]);
                    // console.log("resultArr[i][1]: ", resultArr[i][1]);

                    // let digit = getCurrencyDigit(resultArr[i][1]);
                    // console.log("digit: ", digit);

                    let currencyNum = (resultArr[i][1] / digit).toFixed(3) * 1;

                    // if (i == 0) {
                    //     tempMinTvl = currencyNum;
                    // } else {
                    //     // 가장 작은 값 찾기(vAxis 최솟값)
                    //     if (tempMinTvl > currencyNum) {
                    //         tempMinTvl = currencyNum;
                    //     }
                    // }

                    let tvlChange = 0;
                    if (i > 0) {
                        tvlChange = (1 - resultArr[i - 1][1] / resultArr[i][1]);
                        if (tvlChange > 0) {
                            // +
                            tvlChangeTag = <span className="textGreen">+{(tvlChange * 100).toFixed(2)}%</span>;
                        } else if (tvlChange == 0) {
                            tvlChangeTag = <span>{(tvlChange * 100).toFixed(2)}%</span>;
                        } else if (tvlChange < 0) {
                            tvlChangeTag = <span className="textRed">{(tvlChange * 100).toFixed(2)}%</span>;
                        }
                    }

                    // BNB locked 변화량(개수로 표현)
                    let bnbChange = 0;
                    if (i > 0) {
                        bnbChange = lockedBnbArr[i][1] - lockedBnbArr[i - 1][1];
                        if (bnbChange > 0) {
                            // +
                            bnbChangeTag = <span className="textGreen">+{numberWithCommas(Math.floor(bnbChange))}</span>;
                        } else if (bnbChange == 0) {
                            bnbChangeTag = <span>{numberWithCommas(Math.floor(bnbChange))}</span>;
                        } else if (bnbChange < 0) {
                            bnbChangeTag = <span className="textRed">{numberWithCommas(Math.floor(bnbChange))}</span>;
                        }
                    }


                    // tempChartData.push([getMonthAndDay(new Date(resultArr[i][0] * 1000)), currencyNum]);

                    // let tempDate = new Date(resultArr[i][0] * 1000);
                    // console.log("getMonthAndDay(new Date(resultArr[i][0] * 1000)): ", getMonthAndDay(new Date(resultArr[i][0] * 1000)));

                    // console.log("2: ", numberWithCommas(resultArr[i][1]));
                    // console.log("3: ", tvlChangeTag);
                    // console.log("4: ", numberWithCommas(Math.floor(lockedBnbArr[i][1])));
                    // console.log("5: ", bnbChangeTag);

                    defiDataTagArr.unshift(<tr key={i}>
                        <td>{convertDateFormat(new Date(resultArr[i][0] * 1000))}</td>
                        <td>$ {numberWithCommas(resultArr[i][1])}</td>
                        <td>{tvlChangeTag}</td>
                        <td>{numberWithCommas(Math.floor(lockedBnbArr[i][1]))} <span style={{"color":"#f0b923"}}>BNB</span></td>
                        <td>{bnbChangeTag}</td>
                    </tr>);
                }

                

                setDefiDataTag(defiDataTagArr);
                
                // // 차트 데이터가 7개가 안채워졌으면 앞에 채워넣기
                // if (chartPeriod - resultArr.length > 0) {
                //     let createEmptyDataLength = chartPeriod - resultArr.length;
                //     // console.log("createEmptyDataLength: ", createEmptyDataLength);
                //     for (var i = 0; i < createEmptyDataLength; i++) {
                //         let calTimestamp = initTimestamp - (86400 * (i + 1));
                //         // tempChartData 의 제일 앞에 넣어야함
                //         tempChartData.unshift([getMonthAndDay(new Date(calTimestamp * 1000)), 0]);
                //     }
                // }

            })
            .catch(err => setResponseError(err));
    }

    function movePage(path) {
        history.push(path);
    }

    useEffect(() => {
        // getDefiList();
        console.log("props.defiName22222: ", props.defiName);
        getChart(props.defiName);

        return () => {

        };
    }, [props.defiName])

    return (
        <div className="defiDetailList">
            <table className="defiDetailListTable">
                <thead className="defiDetailListTableHead">
                    <tr>
                        <th>Date</th><th>TVL</th><th>TVL Change 24h</th><th>Total BNB Locked</th><th>BNB Locked 24h</th>
                    </tr>
                </thead>
                <tbody className="defiDetailListTableBody">
                    {defiDataTag}
                    {/* <tr>
                        <td>2020-10-13</td>
                        <td>$00.00B</td>
                        <td><span className="textGreen">+ 0.00M</span></td>
                        <td>108.65 <span style={{"color":"#f0b923"}}>BNB</span></td>
                        <td><span className="textGreen">+ 000.00</span></td>
                    </tr>
                    <tr>
                        <td>2020-10-13</td>
                        <td>$00.00B</td>
                        <td><span className="textGreen">+ 0.00M</span></td>
                        <td>108.65 <span style={{"color":"#f0b923"}}>BNB</span></td>
                        <td><span className="textGreen">+ 000.00</span></td>
                    </tr>
                    <tr>
                        <td>2020-10-13</td>
                        <td>$00.00B</td>
                        <td><span className="textGreen">+ 0.00M</span></td>
                        <td>108.65 <span style={{"color":"#f0b923"}}>BNB</span></td>
                        <td><span className="textGreen">+ 000.00</span></td>
                    </tr>
                    <tr>
                        <td>2020-10-13</td>
                        <td>$00.00B</td>
                        <td><span className="textGreen">+ 0.00M</span></td>
                        <td>108.65 <span style={{"color":"#f0b923"}}>BNB</span></td>
                        <td><span className="textGreen">+ 000.00</span></td>
                    </tr>
                    <tr>
                        <td>2020-10-13</td>
                        <td>$00.00B</td>
                        <td><span className="textGreen">+ 0.00M</span></td>
                        <td>108.65 <span style={{"color":"#f0b923"}}>BNB</span></td>
                        <td><span className="textGreen">+ 000.00</span></td>
                    </tr>
                    <tr>
                        <td>2020-10-13</td>
                        <td>$00.00B</td>
                        <td><span className="textGreen">+ 0.00M</span></td>
                        <td>108.65 <span style={{"color":"#f0b923"}}>BNB</span></td>
                        <td><span className="textGreen">+ 000.00</span></td>
                    </tr>
                    <tr>
                        <td>2020-10-13</td>
                        <td>$00.00B</td>
                        <td><span className="textGreen">+ 0.00M</span></td>
                        <td>108.65 <span style={{"color":"#f0b923"}}>BNB</span></td>
                        <td><span className="textGreen">+ 000.00</span></td>
                    </tr>
                    <tr>
                        <td>2020-10-13</td>
                        <td>$00.00B</td>
                        <td><span className="textGreen">+ 0.00M</span></td>
                        <td>108.65 <span style={{"color":"#f0b923"}}>BNB</span></td>
                        <td><span className="textGreen">+ 000.00</span></td>
                    </tr>
                    <tr>
                        <td>2020-10-13</td>
                        <td>$00.00B</td>
                        <td><span className="textGreen">+ 0.00M</span></td>
                        <td>108.65 <span style={{"color":"#f0b923"}}>BNB</span></td>
                        <td><span className="textGreen">+ 000.00</span></td>
                    </tr>
                    <tr>
                        <td>2020-10-13</td>
                        <td>$00.00B</td>
                        <td><span className="textGreen">+ 0.00M</span></td>
                        <td>108.65 <span style={{"color":"#f0b923"}}>BNB</span></td>
                        <td><span className="textGreen">+ 000.00</span></td>
                    </tr> */}
                </tbody>
            </table>
            <br />
        </div>
    );
})

export default DefiDetailList;