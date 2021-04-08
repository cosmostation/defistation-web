import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import useStores from '../../useStores';

import _ from "lodash";

import '../../App.css';

import defistationApplicationList from "../../defistationApplicationList.json";

import { numberWithCommas, capitalize, replaceAll, getOfficialDefiName, getOfficialCategoryName, getCurrencyDigit, getCurrencyUnit, convertDateFormat2, generateRandom } from '../../util/Util';

// table icon
import rankIcon1 from "../../assets/images/rank1@2x.png";
import rankIcon2 from "../../assets/images/rank2@2x.png";
import rankIcon3 from "../../assets/images/rank3@2x.png";

import verifiedIcon from "../../assets/images/verifiedic.svg";
import noVerifiedIcon from "../../assets/images/verifiedic_none.svg";

import questionIcon from "../../assets/images/question_ic.svg";

// coin image
import defaultIcon from "../../assets/images/defiLogo/project-none@2x.png";
import acryptos from "../../assets/images/coins/acryptos.png";
import anyswap from "../../assets/images/coins/anyswap.png";
import autofarm from "../../assets/images/coins/auto.png";
import bakeryswap from "../../assets/images/coins/bakery.png";
import bdollar from "../../assets/images/coins/bdollar.png";
import beefyfinance from "../../assets/images/coins/beefy-finance.png";
import bnexchange from "../../assets/images/coins/bnex.svg";
import bscswap from "../../assets/images/coins/bscswap.png";
import bstablefinance from "../../assets/images/coins/bstable.png";
import burgerswap from "../../assets/images/coins/burger-swap.png";
import cberry from "../../assets/images/coins/cberry.png";
// import creamfinance from "../../assets/images/coins/cream-finance.png";
import creamfinance from "../../assets/images/defiLogo/creamfinance@2x.png";
import fortube from "../../assets/images/coins/fortube.png";
import fryworld from "../../assets/images/coins/fryworld.png";
import jetfuel from "../../assets/images/coins/jetfuel.png";
import julswap from "../../assets/images/coins/julswap.png";
import milk from "../../assets/images/coins/milk.png";
import narwhalswap from "../../assets/images/coins/narwhalswap.png";
import pancakebunny from "../../assets/images/coins/pancakebunny.png";
import pancake from "../../assets/images/coins/pancakeswap.png";
import qian from "../../assets/images/coins/qian-kun.png";
import spartanprotocol from "../../assets/images/coins/spartan-protocol.png";
import stormswap from "../../assets/images/coins/storm.png";
import thugs from "../../assets/images/coins/thugs.png";
import venus from "../../assets/images/coins/venus.png";
import MidasDollar from "../../assets/images/defiLogo/MidasDollar@2x.png";
import LinearFinance from "../../assets/images/defiLogo/LinearFinance@2x.png";
import KEEP3RBSC from "../../assets/images/defiLogo/KEEP3RBSC@2x.png";
import kebab from "../../assets/images/defiLogo/kebab@2x.png";
import goosefinance from "../../assets/images/defiLogo/goosefinance@2x.png";
import CrowFinance from "../../assets/images/defiLogo/CrowFinance@2x.png";
import CheeseSwap from "../../assets/images/defiLogo/CheeseSwap@2x.png";
import bscex from "../../assets/images/defiLogo/bscex@2x.png";
import derifinance from "../../assets/images/defiLogo/derifinance@2x.png";
import beltfinance from "../../assets/images/defiLogo/belt@2x.png";
import bifi from "../../assets/images/defiLogo/bififinance@2x.png";
import blackholeswap from "../../assets/images/defiLogo/blackholeswap@2x.png";
import multiplier from "../../assets/images/defiLogo/multiplier@2x.png";
import pikafinance from "../../assets/images/defiLogo/pikafinance@2x.png";
import bscrunner from "../../assets/images/defiLogo/bscrunner@2x.png";
import ellipsisfinance from "../../assets/images/defiLogo/ellipsisfinance@2x.png";
import demex from "../../assets/images/defiLogo/demex@2x.png";
import dodo from "../../assets/images/defiLogo/dodo@2x.png";
import helmet from "../../assets/images/defiLogo/helmet@2x.png";

import ariesfinancial from "../../assets/images/defiLogo/ariesfinancial@2x.png";

