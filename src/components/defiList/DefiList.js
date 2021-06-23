import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import useStores from '../../useStores';
// import _ from "lodash";

import '../../App.css';

import defistationApplicationList from "../../defistationApplicationList.json";

import { numberWithCommas, capitalize, replaceAll, getOfficialDefiName, getOfficialCategoryName, getCurrencyDigit, getCurrencyUnit, convertDateFormat2, generateRandom, convertToBMK } from '../../util/Util';

// table icon
import rankIcon1 from "../../assets/images/rank1@2x.png";
import rankIcon2 from "../../assets/images/rank2@2x.png";
import rankIcon3 from "../../assets/images/rank3@2x.png";

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
import nominex from "../../assets/images/defiLogo/Nominex@2x.png";
import waultfinance from "../../assets/images/defiLogo/waultfinance@2x.png";

import wepiggy from "../../assets/images/defiLogo/wepiggy@2x.png";

// audit logo for button
import anchain from "../../assets/images/auditLogo/anchain.png";
import certik from "../../assets/images/auditLogo/certik.png";
import peckshield from "../../assets/images/auditLogo/peckshield.png";
import slowmist from "../../assets/images/auditLogo/slowmist.png";
import techrate from "../../assets/images/auditLogo/techrate.png";
import sooho from "../../assets/images/auditLogo/sooho.png";

