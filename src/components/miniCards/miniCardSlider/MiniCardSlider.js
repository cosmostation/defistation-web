import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { numberWithCommas, capitalize, replaceAll, getCurrencyUnit, getCurrencyUnitFullName, getCurrencyDigit, getOfficialDefiName } from '../../../util/Util';
// import { useHistory, useLocation } from 'react-router-dom';

import Slider from "react-slick";   // https://github.com/akiran/react-slick
// $ npm install react-slick --save
// $ npm install slick-carousel

import '../../../App.css';

const MiniCardSlider = observer((props) => {

    // slider setting
    var settingsMiniCard = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 7000,
        vertical: true,
        arrows: false
    };

    const [changeTag0, setChangeTag0] = useState();
    const [changeTag1, setChangeTag1] = useState();
    const [changeTag2, setChangeTag2] = useState();
    const [changeTag3, setChangeTag3] = useState();

    function convertChangeNumText(changeNum) {
        let changeNumTag;
        if (changeNum > 0) {
            // +
            changeNumTag = <span className="miniCardChange textGreen">+{(changeNum * 100).toFixed(2)}%</span>;
        } else if (changeNum == 0) {
            changeNumTag = <span className="miniCardChange">{(changeNum * 100).toFixed(2)}%</span>;
        } else if (changeNum < 0) {
            changeNumTag = <span className="miniCardChange textRed">{(changeNum * 100).toFixed(2)}%</span>;
        }
        setChangeTag0(changeNumTag);
    }

    useEffect(() => {
        // setChangeTag0(convertChangeNumText(props.data24hChange0));
        // setChangeTag1(convertChangeNumText(props.data24hChange1));
        // setChangeTag2(convertChangeNumText(props.data24hChange2));
        // setChangeTag3(convertChangeNumText(props.data24hChange3));

        return () => {

        };
        //  props.dataNum
    }, [])

    return (
        <li className="miniCardList">
            {/* <span className="miniCardTitle">{props.title}</span>
            {props.data24hChange}
            {props.trendingDefiName}
            <p style={props.symbol == "BNB" ? undefined : { display: "none" } }  className="miniCardDataNum">{props.dataNum} <span style={{"color":"#f0b923"}}>BNB</span></p>
            <p style={props.symbol == "BNB" ? { display: "none" } : undefined }  className="miniCardDataNum">{props.dataNum}</p> */}
            
            
            {/* 
            title0={"Trending(Price)"} dataNum0={"$ 00.00"} data24hChange0={12.34} defiName={"name0"}
            title1={"Trending(Mkt Cap)"} dataNum1={"$ 00.00B"} data24hChange1={-12.34} defiName1={"name1"}
            title2={"Trending(Holders)"} dataNum2={"999,999"} data24hChange2={12.34} defiName2={"name2"}
            title3={"Trending(TVL)"} dataNum3={"$ 00.00B"} data24hChange3={-12.34} defiName3={"name3"} 
            */}
            
            <Slider {...settingsMiniCard}>
                <div>
                    <span className="miniCardTitle">{props.title0}</span>
                    {/* {props.data24hChange0} */}

                    <span style={props.data24hChange0 > 0 ? undefined : { display: "none" }} className="miniCardChange textGreen">+{(props.data24hChange0 * 100).toFixed(2)}%</span>
                    <span style={props.data24hChange0 == 0 ? undefined : { display: "none" }} className="miniCardChange">{(props.data24hChange0 * 100).toFixed(2)}%</span>
                    <span style={props.data24hChange0 < 0 ? undefined : { display: "none" }} className="miniCardChange textRed">{(props.data24hChange0 * 100).toFixed(2)}%</span>

                    <span className="trendingDefiName">{props.defiName0}</span>
                    <p className="miniCardDataNum">$ {numberWithCommas(props.dataNum0, false)}</p>
                </div>
                <div>
                    <span className="miniCardTitle">{props.title1}</span>
                    {/* {props.data24hChange1} */}

                    <span style={props.data24hChange1 > 0 ? undefined : { display: "none" }} className="miniCardChange textGreen">+{(props.data24hChange1 * 100).toFixed(2)}%</span>
                    <span style={props.data24hChange1 == 0 ? undefined : { display: "none" }} className="miniCardChange">{(props.data24hChange1 * 100).toFixed(2)}%</span>
                    <span style={props.data24hChange1 < 0 ? undefined : { display: "none" }} className="miniCardChange textRed">{(props.data24hChange1 * 100).toFixed(2)}%</span>

                    <span className="trendingDefiName">{props.defiName1}</span>
                    <p className="miniCardDataNum">$ {numberWithCommas(props.dataNum1, false)}</p>
                </div>
                <div>
                    <span className="miniCardTitle">{props.title2}</span>
                    {/* {props.data24hChange2} */}

                    <span style={props.data24hChange2 > 0 ? undefined : { display: "none" }} className="miniCardChange textGreen">+{props.data24hChange2}</span>
                    <span style={props.data24hChange2 == 0 ? undefined : { display: "none" }} className="miniCardChange">{props.data24hChange2}</span>
                    <span style={props.data24hChange2 < 0 ? undefined : { display: "none" }} className="miniCardChange textRed">{props.data24hChange2}</span>

                    <span className="trendingDefiName">{props.defiName2}</span>
                    <p className="miniCardDataNum">{numberWithCommas(props.dataNum2, false)}</p>
                </div>
                <div>
                    <span className="miniCardTitle">{props.title3}</span>
                    {/* {props.data24hChange3} */}

                    <span style={props.data24hChange3 > 0 ? undefined : { display: "none" }} className="miniCardChange textGreen">+{(props.data24hChange3 * 100).toFixed(2)}%</span>
                    <span style={props.data24hChange3 == 0 ? undefined : { display: "none" }} className="miniCardChange">{(props.data24hChange3 * 100).toFixed(2)}%</span>
                    <span style={props.data24hChange3 < 0 ? undefined : { display: "none" }} className="miniCardChange textRed">{(props.data24hChange3 * 100).toFixed(2)}%</span>

                    <span className="trendingDefiName">{props.defiName3}</span>
                    <p className="miniCardDataNum">$ {numberWithCommas(props.dataNum3, false)}</p>
                </div>
            </Slider>
        </li>
    );
})

export default MiniCardSlider;