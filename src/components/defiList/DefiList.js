import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
// import useStores from '../../../useStores';

import '../../App.css';

import { numberWithCommas, capitalize, replaceAll } from '../../util/Util';

import rankIcon1 from "../../assets/images/rank1@2x.png";
import rankIcon2 from "../../assets/images/rank2@2x.png";
import rankIcon3 from "../../assets/images/rank3@2x.png";

const DefiList = observer((props) => {

    const history = useHistory();

    const [responseError, setResponseError] = useState();
    const [response, setResponse] = useState({});

    const [defiListTableCode, setDefiListTableCode] = useState();

    const defistationApiUrl = "https://api.defistation.io";

    async function getDefiList() {
        console.log("getDefiList 함수 시작");

        const res = await fetch(defistationApiUrl + "/defiTvlList");
        res
            .json()
            .then(res => {
                console.log("res: ", res);

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
        getDefiList();



        return () => {

        };
    }, [])

    return (
        <div className="defiList">
            <table className="defiListTable">
                <thead className="defiListTableHead">
                    <tr>
                        <th>Rank</th><th>Name</th><th>Chain</th><th>Category</th><th>Locked(USD)</th><th>1 Day</th>
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