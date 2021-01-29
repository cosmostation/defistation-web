import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import useStores from '../../useStores';
import _ from "lodash";

import '../../App.css';

import { numberWithCommas, capitalize, replaceAll, getOfficialDefiName, getOfficialCategoryName, getCurrencyDigit, getCurrencyUnit, convertDateFormat2 } from '../../util/Util';

// table icon
import rankIcon1 from "../../assets/images/rank1@2x.png";
import rankIcon2 from "../../assets/images/rank2@2x.png";
import rankIcon3 from "../../assets/images/rank3@2x.png";

import verifiedIcon from "../../assets/images/verifiedic.svg";
import noVerifiedIcon from "../../assets/images/verifiedic_none.svg";

import questionIcon from "../../assets/images/question_ic.svg";

const DefiList = observer((props) => {
    const { global } = useStores();

    const history = useHistory();

    const [responseError, setResponseError] = useState();

    const [defiListTableCode, setDefiListTableCode] = useState();

    async function getDefiList() {
        console.count("getDefiListCall");
        // if (global.chartDataDetails == null) return;
        // console.log("global.chartDataDetails.pancake[1603274430]: ", global.chartDataDetails.pancake[1603274430]);

        const res = await fetch(global.defistationApiUrl + "/defiTvlList", {
            method: 'GET',
            headers: {
                Authorization: global.auth
            }
        });
        res
            .json()
            .then(res => {
                // console.log("res: ", res);

                let tableCodeArr = [];

                for (var i = 0; i < res.length; i++) {
                    let chainName;
                    let rankNum = i + 1;
                    let defiName = res[i].name;

                    // beefy.finance 같은 경우 기호, 공백 제거(url 용도)
                    defiName = replaceAll(defiName, ".", "");
                    defiName = replaceAll(defiName, " ", "");
                    defiName = defiName.toLowerCase();

                    if (i == 0) {
                        rankNum = <img src={rankIcon1} style={{ "width": "24px", marginTop: "4px" }} />;
                    } else if (i == 1) {
                        rankNum = <img src={rankIcon2} style={{ "width": "24px", marginTop: "4px" }} />;
                    } else if (i == 2) {
                        rankNum = <img src={rankIcon3} style={{ "width": "24px", marginTop: "4px" }} />;
                    }

                    if (res[i].chain == "bsc") {
                        chainName = "BSC";
                    } else {
                        chainName = res[i].chain;
                    }

                    // 현재 기준 변화량
                    let change24hValue = res[i].tvlPercentChange24h;
                    let change24hTag;

                    if (change24hValue == 1) {
                        // 100% 는 표기하지 않는다
                        change24hTag = <span>-</span>;
                    } else {
                        if (change24hValue > 0) {
                            // +
                            change24hTag = <span className="textGreen">+{(change24hValue * 100).toFixed(2)}%</span>;
                        } else if (change24hValue == 0) {
                            change24hTag = <span>{(change24hValue * 100).toFixed(2)}%</span>;
                        } else if (change24hValue < 0) {
                            change24hTag = <span className="textRed">{(change24hValue * 100).toFixed(2)}%</span>;
                        }
                    }

                    let verifiedTag;
                    if (res[i].verified) {
                        verifiedTag = <img src={verifiedIcon} />
                    } else {
                        verifiedTag = <img src={noVerifiedIcon} />
                    }

                    // Last updated(UTC) 표현에서 앞에 20, 뒤에 초 제거
                    let tempDate;
                    console.log("res[i].lastUpdated: ", res[i].lastUpdated); 
                    if (res[i].lastUpdated == 0) {
                        tempDate = "-";
                    } else {
                        tempDate = new Date(res[i].lastUpdated * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                        tempDate = tempDate.substring(0, tempDate.length - 3);
                    }

                    let digit = getCurrencyDigit(res[i].lockedUsd);
                    let currencyUnit = getCurrencyUnit(res[i].lockedUsd);
                    let currencyNum = (res[i].lockedUsd / digit).toFixed(2) * 1;

                    if (res[i].contractNum == 0) {
                        // tableCodeArr.push(
                        //     <tr key={i}>
                        //         <td>{rankNum}</td>
                        //         <td>{verifiedTag}</td>
                        //         <td>{getOfficialDefiName(res[i].name)}</td>
                        //         <td>{chainName}</td>
                        //         <td>{getOfficialCategoryName(res[i].category)}</td>
                        //         {/* <td></td> */}
                        //         <td></td>
                        //         <td></td>
                        //         <td></td>
                        //         <td><span className="comingSoon">Coming Soon</span></td>
                        //     </tr>
                        // );
                    } else {
                        tableCodeArr.push(
                            <tr key={i} className="defiListTableTr" onClick={() => movePage("/" + defiName)}>
                                <td>{rankNum}</td>
                                <td>{verifiedTag}</td>
                                <td>{getOfficialDefiName(res[i].name)}</td>
                                <td>{chainName}</td>
                                <td>{getOfficialCategoryName(res[i].category)}</td>
                                {/* <td>{res[i].contractNum}</td> */}
                                <td>$ {numberWithCommas(res[i].lockedUsd)}</td>
                                <td>$ {currencyNum + currencyUnit}</td>
                                <td>{change24hTag}</td>
                                <td>{tempDate}</td>
                            </tr>
                        );
                    }
                }
                console.count("DefiList Call");
                setDefiListTableCode(tableCodeArr);
            })
            .catch(err => setResponseError(err));
    }

    function movePage(path) {
        history.push(path);
    }

    useEffect(() => {
        getDefiList();

        return () => {

        };
    }, [global.chartDataDetails])

    return (
        <div className="defiList">
            <table className="defiListTable">
                <thead className="defiListTableHead">
                    <tr>
                        <th>Rank</th>
                        <th>
                            <ul className="defiListTableHeadCell">
                                <li>Audit</li>
                                {/* <li><img src={questionIcon} onClick={() => movePage("/about")} /></li> */}
                            </ul>
                        </th>
                        <th>Name</th>
                        <th>Chain</th>
                        <th>Category</th>
                        {/* <th>Contract(#)</th> */}
                        <th>Locked</th>
                        <th>Locked</th>
                        <th>
                            <ul className="defiListTableHeadCellRight">
                                <li>Change 24h</li>
                                <li className="change24h"><img src={questionIcon} onClick={() => movePage("/about")} /></li>
                            </ul>
                        </th>
                        <th>Last updated(UTC)</th>
                    </tr>
                </thead>
                <tbody className="defiListTableBody">
                    {defiListTableCode}
                </tbody>
            </table>
            <br />
        </div>
    );
})

export default DefiList;