const DefiList = observer((props) => {
    const { global } = useStores();
    const history = useHistory();
    const [responseError, setResponseError] = useState();
    const [defiListTableCode, setDefiListTableCode] = useState();

    const [volumeTag, setVolumeTag] = useState();

    function findLogoUrl(defiName) {
        // defistationApplicationList 에서 Official Project Name 이 defiName와 일치하는 것 찾기

        // 예외처리
        if (defiName == "pancake") {
            defiName = "PancakeSwap";
        }
        
        let logoUrl = "";
        for (var i = 0; i < defistationApplicationList.length; i++) {
            if (defistationApplicationList[i]["Official Project Name"] == defiName) {
                logoUrl = defistationApplicationList[i]["Project Logo URL (68px*68px png ONLY. Link should directly DISPLAY Logo image. Google drive link is NOT accepted.)"];
                break;
            }
        }
        return logoUrl;
    }

    function findCategoryName(defiName) {
        // defistationApplicationList 에서 Official Project Name 이 defiName와 일치하는 것 찾기

        // 예외처리
        if (defiName == "pancake") {
            defiName = "PancakeSwap";
        }
        
        let categoryName = "";
        for (var i = 0; i < defistationApplicationList.length; i++) {
            if (defistationApplicationList[i]["Official Project Name"] == defiName) {
                categoryName = defistationApplicationList[i]["Project Category"];
                break;
            }
        }
        return categoryName;
    }

    function onClickTooltipContent(e) {
        // do not hide tooltip when clicking inside tooltip content area
        e.stopPropagation()
    }

    function getAuditInfo(defiName) {
        console.log("getAuditInfo 시작");

        let resultArr = [false, []];
        // [true, [["업체명", "http://..."],["업체명", "http://..."],["업체명", "http://..."] ... ]]
        // [true, []]]
        // [false, []]]

        // 예외처리
        if (defiName == "pancake") {
            defiName = "PancakeSwap";
        }
        
        let categoryName = "";
        for (var i = 0; i < defistationApplicationList.length; i++) {
            if (defistationApplicationList[i]["Official Project Name"] == defiName) {

                // defistationApplicationList[i]["Security Information"]
                
                let auditStr = defistationApplicationList[i]["Security Information"].trim();

                if (auditStr != "") {
                    if (auditStr.toUpperCase() == "YES") {
                        resultArr[0] = true;
                    } else {
                        // 업체명: https://.... , 업체명: https://.... 형태인가?
                        if (auditStr.indexOf(": http") != -1 || auditStr.indexOf(":http") != -1) {
                            // 형식이 맞다
                            resultArr[0] = true;

                            // parsing
                            // 먼저 , 기준으로 split
                            let auditArr = auditStr.split(",");

                            for (var i = 0; i < auditArr.length; i++) {
                                let tempStr = (auditArr[i]).trim();
                                let auditArr2 = tempStr.split(":");
                                resultArr[1].push(auditArr2);
                            }
                        }
                    }
                }


                // if ((defistationApplicationList[i]["Security Information"]).indexOf("http") != -1) {

                //     let testStr = 
                //     `CertiK: https://www.certik.org/projects/autofarm,
                //     Vidar the Community Auditor: https://autofarm.network/audit_vidar_autofarm_v2.pdf`;

                //     categoryName = defistationApplicationList[i]["Security Information"];
                //     break;
                // }
            }
        }
        return resultArr;
    }

    function selectCoinImg(defiName) {
        let resultImg = "";

        switch (defiName) {
            case "pancake":
                resultImg = pancake;
                break; 
            case "bscSwap":
                resultImg = bscswap;
                break;   
            case "Spartan Protocol":
                resultImg = spartanprotocol;
                break;   
            case "Burger Swap":
                resultImg = burgerswap;
                break;   
            case "Stakecow":
                resultImg = milk;
                break;
            case "Cream Finance":
                resultImg = creamfinance;
                break;   
            case "Bakery Swap":
                resultImg = bakeryswap;
                break;   
            case "ForTube":
                resultImg = fortube;
                break;   
            case "FryWorld":
                resultImg = fryworld;
                break;   
            case "beefy.finance":
                resultImg = beefyfinance;
                break;
            case "Narwhalswap":
                resultImg = narwhalswap;
                break;   
            case "STORMSWAP":
                resultImg = stormswap;
                break;       
            case "BnEX":
                resultImg = bnexchange;
                break;
            case "bStable.finance":
                resultImg = bstablefinance;
                break;
            case "QIAN":
                resultImg = qian;
                break;    
            case "PancakeBunny":
                resultImg = pancakebunny;
                break;
            case "JulSwap":
                resultImg = julswap;
                break;
            case "AnySwap":
                resultImg = anyswap;
                break;
            case "Venus":
                resultImg = venus;
                break;   
            case "Thugs":
                resultImg = thugs;
                break; 
            case "CBerry":
                resultImg = cberry;
                break; 
            case "Jetfuel.Finance":
                resultImg = jetfuel;
                break;  
            case "ACryptoS":
                resultImg = acryptos;
                break;
            case "bDollar Protocol":
                resultImg = bdollar;
                break;   
            case "Autofarm":
                resultImg = autofarm;
                break;
            case "Kebab Finance":
                resultImg = kebab;
                break;
            case "KEEP3R BSC NETWORK":
                resultImg = KEEP3RBSC;
                break;
            case "CheeseSwap":
                resultImg = CheeseSwap;
                break;
            case "Midas Dollar":
                resultImg = MidasDollar;
                break;
            case "CrowFinance":
                resultImg = CrowFinance;
                break;
            case "Goose Finance":
                resultImg = goosefinance;
                break;
            case "BSCex":
                resultImg = bscex;
                break;
            case "Linear Finance":
                resultImg = LinearFinance;
                break;
            case "Deri Protocol":
                resultImg = derifinance;
                break;
            case "Belt Finance":
                resultImg = beltfinance;
                break;
            case "BiFi":
                resultImg = bifi;
                break;
            case "Multi-Chain Lend (MCL)":
                resultImg = multiplier;    
                break;    
            case "BlackHoleSwap":
                resultImg = blackholeswap;    
                break;
            case "Pika Finance":
                resultImg = pikafinance;    
                break;  
            case "Bscrunner":
                resultImg = bscrunner;
                break;
            case "Ellipsis Finance":
                resultImg = ellipsisfinance;
                break;
            case "DODO":
                resultImg = dodo;
                break;
            case "Demex":
                resultImg = demex;
                break;
            case "Helmet":
                resultImg = helmet;
                break;   
            case "ARIES FINANCIAL":
                resultImg = ariesfinancial;
                break;
            default:
                resultImg = findLogoUrl(defiName);
                break;    
        }

        return resultImg;
    }

    const [urlFlag1, setUrlFlag1] = useState(false);

    async function getDefiList() {
        if (urlFlag1) return;
        setUrlFlag1(true);

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
                let rankingCount = 1;

                // AD random
                let adNum = generateRandom(0, res.length);

                for (var i = 0; i < res.length; i++) {
                    let chainName;
                    // let rankNum = i + 1;
                    
                    let rankNum = rankingCount;
                    let defiName = res[i].name;
                    let defiName0 = defiName;
                    let coinImg = selectCoinImg(res[i].name);

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

                    // ------------------------------------- Audit Mark START -------------------------------------
                    // let verifiedTag;
                    // if (res[i].verified) {
                    //     verifiedTag = <img src={verifiedIcon} />
                    // } else {
                    //     verifiedTag = <img src={noVerifiedIcon} />
                    // }
                    
                    if (defiName0 == "pancake") {
                        defiName0 = "PancakeSwap";
                    }
                    
                    var listIndex = defistationApplicationList.map(function(o) { return o["Official Project Name"]; }).indexOf(defiName0);

                    let auditStr = "";
                    if (listIndex != -1) {
                        let tempAuditStr = defistationApplicationList[listIndex]["Security Information"];
                        let auditArr = tempAuditStr.split(";");

                        for (var j = 0; j < auditArr.length; j++) {
                            let auditName = "";
                            let auditUrl = "";
                            
                            let detailAuditArr = ((auditArr[j]).trim()).split(":");
                            
                            if (detailAuditArr[0] != undefined) {
                                auditName = detailAuditArr[0];
                            }

                            if (detailAuditArr[1] != undefined && detailAuditArr[2] != undefined) {
                                // https: 때문에 2개로 나눠지는 거 다시 합치기
                                auditUrl = detailAuditArr[1] + ":" + detailAuditArr[2];
                                if (auditUrl.length > 0) {
                                    auditUrl = (auditUrl).trim();
                                }
                            }

                            if (j == 0) {
                                auditStr = "<p id='tooltipAuditTooltipBox' style='text-align:left;'><span id='auditGreen'>⦁ </span><span id='auditGreen'>Audited</span><br />";
                            }

                            if (defiName0 == "Jetfuel.Finance") {
                                console.log("auditName: ", auditName);
                            }

                            if (auditName != "YES" && auditName != "https" && auditName != "http" && tempAuditStr != "") {
                                auditStr += "<span>" + auditName + ": </span><a href='javascript:window.open(`" + auditUrl +  "`, `_blank`);'>" + auditUrl +  "</a><br />";
                            }

                            if (j == auditArr.length - 1) {
                                auditStr += "</p>";
                            }
                        }
                    }

                    let verifiedTag;
                    if (res[i].verified) {
                        verifiedTag = 
                        <div>
                            <p
                                className="tooltipRect"
                                data-place = "right"
                                data-arrow-color = "#0d1015"
                                data-background-color = "#0d1015"
                                data-delay-hide = "500"
                                // data-tip="<p id='tooltipAuditTooltipBox' style='text-align:left;'><span id='auditGreen'>⦁ </span><span id='auditGreen'>Audited</span><br /><span>Certik: </span><a href='javascript:window.open(`https://github.com/JustLiquidity/audits`, `_blank`);'>https://github.com/JustLiquidity/audits</a></p>"
                                data-tip={auditStr}
                                data-html={true}
                                data-effect="solid"
                            >
                                <span id='auditGreen'>⦁</span>
                            </p>
                        </div>
                    } else {
                        verifiedTag = 
                        <div>
                            <p
                                className="tooltipRect"
                                data-place = "right"
                                data-arrow-color = "#0d1015"
                                data-background-color = "#0d1015"
                                data-delay-hide = "500"
                                data-tip="<p id='tooltipAuditTooltipBox' style='text-align:left;'><span id='auditGray'>⦁ </span><span id='auditGray'>Not Audited</span></p>"
                                data-html={true}
                                data-effect="solid"
                            >
                                <span id='auditGray'>⦁</span>
                            </p>
                        </div>
                    }
                    // ------------------------------------- Audit Mark END -------------------------------------

                    // Last updated(UTC) 표현에서 앞에 20, 뒤에 초 제거
                    let tempDate;
                    // console.log("res[i].lastUpdated: ", res[i].lastUpdated); 
                    if (res[i].lastUpdated == 0) {
                        tempDate = "-";
                    } else {
                        tempDate = new Date(res[i].lastUpdated * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                        tempDate = tempDate.substring(0, tempDate.length - 3);
                    }

                    // tvl
                    let digit = getCurrencyDigit(res[i].lockedUsd);
                    let currencyUnit = getCurrencyUnit(res[i].lockedUsd);
                    let currencyNum;
                    // tvl이 M 이하 단위인 경우 소숫점 1자리만, B 단위 이상은 소숫점 2자리로 표현
                    if (digit <= 1000000) {
                        currencyNum = (res[i].lockedUsd / digit).toFixed(1) * 1;
                    } else {
                        currencyNum = (res[i].lockedUsd / digit).toFixed(2) * 1;
                    }

                    // volume
                    let digit2 = getCurrencyDigit(res[i].volume);
                    let currencyUnitForVolume = getCurrencyUnit(res[i].volume);
                    let currencyVolume = (res[i].volume / digit2).toFixed(2) * 1;

                    let volumeStr;
                    if (res[i].volume > 0) {
                        volumeStr = "$ " + currencyVolume + currencyUnitForVolume;
                    } else {
                        volumeStr = "-";
                    }

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
                        rankingCount++;

                        // 괄호 안 내용 제거
                        let tempCategory = findCategoryName(res[i].name);
                        tempCategory = tempCategory.replace(/\(.*\)/gi, '');
                        if (tempCategory == "") {
                            tempCategory = "Other";
                        }

                        // if (i == adNum) {
                        if (getOfficialDefiName(res[i].name) == "BakerySwap") {
                            // AD: 가장 앞에
                            tableCodeArr.unshift(
                                // <tr className="defiListTableTr" onClick={() => movePage("/" + defiName)}>
                                <tr className="defiListTableTr">
                                    <td>Ad</td>
                                    <td onClick={() => movePage("/" + defiName)}><img class="tokenImg" src={coinImg} onError={(e)=>{e.target.onerror = null; e.target.src=defaultIcon}} /></td>
                                    {/* <td>{coinImg}</td> */}
                                    <td onClick={() => movePage("/" + defiName)}>{getOfficialDefiName(res[i].name)}</td>
                                    <td>
                                        {/* <div style={getAuditInfo(res[i].name)[0] == true ? undefined : { display: "none" } }>
                                            <p
                                                data-place = "bottom"
                                                data-arrow-color = "#000"
                                                data-background-color = "#000"
                                                data-delay-hide = "500"
                                                data-tip="<p id='tooltipAuditTooltipBox' style='text-align:left;'><span id='auditGreen'>⦁ </span><span id='auditGreen'>Audited</span><br /><span>Certik: </span><a href='javascript:window.open(`https://github.com/JustLiquidity/audits`, `_blank`);'>https://github.com/JustLiquidity/audits</a></p>"
                                                data-html={true}
                                            >
                                                {verifiedTag}
                                            </p>
                                            <ReactTooltip clickable = {true} />
                                        </div> */}

                                        {verifiedTag}
                                    </td>
                                    <td>{chainName}</td>
                                    {/* <td>{getOfficialCategoryName(res[i].category)}</td> */}
                                    <td>{tempCategory}</td>
                                    {/* <td>{res[i].contractNum}</td> */}
                                    <td>{res[i].volume > 0 ? volumeStr : <div><p data-tip="24hr trading volume hasn't been posted by project team."> {volumeStr} </p><ReactTooltip /></div>}</td>
                                    <td>$ {numberWithCommas(res[i].lockedUsd)}</td>
                                    <td>$ {currencyNum + currencyUnit}</td>
                                    <td>{change24hTag}</td>
                                    {/* <td>{tempDate}</td> */}
                                </tr>
                            );
                        }

                        tableCodeArr.push(
                            <tr key={i} className="defiListTableTr">
                                <td>{rankNum}</td>
                                <td onClick={() => movePage("/" + defiName)}><img class="tokenImg" key={i} src={coinImg} onError={(e)=>{e.target.onerror = null; e.target.src=defaultIcon}} /></td>
                                {/* <td>{coinImg}</td> */}
                                <td onClick={() => movePage("/" + defiName)}>{getOfficialDefiName(res[i].name)}</td>
                                <td>{verifiedTag}</td>
                                <td>{chainName}</td>
                                {/* <td>{getOfficialCategoryName(res[i].category)}</td> */}
                                <td>{tempCategory}</td>
                                {/* <td>{res[i].contractNum}</td> */}
                                <td>
                                    {res[i].volume > 0 ? volumeStr : <div><p data-tip="24hr trading volume hasn't been posted by project team."> {volumeStr} </p><ReactTooltip /></div>}
                                </td>
                                <td>$ {numberWithCommas(res[i].lockedUsd)}</td>
                                <td>$ {currencyNum + currencyUnit}</td>
                                <td>{change24hTag}</td>
                                {/* <td>{tempDate}</td> */}
                            </tr>
                        );
                    }
                }
                console.count("DefiList Call");

                // console.log("tableCodeArr: ", tableCodeArr);

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
                        <th></th>
                        <th>Name</th>
                        <th>
                            <ul className="defiListTableHeadCell">
                                <li>Audit</li>
                                {/* <li><img src={questionIcon} onClick={() => movePage("/about")} /></li> */}
                            </ul>
                        </th>
                        <th>Chain</th>
                        <th>Category</th>
                        {/* <th>Contract(#)</th> */}
                        <th>Volume 24h</th>
                        <th>Locked</th>
                        <th>Locked</th>
                        <th>
                            <ul className="defiListTableHeadCellRight">
                                <li>Change 24h</li>
                                <li className="change24h"><img src={questionIcon} onClick={() => movePage("/about")} /></li>
                            </ul>
                        </th>
                        {/* <th>Last updated(UTC)</th> */}
                    </tr>
                </thead>
                <tbody className="defiListTableBody">
                    {defiListTableCode}
                    <ReactTooltip clickable = {true} />
                </tbody>
            </table>
            <br />
        </div>
    );
})

export default DefiList;