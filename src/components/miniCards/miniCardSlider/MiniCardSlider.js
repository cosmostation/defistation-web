import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import { numberWithCommas, capitalize, replaceAll, getCurrencyUnit, getCurrencyUnitFullName, getCurrencyDigit, getOfficialDefiName, convertToBMK } from '../../../util/Util';
import EllipsisText from "react-ellipsis-text";

import Slider from "react-slick";   // https://github.com/akiran/react-slick
// $ npm install react-slick --save
// $ npm install slick-carousel

import '../../../App.css';

const MiniCardSlider = observer((props) => {

    const history = useHistory();

    const [responseError, setResponseError] = useState();

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

    function movePage(path) {
        history.push(path);
    }

    async function goToTrendingDetailPage(defiName) {
        // TODO
        // if (defiName == "PancakeSwap") {
        //     defiName = "pancake";
        // }
        // console.log("defiName: ", defiName);
        // let tempDefiName = replaceAll(defiName, ".", "");
        // tempDefiName = replaceAll(tempDefiName, " ", "");
        // tempDefiName = tempDefiName.toLowerCase();
        // movePage("/" + tempDefiName);
    }

    useEffect(() => {
        return () => {

        };
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
                    {/* price */}

                    <span style={props.data24hChange0 > 0 ? undefined : { display: "none" }} className="miniCardChange textGreen">+{(props.data24hChange0 * 100).toFixed(2)}%</span>
                    <span style={props.data24hChange0 == 0 ? undefined : { display: "none" }} className="miniCardChange textGray">{(props.data24hChange0 * 100).toFixed(2)}%</span>
                    <span style={props.data24hChange0 < 0 ? undefined : { display: "none" }} className="miniCardChange textRed">{(props.data24hChange0 * 100).toFixed(2)}%</span>

                    {/* <span className="trendingDefiName" onClick={() => goToTrendingDetailPage(props.defiName0)}>{props.defiName0}</span> */}
                    <span className="trendingDefiName" onClick={() => goToTrendingDetailPage(props.defiName0)}>
                        {
                            props.defiName0 != undefined ? <EllipsisText text={props.defiName0} length={"20"} /> : undefined
                        }
                    </span>
                    <p className="miniCardDataNum">$ {numberWithCommas(props.dataNum0, false)}</p>
                </div>
                <div>
                    <span className="miniCardTitle">{props.title1}</span>
                    {/* Mkt Cap */}

                    <span style={props.data24hChange1 > 0 ? undefined : { display: "none" }} className="miniCardChange textGreen">+{(props.data24hChange1 * 100).toFixed(2)}%</span>
                    <span style={props.data24hChange1 == 0 ? undefined : { display: "none" }} className="miniCardChange textGray">{(props.data24hChange1 * 100).toFixed(2)}%</span>
                    <span style={props.data24hChange1 < 0 ? undefined : { display: "none" }} className="miniCardChange textRed">{(props.data24hChange1 * 100).toFixed(2)}%</span>

                    {/* <span className="trendingDefiName" onClick={() => goToTrendingDetailPage(props.defiName1)}>{props.defiName1}</span> */}
                    <span className="trendingDefiName" onClick={() => goToTrendingDetailPage(props.defiName1)}>
                        {
                            props.defiName1 != undefined ? <EllipsisText text={props.defiName1} length={"20"} /> : undefined
                        }
                    </span>
                    <p className="miniCardDataNum">$ {convertToBMK(props.dataNum1, false)}</p>
                </div>
                <div>
                    <span className="miniCardTitle">{props.title2}</span>
                    {/* Holders */}

                    <span style={props.data24hChange2 > 0 ? undefined : { display: "none" }} className="miniCardChange textGreen">+{numberWithCommas(props.data24hChange2)}</span>
                    <span style={props.data24hChange2 == 0 ? undefined : { display: "none" }} className="miniCardChange textGray">{numberWithCommas(props.data24hChange2)}</span>
                    <span style={props.data24hChange2 < 0 ? undefined : { display: "none" }} className="miniCardChange textRed">{numberWithCommas(props.data24hChange2)}</span>

                    {/* <span className="trendingDefiName" onClick={() => goToTrendingDetailPage(props.defiName2)}>{props.defiName2}</span> */}
                    <span className="trendingDefiName" onClick={() => goToTrendingDetailPage(props.defiName2)}>
                        {
                            props.defiName2 != undefined ? <EllipsisText text={props.defiName2} length={"20"} /> : undefined
                        }
                    </span>
                    <p className="miniCardDataNum">{numberWithCommas(props.dataNum2, false)}</p>
                </div>
                <div>
                    <span className="miniCardTitle">{props.title3}</span>
                    {/* TVL */}

                    <span style={props.data24hChange3 > 0 ? undefined : { display: "none" }} className="miniCardChange textGreen">+{(props.data24hChange3 * 100).toFixed(2)}%</span>
                    <span style={props.data24hChange3 == 0 ? undefined : { display: "none" }} className="miniCardChange textGray">{(props.data24hChange3 * 100).toFixed(2)}%</span>
                    <span style={props.data24hChange3 < 0 ? undefined : { display: "none" }} className="miniCardChange textRed">{(props.data24hChange3 * 100).toFixed(2)}%</span>

                    {/* <span className="trendingDefiName" onClick={() => goToTrendingDetailPage(props.defiName3)}>{props.defiName3}</span> */}
                    <span className="trendingDefiName" onClick={() => goToTrendingDetailPage(props.defiName3)}>
                        {
                            props.defiName3 != undefined ? <EllipsisText text={props.defiName3} length={"20"} /> : undefined
                        }
                    </span>
                    <p className="miniCardDataNum">$ {convertToBMK(props.dataNum3, false)}</p>
                </div>
            </Slider>
        </li>
    );
})

export default MiniCardSlider;