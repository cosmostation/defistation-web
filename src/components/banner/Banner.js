import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { generateRandom } from '../../util/Util';
// import useStores from '../../../useStores';
// import { Animate } from 'react-move'

import Slider from "react-slick";   // https://github.com/akiran/react-slick
// $ npm install react-slick --save
// $ npm install slick-carousel

import "slick-carousel/slick/slick.css";    
import "slick-carousel/slick/slick-theme.css";

import '../../App.css';

import binanceImg1 from "../../assets/images/binanceimg.gif";

import btcst from "../../assets/images/banner/Defistation Banner_BTCST.png";
import btcstMobile from "../../assets/images/banner/banner_btcst_mobile.png";

import bifi from "../../assets/images/banner/Defistation Banner_BiFi.png";
import bifiMobile from "../../assets/images/banner/banner_bifi_mobile.png";

import aries from "../../assets/images/banner/banner_ARIES_web.png";
import ariesMobile from "../../assets/images/banner/banner_ARIES_mobile.png";

// Google Analytics
import ReactGA from 'react-ga';     // https://github.com/react-ga/react-ga

const Banner = observer((props) => {

    // banner slider setting
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 7000,
        vertical: true,
        adaptiveHeight: false
    };

    const [bannerImg, setBannerImg] = useState(btcst);
    const [bannerImg2, setBannerImg2] = useState(aries);

    const [randomNum, setRandomNum] = useState(0);

    useEffect(() => {
        if (window.innerWidth > 1034) {
            setBannerImg(btcst);
            setBannerImg2(aries);
        } else {
            setBannerImg(btcstMobile);
            setBannerImg2(ariesMobile);
        }
        
        let tempRandom = generateRandom(0, 100);
        setRandomNum(tempRandom);
        
        return () => {

        };
    }, [bannerImg])

    return (
        // <div className="banner" onClick={() => window.open("https://www.binance.org/en/smartChain", "_blank")}>
        //     <span className="bannerTitle">Binance Smart Chain</span>
        //     <p className="bannerContent">An Ethereum Virtual Machine-compatible blockchain with a Proof of Staked Authority consensus mechanism</p>
        //     <img className="noDragImg" src={binanceImg1} />
        // </div>

        // <div className="banner" onClick={() => openBannerWindow("https://app.btcst.finance/")}>
        //     <div className="bannerAdTextRect" style={bannerImg == btcst ? undefined : { display: "none" } }>
        //         <span className="bannerAdText">Ad</span>
        //     </div>
        //     <img src={bannerImg}  />
        // </div>

        <div>
            {/* <div className="bannerAdTextRect" style={bannerImg == btcst || bannerImg2 == bifi ? undefined : { display: "none" } }>
                <span className="bannerAdText">Ad</span>
            </div> */}
            <Slider {...settings} className="bannerWrapper" style={randomNum % 2 == 0 ? undefined : { display: "none" }}>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick"
                    to="https://app.btcst.finance/"
                    target="_blank"
                    trackerNames={['BTC Standard Hashrate Token']}
                    >
                        <div className="banner"><img src={bannerImg} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(ARIES FINANCIAL)"
                    to="https://www.aries.financial/YieldFarmingV2"
                    target="_blank"
                    trackerNames={['ARIES FINANCIAL']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick"
                    to="https://app.btcst.finance/"
                    target="_blank"
                    trackerNames={['BTC Standard Hashrate Token']}
                    >
                        <div className="banner"><img src={bannerImg} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(ARIES FINANCIAL)"
                    to="https://www.aries.financial/YieldFarmingV2"
                    target="_blank"
                    trackerNames={['ARIES FINANCIAL']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick"
                    to="https://app.btcst.finance/"
                    target="_blank"
                    trackerNames={['BTC Standard Hashrate Token']}
                    >
                        <div className="banner"><img src={bannerImg} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(ARIES FINANCIAL)"
                    to="https://www.aries.financial/YieldFarmingV2"
                    target="_blank"
                    trackerNames={['ARIES FINANCIAL']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
            </Slider>
            <Slider {...settings} className="bannerWrapper" style={randomNum % 2 == 1 ? undefined : { display: "none" }}>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(ARIES FINANCIAL)"
                    to="https://www.aries.financial/YieldFarmingV2"
                    target="_blank"
                    trackerNames={['ARIES FINANCIAL']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick"
                    to="https://app.btcst.finance/"
                    target="_blank"
                    trackerNames={['BTC Standard Hashrate Token']}
                    >
                        <div className="banner"><img src={bannerImg} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(ARIES FINANCIAL)"
                    to="https://www.aries.financial/YieldFarmingV2"
                    target="_blank"
                    trackerNames={['ARIES FINANCIAL']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick"
                    to="https://app.btcst.finance/"
                    target="_blank"
                    trackerNames={['BTC Standard Hashrate Token']}
                    >
                        <div className="banner"><img src={bannerImg} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(ARIES FINANCIAL)"
                    to="https://www.aries.financial/YieldFarmingV2"
                    target="_blank"
                    trackerNames={['ARIES FINANCIAL']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick"
                    to="https://app.btcst.finance/"
                    target="_blank"
                    trackerNames={['BTC Standard Hashrate Token']}
                    >
                        <div className="banner"><img src={bannerImg} /></div>
                    </ReactGA.OutboundLink>
                </div>
            </Slider>
        </div>
    );
})

export default Banner;