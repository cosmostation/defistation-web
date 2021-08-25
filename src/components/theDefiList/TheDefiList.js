import React, { Component, Suspense, useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import _ from "lodash";

import useStores from '../../useStores';

import { textEllipsis } from '../../util/Util';
import { getSponsors } from '../../sponsor/Sponsor';

import '../../App.css';

import TopBar from '../topBar/TopBar';
import Footer from '../footer/Footer';

import projectList from '../../projectList.json';   // old
import defistationApplicationList from "../../defistationApplicationList.json";

import yellowArrow from "../../assets/images/arrowic@2x.png";
// 프로젝트 아이콘
import defaultIcon from "../../assets/images/defiLogo/project-none@2x.png";
import alphafinance from "../../assets/images/defiLogo/alphafinance@2x.png";
import bakeryswap from "../../assets/images/defiLogo/bakeryswap@2x.png";
import beefyfinance from "../../assets/images/defiLogo/beefyfinance@2x.png";
import bscswap from "../../assets/images/defiLogo/bscswap@2x.png";
import burgerswap from "../../assets/images/defiLogo/burgerswap@2x.png";
import creamfinance from "../../assets/images/defiLogo/creamfinance@2x.png";
import fortube from "../../assets/images/defiLogo/fortube@2x.png";
import fryworld from "../../assets/images/defiLogo/fryworld@2x.png";
import pancake from "../../assets/images/defiLogo/pancakeswap@2x.png";
import peachswap from "../../assets/images/defiLogo/peachswap@2x.png";
import spartanprotocol from "../../assets/images/defiLogo/spartanprotocol@2x.png";
import stakecow from "../../assets/images/defiLogo/stakecow@2x.png";
import streamity from "../../assets/images/defiLogo/streamity@2x.png";
import stormswap from "../../assets/images/defiLogo/stormswap@2x.png";
import narwhalswap from "../../assets/images/defiLogo/narwhalswap@2x.png";
import bnexchange from "../../assets/images/defiLogo/bnexchange@2x.png";
import softdrinkswap from "../../assets/images/defiLogo/softdrinkswap@2x.png";
import nyanswap from "../../assets/images/defiLogo/nyanswap@2x.png";
import sevenupfinance from "../../assets/images/defiLogo/7upfinance@2x.png";
import bfisfinance from "../../assets/images/defiLogo/bfisfinance@2x.png";
import bstablefinance from "../../assets/images/defiLogo/bstablefinance@2x.png";
import dego from "../../assets/images/defiLogo/dego@2x.png";
import equatorfinance from "../../assets/images/defiLogo/equatorfinance@2x.png";
import stablexswap from "../../assets/images/defiLogo/stablexswap@2x.png";
import qian from "../../assets/images/defiLogo/qian@2x.png";
import pancakebunny from "../../assets/images/defiLogo/pancakebunny@2x.png";
import julswap from "../../assets/images/defiLogo/julswap@2x.png";
import justliquidity from "../../assets/images/defiLogo/justliquidity@2x.png";
import anyswap from "../../assets/images/defiLogo/anyswap@2x.png";
import cokefinance from "../../assets/images/defiLogo/cokefinance@2x.png";
import renvm from "../../assets/images/defiLogo/renvm@2x.png";
import unifiprotocol from "../../assets/images/defiLogo/unifiprotocol@2x.png";
import venus from "../../assets/images/defiLogo/venus@2x.png";
import thugs from "../../assets/images/defiLogo/thugs@2x.png";
import cberry from "../../assets/images/defiLogo/cberry@2x.png";
import jetfuel from "../../assets/images/defiLogo/jetfuel@2x.png";
import acryptos from "../../assets/images/defiLogo/acryptos@2x.png";
import autofarm from "../../assets/images/defiLogo/autofarm@2x.png";
import basddollar from "../../assets/images/defiLogo/basddollar@2x.png";
import bdollar from "../../assets/images/defiLogo/bdollar@2x.png";
import bscfarm from "../../assets/images/defiLogo/bscfarm@2x.png";
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
import rabbitfinance from "../../assets/images/defiLogo/rabbitfinance@2x.png";
import biswap from "../../assets/images/defiLogo/biswap@2x.png";
import insuraceprotocol from "../../assets/images/defiLogo/insuraceprotocol@2x.png";
import ten from "../../assets/images/defiLogo/ten@2x.png";
import mdex from "../../assets/images/defiLogo/mdex@2x.png";
import pumpy from "../../assets/images/defiLogo/pumpy@2x.png";
import bsclaunch from "../../assets/images/defiLogo/bsclaunch@2x.png";
import dforce from "../../assets/images/defiLogo/dforce@2x.png";
import kebab from "../../assets/images/defiLogo/kebab@2x.png";

const TheDefiList = observer(() => {
    const { global } = useStores();

    const location = useLocation();

    const history = useHistory();

    const [responseError, setResponseError] = useState();
    const [response, setResponse] = useState({});

    const [urlPathName, setUrlPathName] = useState();
    const [defiName, setDefiName] = useState("");
    
    const [defiListCode, setDefiListCode] = useState();
    const [defiListCodeForListing, setDefiListCodeForListing] = useState();
    const [defiListCodeForSponsored, setDefiListCodeForSponsored] = useState();



    function movePage(path) {
        history.push(path);
    }

    const [urlFlag1, setUrlFlag1] = useState(false);

    async function getDefiList() {
        if (urlFlag1) return;
        setUrlFlag1(true);

        console.count("[0716] getDefiListCall");
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
                // res[i].name

                let listingProjectIndexArr = [];

                // tvl 순서대로 카드 정렬
                for (var i = 0; i < res.length; i++) {
                    // res[i].name 으로 defistationApplicationList 의 index 순번 찾기
                    let defiApplicationIndex = _.findIndex(defistationApplicationList, function(project) {
                        let projectName = res[i].name;
                        if (projectName == "pancake") projectName = "PancakeSwap";
                        return project["Official Project Name"] == projectName;
                    });
                    listingProjectIndexArr.push(defiApplicationIndex);
                }

                console.log("listingProjectIndexArr: ", listingProjectIndexArr);

                let codeArr = [];
                let codeArrForListing = [];
                codeArrForListing.length = res.length; // lockedUsd
                let codeArrForSponsored = [];
                let defiIconArr = [];

                for (var i = 0; i < defistationApplicationList.length; i++) {
                    let defiInfoName = (defistationApplicationList[i]["Official Project Name"]).toLowerCase();
        
                    // 예외처리
                    if (defiInfoName == "pancakeswap") {
                        defiInfoName = "pancake";
                    }
        
                    // 이름에 공백 제거
                    if (defiInfoName.indexOf(" ") > 0) {
                        defiInfoName = defiInfoName.replace(" ", "");
                    }
        
                    // . 제거
                    if (defiInfoName.indexOf(".") > 0) {
                        defiInfoName = defiInfoName.replace(".", "");
                    }
        
                    // defistation 에 리스팅됐는가? 
                    let listFlag = false;
        
                    // 리스팅 된거 체크
        
                    // 아이콘 지금까지 저장한거 체크. 이후로는 defistationApplicationList.json 에 있는 코인 이미지 url로 사용
                    
                    // console.log("Official Project Name: ", defistationApplicationList[i]["Official Project Name"]);
        
                    switch (defistationApplicationList[i]["Official Project Name"]) {
                        case "pancake":
                        case "PancakeSwap":    
                            listFlag = true;
                            defiIconArr.push(pancake);
                            break;
                        case "Peach Swap":
                            defiIconArr.push(peachswap);
                            break;   
                        case "Streamity":
                            defiIconArr.push(streamity);
                            break;   
                        case "bscSwap":
                        case "BSC Swap":
                            listFlag = true;
                            defiIconArr.push(bscswap);
                            break;   
                        case "Spartan Protocol":
                            listFlag = true;
                            defiIconArr.push(spartanprotocol);
                            break;   
                        case "Burger Swap":
                            listFlag = true;
                            defiIconArr.push(burgerswap);
                            break;   
                        case "Stakecow":
                        case "Milk Protocol":
                            listFlag = true;
                            defiIconArr.push(stakecow);
                            break;   
                        case "Alpha Finance":
                            defiIconArr.push(alphafinance);
                            break;   
                        case "Cream Finance":
                            listFlag = true;
                            defiIconArr.push(creamfinance);
                            break;   
                        case "Bakery Swap":
                            listFlag = true;
                            defiIconArr.push(bakeryswap);
                            break;   
                        case "ForTube":
                            listFlag = true;
                            defiIconArr.push(fortube);
                            break;   
                        case "FryWorld":
                            listFlag = true;
                            defiIconArr.push(fryworld);
                            break;   
                        case "beefy.finance":
                            listFlag = true;
                            defiIconArr.push(beefyfinance);
                            break;
                        case "Narwhalswap":
                        case "NarwhalSwap":
                            listFlag = true;
                            defiIconArr.push(narwhalswap);
                            break;   
                        case "STORMSWAP":
                        case "Storm Swap":  
                            listFlag = true;  
                            defiIconArr.push(stormswap);
                            break;       
                        case "BnEX":
                            listFlag = true;
                            defiIconArr.push(bnexchange);
                            break;
                        case "7up.finance":
                        case "7UP Finance":    
                            defiIconArr.push(sevenupfinance);
                            break;
                        case "BFis.finance":
                        case "BFis.Finance":
                            defiIconArr.push(bfisfinance);
                            break;
                        case "bStable.finance":
                        case "bStable":
                            defiIconArr.push(bstablefinance);
                            break;
                        case "Dego":
                        case "Dego.finance":    
                            defiIconArr.push(dego);
                            break;
                        case "Equator.finance":
                        case "Equator.Finance":
                            defiIconArr.push(equatorfinance);
                            break;
                        case "StableXSwap":
                            defiIconArr.push(stablexswap);
                            break;
                        case "QIAN":
                            listFlag = true;
                            defiIconArr.push(qian);
                            break;    
                        case "PancakeBunny":
                            listFlag = true;
                            defiIconArr.push(pancakebunny);
                            break;
                        case "JulSwap":
                        case "Julswap":   
                            listFlag = true; 
                            defiIconArr.push(julswap);
                            break;
                        case "JustLiquidity":
                            defiIconArr.push(justliquidity);
                            break;
                        case "AnySwap":
                            listFlag = true;
                            defiIconArr.push(anyswap);
                            break;
                        case "CokeFinance":
                            listFlag = true;
                            defiIconArr.push(cokefinance);
                            break;
                        case "renVM":
                            defiIconArr.push(renvm);
                            break;
                        case "UniFi":
                            defiIconArr.push(unifiprotocol);
                            break;
                        case "Venus":
                            listFlag = true;
                            defiIconArr.push(venus);
                            break;   
                        case "Thugs":
                            listFlag = true;
                            defiIconArr.push(thugs);
                            break; 
                        case "CBerry":
                            listFlag = true;
                            defiIconArr.push(cberry);
                            break; 
                        case "Jetfuel.Finance":
                            defiIconArr.push(jetfuel);
                            break;  
                        case "ACryptoS":
                            listFlag = true;
                            defiIconArr.push(acryptos);
                            break;   
                        case "SoftDrinkSwap":
                            defiIconArr.push(softdrinkswap);
                            break;    
                        case "Nyanswop":
                            defiIconArr.push(nyanswap);
                            break;
                        case "BSC Farm":
                            defiIconArr.push(bscfarm);    
                            break;   
                        case "bDollar Protocol":
                            listFlag = true;
                            defiIconArr.push(bdollar);    
                            break;   
                        case "Autofarm":
                            listFlag = true;
                            defiIconArr.push(autofarm);    
                            break;   
                        case "Binance Agile Set Dollar":
                            defiIconArr.push(basddollar);    
                            break;
                        case "BiFi":
                            listFlag = true;
                            defiIconArr.push(bifi);    
                            break;
                        case "Multi-Chain Lend (MCL)":
                            listFlag = true;
                            defiIconArr.push(multiplier);    
                            break;    
                        case "BlackHoleSwap":
                            listFlag = true;
                            defiIconArr.push(blackholeswap);    
                            break;
                        case "Pika Finance":
                            listFlag = true;
                            defiIconArr.push(pikafinance);    
                            break;  
                        case "Bscrunner":
                            listFlag = true;
                            defiIconArr.push(bscrunner);
                            break;  
                        case "Ellipsis Finance":
                            listFlag = true;
                            defiIconArr.push(ellipsisfinance);
                            break;
                        case "DODO":
                            listFlag = true;
                            defiIconArr.push(dodo);
                            break;
                        case "Demex":
                            listFlag = true;
                            defiIconArr.push(demex);
                            break;
                        case "Helmet":
                            listFlag = true;
                            defiIconArr.push(helmet);
                            break;
                        case "ARIES FINANCIAL":
                            listFlag = true;
                            defiIconArr.push(ariesfinancial);
                            break;
                        case "Alpha Homora":
                            listFlag = true;
                            defiIconArr.push(alphahomora);
                            break;    
                        case "Cobalt.finance":
                            listFlag = true;
                            defiIconArr.push(cobaltfinance);
                            break;
                        case "SwampFinance":
                            listFlag = true;
                            defiIconArr.push(swampfinance);
                            break;
                        case "Nominex":
                            listFlag = true;
                            defiIconArr.push(nominex);
                            break;
                        case "Wault.Finance":
                            listFlag = true;
                            defiIconArr.push(waultfinance);
                            break;
                        case "WePiggy":
                            listFlag = true;
                            defiIconArr.push(wepiggy);
                            break;
                        case "Rabbit Finance":
                            listFlag = true;
                            defiIconArr.push(rabbitfinance);
                            break;
                        case "Biswap":
                            listFlag = true;
                            defiIconArr.push(biswap);
                            break;  
                        case "InsurAce Protocol":
                            listFlag = true;
                            defiIconArr.push(insuraceprotocol);
                            break;
                        case "TEN":
                            listFlag = true;
                            defiIconArr.push(ten);
                            break;  
                        case "MDEX":
                            listFlag = true;
                            defiIconArr.push(mdex);
                            break; 
                        case "Pumpy":
                            listFlag = true;
                            defiIconArr.push(pumpy);
                            break;
                        case "dForce":
                            listFlag = true;
                            defiIconArr.push(dforce);
                            break;      
                        case "Kebab Finance":
                            listFlag = true;
                            defiIconArr.push(kebab);
                            break;                    
                        default:
                            // defistationApplicationList.json 에 코인 심볼 아이콘 url이 있는가?
                            if (defistationApplicationList[i]["Project Logo URL (68px*68px png ONLY. Given link should directly DISPLAY Logo image without any BACKGROUND. Google drive link is NOT accepted.)"] != "") {
                                if (defistationApplicationList[i]["Project Logo URL (68px*68px png ONLY. Given link should directly DISPLAY Logo image without any BACKGROUND. Google drive link is NOT accepted.)"].indexOf("https://drive.google.com") > -1) {
                                    defiIconArr.push(defaultIcon);
                                } else {
                                    defiIconArr.push(defistationApplicationList[i]["Project Logo URL (68px*68px png ONLY. Given link should directly DISPLAY Logo image without any BACKGROUND. Google drive link is NOT accepted.)"]);
                                }
                            } else {
                                defiIconArr.push(defaultIcon);
                            }
                            break;    
                    }
        
                    let sponsoredFlag = false;
                    if (getSponsors().indexOf(defistationApplicationList[i]["Official Project Name"]) != -1) {
                        sponsoredFlag = true;
                    }

                    // listingProjectIndexArr 에 들어있는 순번대로 배치

                    // 3가지 타입: Sponsored + 리스팅 + 대기
                    if (listingProjectIndexArr.indexOf(i) != -1) {
                        // 리스팅 되어 있음
                        // 이 중에서 Sponsored 는 codeArrForSponsored 배열에 넣고
                        // 일반 리스팅 프로젝트는 tvl 순서대로 보여주고
                        // 가장 하단에 codeArrForListing 배열에 넣어 표시한다
                        let tempCode = <li onClick={() => history.push("/" + defiInfoName)}>
                            <img 
                                src={defiIconArr[i]} 
                                width="30px" 
                                onError={(e)=>{e.target.onerror = null; e.target.src=defaultIcon}}
                            /><br />
                            <span className="theDefiListCardTitle">{defistationApplicationList[i]["Official Project Name"]}</span><br />
                            <span className="theDefiListCardText">{textEllipsis(defistationApplicationList[i]["Detailed Project Description"])}</span>
                        </li>;

                        if (sponsoredFlag) {
                            // 예외처리(url 링크)
                            if (defistationApplicationList[i]["Official Project Name"] == "BSClaunch") {
                                tempCode = <li onClick={() => window.open("https://bsclaunch.org/", "_blank")} className="projectsCardSponsored">
                                    <div className="sponsored rightTopSponsored">Sponsored</div>
                                    <img 
                                        src={bsclaunch} 
                                        width="30px" 
                                        onError={(e)=>{e.target.onerror = null; e.target.src=defaultIcon}}
                                    /><br />
                                    <span className="theDefiListCardTitle">{defistationApplicationList[i]["Official Project Name"]}</span><br />
                                    <span className="theDefiListCardText">{textEllipsis(defistationApplicationList[i]["Detailed Project Description"])}</span>
                                </li>;
                            } else {
                                // 일반 리스팅
                                tempCode = <li onClick={() => history.push("/" + defiInfoName)} className="projectsCardSponsored">
                                    <div className="sponsored rightTopSponsored">Sponsored</div>
                                    <img 
                                        src={defiIconArr[i]} 
                                        width="30px" 
                                        onError={(e)=>{e.target.onerror = null; e.target.src=defaultIcon}}
                                    /><br />
                                    <span className="theDefiListCardTitle">{defistationApplicationList[i]["Official Project Name"]}</span><br />
                                    <span className="theDefiListCardText">{textEllipsis(defistationApplicationList[i]["Detailed Project Description"])}</span>
                                </li>;
                            }
                            
                            codeArrForSponsored.push(tempCode);
                        } else {
                            // listingProjectIndexArr 배열의 순번대로 넣어야함
                            let orderByTvl = listingProjectIndexArr.indexOf(i);
                            codeArrForListing[orderByTvl] = tempCode;
                        }
                    } else {
                        let tempUrl = defistationApplicationList[i]["Project Official Website (URL)"];
                        let tempCode = <li onClick={() => window.open(tempUrl, "_blank")}>
                            <img 
                                src={defiIconArr[i]} 
                                width="30px" 
                                style={{"height":"30px", "min-height": "30px"}}
                                onError={(e)=>{e.target.onerror = null; e.target.src=defaultIcon}}
                            /><br />
                            <span className="theDefiListCardTitle">{defistationApplicationList[i]["Official Project Name"]}</span><br />
                            <span className="theDefiListCardText">{textEllipsis(defistationApplicationList[i]["Detailed Project Description"])}</span>
                        </li>;
                        codeArr.push(tempCode);
                    }
                }

                setDefiListCode(codeArr);
                setDefiListCodeForSponsored(codeArrForSponsored);
                setDefiListCodeForListing(codeArrForListing);
            })
            .catch(err => setResponseError(err));
    }

    useEffect(() => {
        getDefiList();
        
        return () => {
            console.log('cleanup');
        };
    }, [])

    return (
        <>
            <div className="wrapper">
                <TopBar />
                {/* <div className="navBox noDrag"><span className="navHome" onClick={() => movePage("/")}>DEFISTATION</span> &gt; <span className="navDefiName">Projects</span></div> */}
                <div>
                    <ul className="tvlTitleBox">
                        <li>
                            <span className="subPageTitle">Projects</span>
                        </li>
                        <li>
                            <div className="navBox noDrag"><span className="navHome" onClick={() => movePage("/")}>DEFISTATION</span> &gt; <span className="navDefiName">Projects</span></div>
                        </li>
                    </ul>
                </div>
                
                
                <div className="applyBtn" onClick={() => window.open("https://forms.gle/SUPc87JiR8Nt4FMp7", "_blank")}>
                    <ul className="applyBtnUl">
                        <li>
                            <p className="applyBtnTitle">Apply to be listed</p><br />
                            <span className="applyBtnText">Please fill in this application form to be begin your screening process to be listed on Defistation</span>
                        </li>
                        <li>
                            <img src={yellowArrow} width="40px" />
                        </li>
                    </ul>
                </div>
                <ul className="theDefiListUl">
                    {defiListCodeForSponsored}
                    {defiListCodeForListing}
                    {defiListCode}
                </ul>
                <Footer />
            </div>
        </>
    );
})

export default TheDefiList;
