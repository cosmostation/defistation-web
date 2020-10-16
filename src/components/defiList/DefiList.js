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

        // console.log("currentChainNum : ", getCurrentChainNum());
        // let chainNum = getCurrentChainNum();

        // console.log("chainConfig[0].name : ", chainConfig[chainNum].name);

        // switch (chainConfig[chainNum].name) {
        //   case "band":
        //     const res0 = await fetch(chainConfig[chainNum].lcd + "/staking/pool");
        //     res0
        //       .json()
        //       .then(res0 => {
        //         // 상단 Network Bonded

        //         // let sumTokens = res0.result.not_bonded_tokens * 1 + res0.result.bonded_tokens * 1;
        //         setBondedRatio(res0.result.bonded_tokens * 1 / 100000000000000 * 100);

        //         // bonded 변화율을 아직 api가 없어서 알수 없음
        //         setBondedChangeText(<span className="navTextGray"> </span>);
        //       })
        //       .catch(err => setResponseError(err));
        //     break;
        //   default:
        //     const res = await fetch(chainConfig[chainNum].api.network);
        //     res
        //       .json()
        //       .then(res => {
        //         // 상단 Network Bonded
        //         // https://api.cosmostation.io/v1/stats/network
        //         // bonded_tokens_stats[0].bonded_ratio: 최신

        //         // 상단 Network Bonded 변동률
        //         // bonded_tokens_percent_change_24h

        //         console.log("res(network): ", res);

        //         // 보정치 적용
        //         setBondedRatio(res.bonded_tokens_stats[0].bonded_ratio * chainConfig[chainNum].apiCorrectionValue.network);

        //         // 상단: Network Bonded
        //         if (res.bonded_tokens_percent_change_24h > 0) {
        //           // bonded 변화가 양수일 경우
        //           setBondedChangeText(<span className="navTextGreen">+{(res.bonded_tokens_percent_change_24h * 100).toFixed(2)}% ▴</span>);
        //         } else if (res.bonded_tokens_percent_change_24h == 0) {
        //           setBondedChangeText(<span className="navTextGray">{(res.bonded_tokens_percent_change_24h * 100).toFixed(2)}% </span>);
        //         } else if (res.bonded_tokens_percent_change_24h < 0) {
        //           setBondedChangeText(<span className="navTextRed">{(res.bonded_tokens_percent_change_24h * 100).toFixed(2)}% ▼</span>);
        //         }
        //       })
        //       .catch(err => setResponseError(err));
        //     break;
        // }
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
                    {/* <tr>
                        <td><img src={rankIcon1} style={{ "width": "24px", marginTop: "4px" }} /></td>
                        <td>BSC Swap</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td><img src={rankIcon2} style={{ "width": "24px", marginTop: "4px" }} /></td>
                        <td>Pancake</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td><img src={rankIcon3} style={{ "width": "24px", marginTop: "4px" }} /></td>
                        <td>Mathdapp</td>
                        <td>Binance Smart Chain</td>
                        <td>Lending</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>beefy</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>stakecow</td>
                        <td>Binance Smart Chain</td>
                        <td>Lending</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>peachswap</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>stormswap</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>beergarden</td>
                        <td>Binance Smart Chain</td>
                        <td>Derivatives</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>Apple Swap</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>Boo Swap</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );
})

export default DefiList;