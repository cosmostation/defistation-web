import React, { Component, Suspense, useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
// import useStores from '../../useStores';

import { textEllipsis } from '../../util/Util';

import '../../App.css';

import TopBar from '../topBar/TopBar';
import Footer from '../footer/Footer';

import projectList from '../../projectList.json';

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
import dodo from "../../assets/images/defiLogo/dodo@2x.png";
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

const TheDefiList = observer(() => {
    // const { global } = useStores();

    const location = useLocation();

    const history = useHistory();

    const [responseError, setResponseError] = useState();
    const [response, setResponse] = useState({});

    const [urlPathName, setUrlPathName] = useState();
    const [defiName, setDefiName] = useState("");
    
    const [defiListCode, setDefiListCode] = useState();

    function movePage(path) {
        history.push(path);
    }

    function createDefiProjectCard() {
        // projectList 에 있는 전체 리스트 다 보여주기
        console.log("projectList: ", projectList);

        let codeArr = [];
        let defiIconArr = [];

        for (var i = 0; i < projectList.length; i++) {

            let defiInfoName = (projectList[i].name).toLowerCase();

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

            switch (projectList[i].name) {
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
                case "DODO":
                    defiIconArr.push(dodo);
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
                    defiIconArr.push(bdollar);    
                    break;   
                case "Autofarm":
                    defiIconArr.push(autofarm);    
                    break;   
                case "Binance Agile Set Dollar":
                    defiIconArr.push(basddollar);    
                    break;
                default:
                    defiIconArr.push(defaultIcon);
                    break;    
            }

            if (listFlag) {
                codeArr.push(
                    <li onClick={() => history.push("/" + defiInfoName)}>
                        <img src={defiIconArr[i]} width="40px" /><br />
                        <span className="theDefiListCardTitle">{projectList[i].name}</span><br />
                        <span className="theDefiListCardText">{textEllipsis(projectList[i].description)}</span>
                    </li>
                );
            } else {
                let tempUrl = projectList[i].officialWebsite;
                codeArr.push(
                    <li onClick={() => window.open(tempUrl, "_blank")}>
                        <img src={defiIconArr[i]} width="40px" /><br />
                        <span className="theDefiListCardTitle">{projectList[i].name}</span><br />
                        <span className="theDefiListCardText">{textEllipsis(projectList[i].description)}</span>
                    </li>
                );
            }
        }

        setDefiListCode(codeArr);
    }

    useEffect(() => {
        createDefiProjectCard();

        return () => {
            console.log('cleanup');
        };
    }, [])

    return (
        <>
            <div className="wrapper">
                <TopBar />
                <div className="navBox noDrag"><span className="navHome" onClick={() => movePage("/")}>DEFISTATION</span> &gt; <span className="navDefiName">Projects</span></div>
                <div className="applyBtn" onClick={() => window.open("https://forms.gle/SUPc87JiR8Nt4FMp7", "_blank")}>
                    <ul className="applyBtnUl">
                        <li>
                            <span className="applyBtnTitle">Apply to be listed</span><br />
                            <span className="applyBtnText">Please fill in this application form to be begin your screening process to be listed on Defistation</span>
                        </li>
                        <li>
                            <img src={yellowArrow} width="40px" />
                        </li>
                    </ul>
                </div>
                <ul className="theDefiListUl">
                    {defiListCode}
                </ul>
                <Footer />
            </div>
        </>
    );
})

export default TheDefiList;
