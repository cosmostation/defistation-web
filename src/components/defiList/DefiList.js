import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import useStores from '../../useStores';
import _ from "lodash";

import '../../App.css';

import defistationApplicationList from "../../defistationApplicationList.json";

import { numberWithCommas, capitalize, replaceAll, getOfficialDefiName, getOfficialCategoryName, getCurrencyDigit, getCurrencyUnit, convertDateFormat2, generateRandom, convertToBMK } from '../../util/Util';

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

import alphahomora from "../../assets/images/defiLogo/alphahomora@2x.png";
import cobaltfinance from "../../assets/images/defiLogo/cobaltfinance@2x.png";
import swampfinance from "../../assets/images/defiLogo/swampfinance@2x.png";

const DefiList = observer((props) => {
    const { global } = useStores();
    const history = useHistory();
    const [responseError, setResponseError] = useState();
    const [defiListTableCode, setDefiListTableCode] = useState();

    const [volumeTag, setVolumeTag] = useState();

    function findDefiIndexNum(defiName) {
        // 예외처리
        if (defiName == "pancake") {
            defiName = "PancakeSwap";
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

    function findLogoUrl(defiName) {
        // defistationApplicationList 에서 Official Project Name 이 defiName와 일치하는 것 찾기

        // 예외처리
        if (defiName == "pancake") {
            defiName = "PancakeSwap";
        }
        
        let logoUrl = "";
        for (var i = 0; i < defistationApplicationList.length; i++) {
            if (defistationApplicationList[i]["Official Project Name"] == defiName) {
                logoUrl = defistationApplicationList[i]["Project Logo URL (68px*68px png ONLY. Given link should directly DISPLAY Logo image without any BACKGROUND. Google drive link is NOT accepted.)"];
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
            case "Alpha Homora":
                resultImg = alphahomora;
                break;    
            case "Cobalt.finance":
                resultImg = cobaltfinance;
                break;
            case "SwampFinance":
                resultImg = swampfinance;
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
                let rankInfoArr = [];
                // Trending 에는 price, marketcap, hoders, TVL 데이터가 들어간다.(2개씩)
                // ["priceDefiName", "priceStr", price change, "marketCapDefiName", "marketcapStr", marketcap change, "holdersDefiName", "holdersStr", holders change, "tvlDefiName", "tvlStr", tvl change]
                // let trendingInfoArr = ["", "", 0, "", "", 0, "", "", 0, "", "", 0];
                let trendingInfoArr = ["", null, null, "", null, null, "", null, null, "", null, null];

                for (var i = 0; i < res.length; i++) {
                    let chainName;
                    let tokenName;
                    // let rankNum = i + 1;
                    
                    let rankNum = rankingCount;
                    let defiName = res[i].name;
                    let coinImg = selectCoinImg(res[i].name);

                    // beefy.finance 같은 경우 기호, 공백 제거(url 용도)
                    defiName = replaceAll(defiName, ".", "");
                    defiName = replaceAll(defiName, " ", "");
                    defiName = defiName.toLowerCase();

                    // rank 메달 이미지
                    // if (i == 0) {
                    //     rankNum = <img src={rankIcon1} style={{ "width": "24px", marginTop: "4px" }} />;
                    // } else if (i == 1) {
                    //     rankNum = <img src={rankIcon2} style={{ "width": "24px", marginTop: "4px" }} />;
                    // } else if (i == 2) {
                    //     rankNum = <img src={rankIcon3} style={{ "width": "24px", marginTop: "4px" }} />;
                    // }

                    // if (res[i].chain == "bsc") {
                    //     chainName = "BSC";
                    // } else {
                    //     chainName = res[i].chain;
                    // }

                    // Token 이름
                    // tokenName
                    








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
                    // if (res[i].verified) {
                    //     verifiedTag = <img src={verifiedIcon} />
                    // } else {
                    //     verifiedTag = <img src={noVerifiedIcon} />
                    // }
                    // 0420 수정중
                    // <div data-tip="<a href='https://www.naver.com' target='_blank'>test</a>">{verifiedTag}</div>
                    // if (res[i].verified) {
                    //     let index = findDefiIndexNum(res[i].name);
                    //     let auditInfoStr = (defistationApplicationList[index]["Security Information"]);

                    //     console.log("auditInfoStr: ", auditInfoStr);

                    //     if (auditInfoStr.indexOf("YES") != -1) {

                    //     } else {
                    //         // auditInfoStr 파싱: 첫번째 : 을 기준으로 나누기
                    //         let auditLinkArr = auditInfoStr.split(":");
                    //         let auditProvider = auditLinkArr[0];
                    //         let auditLink = auditLinkArr[1] + ":" + auditLinkArr[2];
                    //         let tempTag = `<span className='auditVerified'>⦁</span><span> Audited</span><br />` + auditProvider + `: <a className='auditLink' href='` + auditLink + `' target='_blank'>` + auditLink + `</a>`;
                    //         verifiedTag = <div className="customTooltip" data-tip={tempTag}><span className='auditVerified'>⦁</span></div>;
                    //     }

                        
                    // } else {
                    //     verifiedTag = <span className='noAudit'>⦁</span>;
                    // }
                    if (res[i].verified) {
                        let index = findDefiIndexNum(res[i].name);
                        let auditInfoStr = (defistationApplicationList[index]["Security Information"]);

                        if (auditInfoStr.indexOf("YES") != -1) {
                            verifiedTag = 
                            <>
                                {/* <span className="auditVerified" data-tip data-for={'global' + i} style={{"margin-left":"14px"}}> ⦁ </span> */}
                                <div className="auditVerified" data-tip data-for={'global' + i} style={{"margin-left":"14px"}}> </div>
                                <ReactTooltip 
                                id={'global' + i} 
                                aria-haspopup='true'
                                place="right"
                                delayHide={200}
                                effect="solid"
                                >
                                <div>
                                    <div className='auditVerified' style={{"float":"left", "margin-right": "5px"}}></div> Audited
                                    <ul className="auditListUl">
                                        <li>Unknown source</li>
                                    </ul>
                                </div>
                                </ReactTooltip>
                            </>;
                        } else {
                            if (auditInfoStr == "") {
                                verifiedTag = 
                                <>
                                    <div className="auditVerified" data-tip data-for={'global' + i} style={{"margin-left":"14px"}}> </div>
                                    <ReactTooltip 
                                    id={'global' + i} 
                                    aria-haspopup='true'
                                    place="right"
                                    delayHide={200}
                                    effect="solid"
                                    >
                                    <div>
                                        <div className='auditVerified' style={{"float":"left", "margin-right": "5px"}}></div> Audited
                                        <ul className="auditListUl">
                                            <li>Unknown source</li>
                                        </ul>
                                    </div>
                                    </ReactTooltip>
                                </>;
                            } else {
                                let resultAuditTag = [];

                                // auditInfoStr 파싱 
                                // 1) ; 기준으로 쪼개기
                                let auditLinkArr1 = auditInfoStr.split(";");
                                for (var k = 0; k < auditLinkArr1.length; k++) {
                                    // 2) : 기준으로 쪼개기
                                    let auditLinkArr2 = (auditLinkArr1[k]).split(":");

                                    let auditName = auditLinkArr2[0];
                                    let auditLink = auditLinkArr2[1] + ":" + auditLinkArr2[2];

                                    resultAuditTag.push(<li>{auditName}: <a className="auditLink" href={auditLink} target='_blank'>{auditLink}</a></li>);
                                }

                                verifiedTag = 
                                <>
                                    <div className="auditVerified" data-tip data-for={'global' + i} style={{"margin-left":"14px"}}> </div>
                                    <ReactTooltip 
                                    id={'global' + i} 
                                    aria-haspopup='true'
                                    place="right"
                                    delayHide={200}
                                    effect="solid"
                                    >
                                    <div>
                                        <div className='auditVerified' style={{"float":"left", "margin-right": "5px"}}></div> Audited
                                        <ul className="auditListUl">
                                            {resultAuditTag}
                                        </ul>
                                    </div>
                                    </ReactTooltip>
                                </>;
                            }
                        }
                    } else {
                        verifiedTag = <div className='noAudit' style={{"margin-left":"14px"}}> </div>;
                    }


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
                    // // tvl이 M 이하 단위인 경우 소숫점 1자리만, B 단위 이상은 소숫점 2자리로 표현
                    // if (digit <= 1000000) {
                    //     currencyNum = (res[i].lockedUsd / digit).toFixed(1) * 1;
                    // } else {
                    //     currencyNum = (res[i].lockedUsd / digit).toFixed(2) * 1;
                    // }
                    // 소숫점 2자리로 표현
                    currencyNum = (res[i].lockedUsd / digit).toFixed(2);

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

                    // token symbol name
                    // let tokenSymbolName = "CAKE";
                    // let tokenPrice = "$ 99.99";
                    // let tokenMarketCap = "$ 9.99B";
                    // let tokenHolders = "999,999";
                    let tokenSymbolName = res[i].token;
                    if (tokenSymbolName == "" || tokenSymbolName == null) {
                        tokenSymbolName = "-";
                    }

                    let tokenPrice;
                    let tokenMarketCap;
                    let digitForMarketCap;
                    let currencyUnitForMarketCap;
                    let tokenMarketCapNum;
                    let tokenMarketCapTag;
                    if (res[i].price == 0 || res[i].price == null) {
                        tokenPrice = "-";
                        tokenMarketCapTag = "-";
                    } else {
                        tokenPrice = "$ " + numberWithCommas(res[i].price, false);
                        tokenMarketCap = res[i].marketCap;
                        // K M B 단위로 표시
                        digitForMarketCap = getCurrencyDigit(tokenMarketCap);
                        currencyUnitForMarketCap = getCurrencyUnit(tokenMarketCap);
                        tokenMarketCapNum = (tokenMarketCap / digitForMarketCap).toFixed(2);
                        tokenMarketCapTag = "$ " + tokenMarketCapNum + currencyUnitForMarketCap;
                    }

                    let tokenHolders = res[i].holders;
                    let tokenHoldersTag;
                    if (tokenHolders == 0 || tokenHolders == null) {
                        tokenHoldersTag = "-";
                    } else {
                        tokenHoldersTag = numberWithCommas(tokenHolders, false);
                    }

                    // 변화율
                    let tokenPriceChange24h = res[i].priceChange24h;
                    let tokenPriceChange24hTag;
                    if (tokenPriceChange24h > 0) {
                        // +
                        tokenPriceChange24hTag = <span className="defiListTableSubText textGreen">+{(tokenPriceChange24h * 100).toFixed(2)}%</span>;
                    } else if (tokenPriceChange24h == 0) {
                        tokenPriceChange24hTag = <span className="defiListTableSubText">{(tokenPriceChange24h * 100).toFixed(2)}%</span>;
                    } else if (tokenPriceChange24h < 0) {
                        tokenPriceChange24hTag = <span className="defiListTableSubText textRed">{(tokenPriceChange24h * 100).toFixed(2)}%</span>;
                    }

                    let tokenMarketCapChange24h = res[i].marketCapChange24h;
                    // console.log("[0423] tokenMarketCapChange24h: ", tokenMarketCapChange24h);
                    let tokenMarketCapChange24hTag;
                    if (tokenMarketCapChange24h > 0) {
                        // +
                        tokenMarketCapChange24hTag = <span className="defiListTableSubText textGreen">+{(tokenMarketCapChange24h * 100).toFixed(2)}%</span>;
                    } else if (tokenMarketCapChange24h == 0) {
                        tokenMarketCapChange24hTag = <span className="defiListTableSubText">{(tokenMarketCapChange24h * 100).toFixed(2)}%</span>;
                    } else if (tokenMarketCapChange24h < 0) {
                        tokenMarketCapChange24hTag = <span className="defiListTableSubText textRed">{(tokenMarketCapChange24h * 100).toFixed(2)}%</span>;
                    }

                    let tokenHoldersChange24hNum = res[i].holdersChange24hNum;
                    // let tokenHoldersChange24hNum = 99999;
                    let tokenHoldersChange24hNumTag;
                    if (tokenHoldersChange24hNum > 0) {
                        // +
                        tokenHoldersChange24hNumTag = <span className="defiListTableSubText textGreen">+{numberWithCommas(tokenHoldersChange24hNum, false)}</span>;
                    } else if (tokenHoldersChange24hNum == 0) {
                        tokenHoldersChange24hNumTag = <span className="defiListTableSubText">{numberWithCommas(tokenHoldersChange24hNum, false)}</span>;
                    } else if (tokenHoldersChange24hNum < 0) {
                        tokenHoldersChange24hNumTag = <span className="defiListTableSubText textRed">{numberWithCommas(tokenHoldersChange24hNum, false)}</span>;
                    }

                    // holders 변화량은 holder 가 0이거나 null 이면 표기하지 않는다
                    if (tokenHolders == 0 || tokenHolders == null) {
                        tokenHoldersChange24hNumTag = "";
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

                        // if (getOfficialDefiName(res[i].name) == "BakerySwap") {
                        //     // AD: 가장 앞에
                        //     tableCodeArr.unshift(
                        //         <tr className="defiListTableTr" onClick={() => movePage("/" + defiName)}>
                        //             <td>Ad</td>
                        //             <td><img class="tokenImg" src={coinImg} onError={(e)=>{e.target.onerror = null; e.target.src=defaultIcon}} /></td>
                        //             {/* <td>{coinImg}</td> */}
                        //             <td>
                        //                 {getOfficialDefiName(res[i].name)}<br />
                        //                 <span className="defiListTableCategory">{tempCategory}</span>
                        //             </td>
                        //             <td>{verifiedTag}</td>
                        //             <td>{tokenSymbolName}</td>
                        //             {/* <td>{getOfficialCategoryName(res[i].category)}</td> */}
                        //             <td>{tokenPrice}</td>
                        //             <td>{tokenMarketCap}</td>
                        //             <td>{tokenHolders}</td>
                        //             {/* <td>{res[i].contractNum}</td> */}
                        //             <td>{res[i].volume > 0 ? volumeStr : <div><p data-tip="24hr trading volume hasn't been posted by project team."> {volumeStr} </p><ReactTooltip /></div>}</td>
                        //             {/* <td>$ {numberWithCommas(res[i].lockedUsd)}</td> */}
                        //             <td>$ {currencyNum + currencyUnit}</td>
                        //             {/* <td>{change24hTag}</td> */}
                        //             {/* <td>{tempDate}</td> */}
                        //         </tr>
                        //     );
                        // }

                        tableCodeArr.push(
                            <tr key={i} className="defiListTableTr">
                                <td>{rankNum}</td>
                                <td><div className="tokeImgCircleMask"><img class="tokenImg" key={i} src={coinImg} onError={(e)=>{e.target.onerror = null; e.target.src=defaultIcon}} /></div></td>
                                {/* <td>{coinImg}</td> */}
                                <td className="defiNameClickArea" onClick={() => movePage("/" + defiName)}>
                                    <span className="projectName">{getOfficialDefiName(res[i].name)}</span><br />
                                    <span className="defiListTableCategory">{tempCategory}</span>
                                </td>
                                <td>
                                    {/* <li><span data-tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ">{verifiedTag}</span><ReactTooltip html={true} /></li> */}
                                    <li>
                                        {/* <div data-tip="<a href='https://www.naver.com' target='_blank'>test</a>">{verifiedTag}</div>
                                        <ReactTooltip 
                                        place="right"
                                        html={true} 
                                        className="react-tooltip-clickable-link" /> */}
                                        {/* {verifiedTag} */}
                                        {/* <ReactTooltip 
                                        place="right"
                                        html={true} 
                                        type={'dark'}
                                        className="react-tooltip-clickable-link" /> */}
                                        {/* <a data-tip data-for='global'> (〃∀〃) </a>
                                        <ReactTooltip id='global' aria-haspopup='true' >
                                        <p>This is a global react component tooltip</p>
                                        <p>You can put every thing here</p>
                                        <ul>
                                        <li>Word</li>
                                        <li>Chart</li>
                                        <li>Else</li>
                                        </ul>
                                        </ReactTooltip> */}
                                        {verifiedTag}
                                    </li>
                                </td>
                                <td>{tokenSymbolName}</td>
                                {/* <td>{getOfficialCategoryName(res[i].category)}</td> */}
                                <td>
                                    {tokenPrice}<br />
                                    {tokenPriceChange24hTag}
                                </td>
                                <td>
                                    {tokenMarketCapTag}<br />
                                    {tokenMarketCapChange24hTag}
                                </td>
                                <td>
                                    {tokenHoldersTag}<br />
                                    {tokenHoldersChange24hNumTag}
                                </td>
                                {/* <td>{res[i].contractNum}</td> */}
                                <td>
                                    {res[i].volume > 0 ? volumeStr : <div><p data-tip="24hr trading volume hasn't been posted by project team."> {volumeStr}</p><ReactTooltip /></div>}
                                </td>
                                {/* <td>$ {numberWithCommas(res[i].lockedUsd)}</td> */}
                                <td>
                                    $ {currencyNum + currencyUnit}<br />
                                    <span className="defiListTableSubText">{change24hTag}</span>
                                </td>
                                {/* <td>{change24hTag}</td> */}
                                {/* <td>{tempDate}</td> */}
                            </tr>
                        );

                        // 랭킹 1,2,3위 보관
                        let tempDefiName = res[i].name;
                        if (tempDefiName == "pancake") {
                            tempDefiName = "PancakeSwap"
                        }
                        rankInfoArr.push(tempDefiName, currencyNum + currencyUnit, change24hValue);

                        // ----------------------------------- Trending -----------------------------------
                        // ["priceDefiName", "priceStr", price change, "marketCapDefiName", "marketcapStr", marketcap change, "holdersDefiName", "holdersStr", holders change, "tvlDefiName", "tvlStr", tvl change]
                        // top price change 찾기

                        // if (i == 0) {
                        //     console.log("[0423-0] trendingInfoArr[2]: ", trendingInfoArr[2]);

                        //     if (trendingInfoArr[2] == null) {
                        //         console.log("[0423] trendingInfoArr[2]: ", trendingInfoArr[2]);
                        //         trendingInfoArr[2] = tokenPriceChange24h.toFixed(4) * 1;
                        //         console.log("[0423] success@");
                        //     }
                        // } else {
                        //     console.log("[0423-1] trendingInfoArr[2]: ", trendingInfoArr[2]);

                        // }

                        if (tokenPriceChange24h > trendingInfoArr[2]) {
                            trendingInfoArr[2] = tokenPriceChange24h.toFixed(4) * 1;
                            // tag 보관
                            // trendingInfoArr[1] = tokenPrice;
                            trendingInfoArr[1] = res[i].price;
                            trendingInfoArr[0] = tokenSymbolName;
                        }

                        // top marketcap change 찾기
                        if (tokenMarketCapChange24h > trendingInfoArr[5]) {
                            trendingInfoArr[5] = tokenMarketCapChange24h.toFixed(4) * 1;
                            // tag 보관
                            // trendingInfoArr[4] = tokenMarketCapTag;
                            trendingInfoArr[4] = (res[i].marketCap).toFixed(0) * 1;
                            trendingInfoArr[3] = tempDefiName;
                        }

                        // top holders change 찾기
                        if (tokenHoldersChange24hNum > trendingInfoArr[8]) {
                            trendingInfoArr[8] = tokenHoldersChange24hNum;
                            // tag 보관
                            // trendingInfoArr[7] = tokenHoldersTag;
                            trendingInfoArr[7] = res[i].holders;
                            trendingInfoArr[6] = tempDefiName;
                        }

                        // top TVL change 찾기
                        if (change24hValue > trendingInfoArr[11]) {
                            trendingInfoArr[11] = change24hValue.toFixed(4) * 1;
                            // tag 보관
                            // trendingInfoArr[10] = "$" + currencyNum + currencyUnit;
                            trendingInfoArr[10] = res[i].lockedUsd;
                            trendingInfoArr[9] = tempDefiName;
                        }
                    }
                }

                // console.count("DefiList Call");

                // 1, 2, 3위는 Trending 목록에 보관
                // defiName0, tvl0, change0
                // global.changeTrending([
                //     res[0].name, res[0].lockedUsd, res[0].tvlPercentChange24h, 
                //     res[1].name, res[1].lockedUsd, res[1].tvlPercentChange24h, 
                //     res[2].name, res[2].lockedUsd, res[2].tvlPercentChange24h
                // ]);
                // global.changeTrending(rankInfoArr);

                // 0422 수정
                global.changeTrending(trendingInfoArr);

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
                        <th>#</th>
                        <th></th>
                        <th>Projects</th>
                        <th>
                            <ul className="defiListTableHeadCell">
                                <li>Audit</li>
                                <li><span data-tip="As one of the security indicators, audit helps you to avoid scam project."><img src={questionIcon} /><ul></ul></span><ReactTooltip /></li>
                            </ul>
                        </th>
                        <th>Token</th>
                        <th>Price</th>
                        {/* <th>Contract(#)</th> */}
                        <th>
                            <ul className="defiListTableHeadCellRight">
                                <li>Mkt Cap</li>
                                {/* <li><span data-tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "><img src={questionIcon} /></span><ReactTooltip /></li> */}
                            </ul>
                        </th>
                        <th>
                            <ul className="defiListTableHeadCellRight">
                                <li>Holders</li>
                                <li><span data-tip="The number of wallets with a balance exceeding zero"><img src={questionIcon} /></span><ReactTooltip /></li>
                            </ul>
                        </th>
                        <th>TVL</th>
                        <th>
                            <ul className="defiListTableHeadCellRight">
                                <li>TVL</li>
                                <li><span data-tip="Total value locked"><img src={questionIcon} /></span><ReactTooltip /></li>
                            </ul>
                        </th>
                        {/* <th>
                            <ul className="defiListTableHeadCellRight">
                                <li>Change 24h</li>
                                <li className="change24h"><img src={questionIcon} onClick={() => movePage("/about")} /></li>
                            </ul>
                        </th> */}
                        {/* <th>Last updated(UTC)</th> */}
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