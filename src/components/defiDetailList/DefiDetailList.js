import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
// import useStores from '../../../useStores';

import '../../App.css';

import { numberWithCommas, capitalize, replaceAll } from '../../util/Util';

import rankIcon1 from "../../assets/images/rank1@2x.png";
import rankIcon2 from "../../assets/images/rank2@2x.png";
import rankIcon3 from "../../assets/images/rank3@2x.png";

const DefiDetailList = observer((props) => {

    const history = useHistory();

    const [responseError, setResponseError] = useState();
    const [response, setResponse] = useState({});

    const [defiListTableCode, setDefiListTableCode] = useState();

    const defistationApiUrl = "https://api.defistation.io";

    async function getDefiList() {
        console.log("getDefiList 함수 시작");

        const res = await fetch(defistationApiUrl + "/defiList");
        res
            .json()
            .then(res => {
                console.log("res: ", res);

                let tableCodeArr = [];

                for (var i = 0; i < res.length; i++) {
                    let chainName;
                    let rankNum = i + 1;
                    let defiName = res[i].name;

                    // beefy.finance 같은 경우 기호 제거(url 용도)
                    defiName = replaceAll(defiName, ".", "");
                    // 이름에 빈 칸 제거
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
                        chainName = "Binance Smart Chain";
                    } else {
                        chainName = res[i].chain;
                    }

                    let change24hTag;
                    if (res[i].tvlPercentChange24h > 0) {
                    // +
                    change24hTag = <span className="textGreen">+{(res[i].tvlPercentChange24h * 100).toFixed(2)}%</span>;
                    } else if (res[i].tvlPercentChange24h == 0) {
                    change24hTag = <span>{(res[i].tvlPercentChange24h * 100).toFixed(2)}%</span>;
                    } else if (res[i].tvlPercentChange24h < 0) {
                    change24hTag = <span className="textRed">{(res[i].tvlPercentChange24h * 100).toFixed(2)}%</span>;
                    }

                    tableCodeArr.push(
                        <tr key={i} className="defiListTableTr" onClick={() => movePage("/" + defiName)}>
                            <td>{rankNum}</td>
                            <td>{res[i].name}</td>
                            <td>{chainName}</td>
                            <td>{capitalize(res[i].category)}</td>
                            <td>$ {numberWithCommas(res[i].lockedUsd)}</td>
                            <td>{change24hTag}</td>
                        </tr>
                    );
                }

                setDefiListTableCode(tableCodeArr);
            })
            .catch(err => setResponseError(err));
    }

    function movePage(path) {
        history.push(path);
    }

    useEffect(() => {
        // getDefiList();

        return () => {

        };
    }, [])

    return (
        <div className="defiDetailList">
            <table className="defiDetailListTable">
                <thead className="defiDetailListTableHead">
                    <tr>
                        <th>Date</th><th>TVL (USD)</th><th>TVL Change</th><th>Total BNB Locked</th><th>BNB Locked 1D</th>
                    </tr>
                </thead>
                <tbody className="defiDetailListTableBody">
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
                    </tr>
                    <tr>
                        <td>2020-10-13</td>
                        <td>$00.00B</td>
                        <td><span className="textGreen">+ 0.00M</span></td>
                        <td>108.65 <span style={{"color":"#f0b923"}}>BNB</span></td>
                        <td><span className="textGreen">+ 000.00</span></td>
                    </tr>
                    <br />
                </tbody>
            </table>
        </div>
    );
})

export default DefiDetailList;