const DefiList = observer((props) => {
    const { global } = useStores();
    const history = useHistory();
    const [responseError, setResponseError] = useState();
    const [defiListTableCode, setDefiListTableCode] = useState();

    const [mobileFlag, setMobileFlag] = useState(false);

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

    function findLogoUrl(defiName) {
        // defistationApplicationList 에서 Official Project Name 이 defiName와 일치하는 것 찾기

        // 예외처리
        if (defiName == "pancake") {
            defiName = "PancakeSwap";
        } else if (defiName == "Stakecow") {
            defiName = "Milk Protocol";
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
        } else if (defiName == "Stakecow") {
            defiName = "Milk Protocol";
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
            case "Nominex":
                resultImg = nominex;
                break;
            case "Wault.Finance":
                resultImg = waultfinance;
                break;
            case "WePiggy":
                resultImg = wepiggy;
                break;
            default:
                resultImg = findLogoUrl(defiName);
                break;    
        }

        return resultImg;
    }

    // 메인페이지의 테이블 셀 스위칭: Token Price <-> MarketCap, TVL <-> holders
    let isSwitched = false;
    function switchDefiListTable() {
        // 모바일 또는 1034 px 이하인 경우
        let isMobile = false;
        let advanceSwitchFlag = false;

        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
            isMobile = true;
        }

        if (isMobile) {
            if (screen.width <= 1034) {
                advanceSwitchFlag = true;
            }
        } else {
            if (window.innerWidth <= 1034) {
                advanceSwitchFlag = true;
            }
        }
        
        // 모바일 뷰, 스크린 조건일 때 스위치 기능 실행
        if (advanceSwitchFlag) {
            if (screen.width <= 320 || window.innerWidth <= 320) {
                // Projects, Audit, TVL 만 표시
                if (!isSwitched) {
                    document.querySelectorAll('.switchable6').forEach(function(el) {
                        el.style.display = 'none';
                    });
                    document.querySelectorAll('.switchable7').forEach(function(el) {
                        el.style.display = 'table-cell';
                    });
            
                    document.querySelectorAll('.switchable10').forEach(function(el) {
                        el.style.display = 'none';
                    });

                    isSwitched = true;
                } else {
                    document.querySelectorAll('.switchable6').forEach(function(el) {
                        el.style.display = 'none';
                    });
                    document.querySelectorAll('.switchable7').forEach(function(el) {
                        el.style.display = 'none';
                    });
            
                    document.querySelectorAll('.switchable10').forEach(function(el) {
                        el.style.display = 'table-cell';
                    });

                    isSwitched = false;
                }
            } else {

                if (!isSwitched) {
                    document.querySelectorAll('.switchable6').forEach(function(el) {
                        el.style.display = 'none';
                    });
                    document.querySelectorAll('.switchable7').forEach(function(el) {
                        el.style.display = 'table-cell';
                    });
            
                    document.querySelectorAll('.switchable8').forEach(function(el) {
                        el.style.display = 'table-cell';
                    });
                    document.querySelectorAll('.switchable10').forEach(function(el) {
                        el.style.display = 'none';
                    });

                    isSwitched = true;
                } else {
                    document.querySelectorAll('.switchable6').forEach(function(el) {
                        el.style.display = 'table-cell';
                    });
                    document.querySelectorAll('.switchable7').forEach(function(el) {
                        el.style.display = 'none';
                    });
            
                    document.querySelectorAll('.switchable8').forEach(function(el) {
                        el.style.display = 'none';
                    });
                    document.querySelectorAll('.switchable10').forEach(function(el) {
                        el.style.display = 'table-cell';
                    });

                    isSwitched = false;
                }
            }
        }
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

                let isMobile = false;
                let auditPlace = "right";

                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
                    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
                    isMobile = true;
                }

                if (isMobile) {
                    if (screen.width <= 320) {
                        auditPlace = "bottom";
                    }
                } else {
                    if (window.innerWidth <= 320) {
                        auditPlace = "bottom";
                    }
                }

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
                            change24hTag = <span className="textGray">{(change24hValue * 100).toFixed(2)}%</span>;
                        } else if (change24hValue < 0) {
                            change24hTag = <span className="textRed">{(change24hValue * 100).toFixed(2)}%</span>;
                        }
                    }

                    let verifiedTag;
                    if (res[i].verified) {
                        let index = findDefiIndexNum(res[i].name);
                        let auditInfoStr = (defistationApplicationList[index]["Security Information"]);

                        if (auditInfoStr.indexOf("YES") != -1) {
                            verifiedTag = 
                            <>
                                {/* <span className="auditVerified" data-tip data-for={'global' + i} style={{"margin-left":"14px"}}> ⦁ </span> */}
                                {/* <div className="auditVerified" data-tip data-for={'global' + i} style={{"margin-left":"14px"}}> </div> */}
                                <div className="auditClickArea" data-tip data-for={'global' + i}>Audited</div>
                                <div className="auditVerified" style={{"margin-left":"14px"}}></div>
                                <ReactTooltip 
                                id={'global' + i} 
                                aria-haspopup='true'
                                place={auditPlace}
                                delayHide={200}
                                effect="solid"
                                >
                                <div>
                                    <ul className="auditUl">
                                        <li><div className='auditVerified' style={{"float":"left", "margin-right": "5px"}}></div></li>
                                        <li>Audited</li>
                                    </ul>
                                    <ul className="auditListUnknownUl">
                                        <li>
                                            {/* Unknown source */}
                                            <div className="auditButtonText">Unknown source</div>
                                        </li>
                                    </ul>
                                </div>
                                </ReactTooltip>
                            </>;
                        } else {
                            if (auditInfoStr == "") {
                                verifiedTag = 
                                <>
                                    <div className="auditClickArea" data-tip data-for={'global' + i}>Audited</div>
                                    <div className="auditVerified" style={{"margin-left":"14px"}}></div>
                                    <ReactTooltip 
                                    id={'global' + i} 
                                    aria-haspopup='true'
                                    place={auditPlace}
                                    delayHide={200}
                                    effect="solid"
                                    >
                                    <div>
                                        <ul className="auditUl">
                                            <li><div className='auditVerified' style={{"float":"left", "margin-right": "5px"}}></div></li>
                                            <li>Audited</li>
                                        </ul>
                                        <ul className="auditListUnknownUl">
                                            <li>
                                                {/* Unknown source */}
                                                <div className="auditButtonText">Unknown source</div>
                                            </li>
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

                                    // 예전) url 함께 표현하던 방식
                                    // resultAuditTag.push(<li>{auditName}: <a className="auditLink" href={auditLink} target='_blank'>{auditLink}</a></li>);
                                
                                    // 2021-05-26 변경) audit logo 표현 방식
                                    let auditButton;
                                    if ((auditName.toLowerCase()).indexOf("anchain") != -1) {
                                        auditButton = <img className="auditButtonImg" src={anchain} />;
                                    } else if ((auditName.toLowerCase()).indexOf("certik") != -1) {
                                        auditButton = <img className="auditButtonImg" src={certik} />; 
                                    } else if ((auditName.toLowerCase()).indexOf("peck") != -1) {
                                        auditButton = <img className="auditButtonImg" src={peckshield} />;
                                    } else if ((auditName.toLowerCase()).indexOf("mist") != -1) {
                                        auditButton = <img className="auditButtonImg" src={slowmist} />;
                                    } else if ((auditName.toLowerCase()).indexOf("techrate") != -1) {
                                        auditButton = <img className="auditButtonImg" src={techrate} />;
                                    } else if ((auditName.toLowerCase()).indexOf("sooho") != -1) {
                                        auditButton = <img className="auditButtonImg" src={sooho} />;
                                    } else {
                                        auditButton = <div className="auditButtonText">{auditName}</div>;
                                    }

                                    resultAuditTag.push(<li><a className="auditLink" href={auditLink} target='_blank'>{auditButton}</a></li>);
                                }

                                verifiedTag = 
                                <>
                                    <div className="auditClickArea" data-tip data-for={'global' + i}>Audited</div>
                                    <div className="auditVerified" style={{"margin-left":"14px"}}></div>
                                    <ReactTooltip 
                                    id={'global' + i} 
                                    aria-haspopup='true'
                                    place={auditPlace}
                                    delayHide={200}
                                    effect="solid"
                                    >
                                    <div>
                                        <ul className="auditUl">
                                            <li><div className='auditVerified' style={{"float":"left", "margin-right": "5px"}}></div></li>
                                            <li>Audited</li>
                                        </ul>
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
                    if (res[i].price < 0.0001 || res[i].price == null) {
                        tokenPrice = "-";
                        tokenMarketCapTag = "-";
                    } else {
                        tokenPrice = "$ " + numberWithCommas(res[i].price, false, true);
                        tokenMarketCap = res[i].marketCap;
                        // K M B 단위로 표시
                        digitForMarketCap = getCurrencyDigit(tokenMarketCap);
                        currencyUnitForMarketCap = getCurrencyUnit(tokenMarketCap);
                        tokenMarketCapNum = (tokenMarketCap / digitForMarketCap).toFixed(2);
                        tokenMarketCapTag = "$ " + tokenMarketCapNum + currencyUnitForMarketCap;
                        if (tokenMarketCapTag == "$ 0.00") {
                            tokenMarketCapTag = "-";
                        }
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
                    if (res[i].price < 0.0001 || res[i].price == null) {
                        tokenPriceChange24h = "-";
                    } else {
                        if (tokenPriceChange24h > 0) {
                            // +
                            tokenPriceChange24hTag = <span className="defiListTableSubText textGreen">+{(tokenPriceChange24h * 100).toFixed(2)}%</span>;
                        } else if (tokenPriceChange24h == 0) {
                            tokenPriceChange24hTag = <span className="defiListTableSubText textGray">{(tokenPriceChange24h * 100).toFixed(2)}%</span>;
                        } else if (tokenPriceChange24h < 0) {
                            tokenPriceChange24hTag = <span className="defiListTableSubText textRed">{(tokenPriceChange24h * 100).toFixed(2)}%</span>;
                        }
                    }

                    let tokenMarketCapChange24h = res[i].marketCapChange24h;
                    // console.log("[0423] tokenMarketCapChange24h: ", tokenMarketCapChange24h);
                    let tokenMarketCapChange24hTag;
                    if (tokenMarketCapChange24h > 0) {
                        // +
                        tokenMarketCapChange24hTag = <span className="defiListTableSubText textGreen">+{(tokenMarketCapChange24h * 100).toFixed(2)}%</span>;
                    } else if (tokenMarketCapChange24h == 0) {
                        tokenMarketCapChange24hTag = <span className="defiListTableSubText textGray">{(tokenMarketCapChange24h * 100).toFixed(2)}%</span>;
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
                        tokenHoldersChange24hNumTag = <span className="defiListTableSubText textGray">{numberWithCommas(tokenHoldersChange24hNum, false)}</span>;
                    } else if (tokenHoldersChange24hNum < 0) {
                        tokenHoldersChange24hNumTag = <span className="defiListTableSubText textRed">{numberWithCommas(tokenHoldersChange24hNum, false)}</span>;
                    }

                    // holders 변화량은 holder 가 0이거나 null 이면 표기하지 않는다
                    if (tokenHolders == 0 || tokenHolders == null) {
                        tokenHoldersChange24hNumTag = "";
                    }

                    // Sponsored
                    // if (res[i].name == "ARIES FINANCIAL") {
                    //     tokenHoldersTag = "-";
                    //     tokenHoldersChange24hNumTag = null;
                    // }

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
                                <td>
                                    <div className="mobileRankNum">{rankNum}</div>
                                    <div className="tokenImgCircleMask">
                                    <img class="tokenImg" key={i} src={coinImg} onError={(e)=>{e.target.onerror = null; e.target.src=defaultIcon}} /></div>
                                </td>
                                {/* <td>{coinImg}</td> */}
                                <td className="defiNameClickArea" onClick={() => movePage("/" + defiName)} sorttable_customkey={getOfficialDefiName(res[i].name)}>
                                    <span className="projectName noWrap">{getOfficialDefiName(res[i].name)}</span><br />
                                    {/* <div className="mobileRankNum">{rankNum}</div> */}
                                    <span className="defiListTableCategory noWrap">{tempCategory}</span>
                                </td>
                                <td>
                                    {/* <li><span data-tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ">{verifiedTag}</span><ReactTooltip html={true} /></li> */}
                                    <li>
                                        {verifiedTag}
                                    </li>
                                </td>
                                <td>{tokenSymbolName}</td>
                                {/* <td>{getOfficialCategoryName(res[i].category)}</td> */}
                                <td className="switchable6" onClick={() => switchDefiListTable()}>
                                    <span className="noWrap">{tokenPrice}</span><br />
                                    {tokenPriceChange24hTag}
                                </td>
                                <td className="switchable7" onClick={() => switchDefiListTable()} sorttable_customkey={tokenMarketCap}>
                                    {tokenMarketCapTag}<br />
                                    {tokenMarketCapChange24hTag}
                                </td>
                                <td className="switchable8" onClick={() => switchDefiListTable()} sorttable_customkey={tokenHolders}>
                                    {tokenHoldersTag}<br />
                                    {tokenHoldersChange24hNumTag}
                                </td>
                                {/* <td>{res[i].contractNum}</td> */}
                                <td>
                                    {res[i].volume > 0 ? volumeStr : <div><p data-tip="24hr trading volume hasn't been posted by project team."> {volumeStr}</p><ReactTooltip /></div>}
                                </td>
                                {/* <td>$ {numberWithCommas(res[i].lockedUsd)}</td> */}
                                <td className="switchable10" onClick={() => switchDefiListTable()} sorttable_customkey={res[i].lockedUsd}>
                                    <span className="noWrap">$ {currencyNum + currencyUnit}</span><br />
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

                // Sorting
                var newTableObject = document.getElementById("defiListTable1");
                sorttable.makeSortable(newTableObject);
            })
            .catch(err => setResponseError(err));
    }

    function movePage(path) {
        history.push(path);
    }

    useEffect(() => {
        getDefiList();

        let isMobile = false;
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
            isMobile = true;
        }

        if (isMobile) {
            setMobileFlag(true);
        } else {
            if (screen.width <= 1034 || window.innerWidth <= 1034) {
                setMobileFlag(true);
            }
        }

        return () => {

        };
    }, [global.chartDataDetails, mobileFlag])

    return (
        <div className="defiList tableContainer">
            <table className="defiListTable">
                <thead className="defiListTableHead">
                    <tr>
                        <th className="sorttable_nosort">#</th>
                        <th className="sorttable_nosort"></th>
                        <th className="noDrag">Projects</th>
                        <th className="noDrag">
                            {/* Audit */}
                            
                            {/* <span data-tip="As one of the security indicators, audit helps you to avoid scam project.">Audit</span>
                            <ReactTooltip 
                            id='header1'
                            place="bottom"
                            delayHide={100}
                            effect="solid"
                            ></ReactTooltip> */}

                            {/* PC */}
                            <a 
                            data-tip 
                            data-for="tableHeader4" 
                            style={!mobileFlag ? undefined : {display: "none"}}
                            >
                            Audit
                            </a>
                            <ReactTooltip
                            id="tableHeader4"
                            className='tableHeaderTooptip'
                            place="bottom" 
                            type="light" 
                            effect="solid"
                            style={!mobileFlag ? undefined : {display: "none"}}
                            >
                            <span>As one of the security indicators, audit helps you to avoid scam project.</span>
                            </ReactTooltip>

                            {/* Mobile (Tooltip 없음) */}
                            <span style={mobileFlag ? undefined : {display: "none"}}>Audit</span>
   
                            {/* <div className="auditClickArea" data-tip data-for={'global' + i}>Audited</div>
                            <div className="auditVerified" style={{"margin-left":"14px"}}></div>
                            <ReactTooltip 
                            id={'global' + i} 
                            aria-haspopup='true'
                            place={auditPlace}
                            delayHide={200}
                            effect="solid"
                            >
                            <div>
                                <ul className="auditUl">
                                    <li><div className='auditVerified' style={{"float":"left", "margin-right": "5px"}}></div></li>
                                    <li>Audited</li>
                                </ul>
                                <ul className="auditListUl">
                                    {resultAuditTag}
                                </ul>
                            </div>
                            </ReactTooltip> */}

                            {/* <ul className="defiListTableHeadCell">
                                <li>Audit</li>
                                <li><span data-tip="As one of the security indicators, audit helps you to avoid scam project."><img src={questionIcon} /><ul></ul></span><ReactTooltip /></li>
                            </ul> */}
                        </th>
                        <th className="sorttable_nosort">Token</th>
                        <th className="switchable6 sorttable_numeric noDrag">Price</th>
                        <th className="switchable7 sorttable_numeric noDrag">
                            Mkt Cap
                            {/* <ul className="defiListTableHeadCellRight">
                                <li>Mkt Cap</li>
                            </ul> */}
                        </th>
                        <th className="switchable8 sorttable_numeric noDrag">
                            {/* <span data-tip="The number of wallets with a balance exceeding zero">Holders</span><ReactTooltip /> */}

                            {/* <ul className="defiListTableHeadCellRight">
                                <li>Holders</li>
                                <li><span data-tip="The number of wallets with a balance exceeding zero"><img src={questionIcon} /></span><ReactTooltip /></li>
                            </ul> */}

                            {/* PC */}
                            <a 
                            data-tip 
                            data-for="tableHeader8"
                            style={!mobileFlag ? undefined : {display: "none"}}
                            >
                            Holders
                            </a>
                            <ReactTooltip
                            id="tableHeader8"
                            className='tableHeaderTooptip'
                            place="bottom" 
                            type="light" 
                            effect="solid"
                            style={!mobileFlag ? undefined : {display: "none"}}
                            >
                            <span>The number of wallets with a balance exceeding zero</span>
                            </ReactTooltip>

                            {/* Mobile (Tooltip 없음) */}
                            <span style={mobileFlag ? undefined : {display: "none"}}>Holders</span>
                        </th>
                        <th className="sorttable_numeric noDrag">TVL</th>
                        <th className="switchable10 sorttable_numeric noDrag">

                            {/* <span data-tip="Total value locked">TVL</span><ReactTooltip /> */}

                            {/* <ul className="defiListTableHeadCellRight">
                                <li>TVL</li>
                                <li><span data-tip="Total value locked"><img src={questionIcon} /></span><ReactTooltip /></li>
                            </ul> */}

                            {/* PC */}
                            <a 
                            data-tip 
                            data-for="tableHeader9"
                            style={!mobileFlag ? undefined : {display: "none"}}
                            >
                            TVL
                            </a>
                            <ReactTooltip
                            id="tableHeader9"
                            className='tableHeaderTooptip'
                            place="bottom" 
                            type="light" 
                            effect="solid"
                            style={!mobileFlag ? undefined : {display: "none"}}
                            >
                            <span>Total value locked</span>
                            </ReactTooltip>

                            {/* Mobile (Tooltip 없음) */}
                            <span style={mobileFlag ? undefined : {display: "none"}}>TVL</span>
                        </th>
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