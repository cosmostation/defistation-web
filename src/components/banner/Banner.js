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

import bunnyPark from "../../assets/images/banner/banner_bunnypark_web.jpg";
import bunnyParkMobile from "../../assets/images/banner/banner_bunnypark_mobile.jpg";

// import bifi from "../../assets/images/banner/Defistation Banner_BiFi.png";
// import bifiMobile from "../../assets/images/banner/banner_bifi_mobile.png";

// import aries from "../../assets/images/banner/banner_ARIES_web.png";
// import ariesMobile from "../../assets/images/banner/banner_ARIES_mobile.png";

import o3Swap from "../../assets/images/banner/banner_o3swap_web.jpg";
import o3SwapMobile from "../../assets/images/banner/banner_o3swap_mobile.jpg";

import bscLaunch from "../../assets/images/banner/banner_bsclaunch_web.gif";
import bscLaunchMobile from "../../assets/images/banner/banner_bsclaunch_mobile.gif";

import moonLiftProtocol from "../../assets/images/banner/banner_moonliftprotocol_web.png";
import moonLiftProtocolMobile from "../../assets/images/banner/banner_moonliftprotocol_mobile.jpg";

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

    const [bannerImg, setBannerImg] = useState(bunnyPark);
    const [bannerImg2, setBannerImg2] = useState(o3Swap);
    const [bannerImg3, setBannerImg3] = useState(bscLaunch);
    const [bannerImg4, setBannerImg4] = useState(moonLiftProtocol);

    const [randomNum, setRandomNum] = useState(0);

    useEffect(() => {
        if (window.innerWidth > 1034) {
            setBannerImg(bunnyPark);
            setBannerImg2(o3Swap);
            setBannerImg3(bscLaunch);
            setBannerImg4(moonLiftProtocol);
        } else {
            setBannerImg(bunnyParkMobile);
            setBannerImg2(o3SwapMobile);
            setBannerImg3(bscLaunchMobile);
            setBannerImg4(moonLiftProtocolMobile);
        }
        
        let tempRandom = generateRandom(0, 100);
        setRandomNum(tempRandom);
        
        return () => {

        };
    }, [bannerImg])

    return (
        <div>
            {/* 1 */}
            <Slider {...settings} className="bannerWrapper" style={randomNum < 25 ? undefined : { display: "none" }}>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(bunnyPark)"
                    to="https://www.bunnypark.com/"
                    target="_blank"
                    trackerNames={['bunnyPark']}
                    >
                        <div className="banner"><img src={bannerImg} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(O3 Swap)"
                    to="https://o3swap.com/vault"
                    target="_blank"
                    trackerNames={['O3 Swap']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(bscLaunch)"
                    to="https://bsclaunch.org/"
                    target="_blank"
                    trackerNames={['bscLaunch']}
                    >
                        <div className="banner"><img src={bannerImg3} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(MoonLift Protocol)"
                    to="https://moonlift.io/"
                    target="_blank"
                    trackerNames={['MoonLift Protocol']}
                    >
                        <div className="banner"><img src={bannerImg4} /></div>
                    </ReactGA.OutboundLink>
                </div>
            </Slider>
            {/* 2 */}
            <Slider {...settings} className="bannerWrapper" style={randomNum >= 25 && randomNum < 50 ? undefined : { display: "none" }}>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(O3 Swap)"
                    to="https://o3swap.com/vault"
                    target="_blank"
                    trackerNames={['O3 Swap']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(bscLaunch)"
                    to="https://bsclaunch.org/"
                    target="_blank"
                    trackerNames={['bscLaunch']}
                    >
                        <div className="banner"><img src={bannerImg3} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(MoonLift Protocol)"
                    to="https://moonlift.io/"
                    target="_blank"
                    trackerNames={['MoonLift Protocol']}
                    >
                        <div className="banner"><img src={bannerImg4} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(bunnyPark)"
                    to="https://www.bunnypark.com/"
                    target="_blank"
                    trackerNames={['bunnyPark']}
                    >
                        <div className="banner"><img src={bannerImg} /></div>
                    </ReactGA.OutboundLink>
                </div>
            </Slider>
            {/* 3 */}
            <Slider {...settings} className="bannerWrapper" style={randomNum >= 50 && randomNum < 75 ? undefined : { display: "none" }}>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(bscLaunch)"
                    to="https://bsclaunch.org/"
                    target="_blank"
                    trackerNames={['bscLaunch']}
                    >
                        <div className="banner"><img src={bannerImg3} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(MoonLift Protocol)"
                    to="https://moonlift.io/"
                    target="_blank"
                    trackerNames={['MoonLift Protocol']}
                    >
                        <div className="banner"><img src={bannerImg4} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(bunnyPark)"
                    to="https://www.bunnypark.com/"
                    target="_blank"
                    trackerNames={['bunnyPark']}
                    >
                        <div className="banner"><img src={bannerImg} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(O3 Swap)"
                    to="https://o3swap.com/vault"
                    target="_blank"
                    trackerNames={['O3 Swap']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
            </Slider>
            {/* 4 */}
            <Slider {...settings} className="bannerWrapper" style={randomNum > 75 ? undefined : { display: "none" }}>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(MoonLift Protocol)"
                    to="https://moonlift.io/"
                    target="_blank"
                    trackerNames={['MoonLift Protocol']}
                    >
                        <div className="banner"><img src={bannerImg4} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(bunnyPark)"
                    to="https://www.bunnypark.com/"
                    target="_blank"
                    trackerNames={['bunnyPark']}
                    >
                        <div className="banner"><img src={bannerImg} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(O3 Swap)"
                    to="https://o3swap.com/vault"
                    target="_blank"
                    trackerNames={['O3 Swap']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(bscLaunch)"
                    to="https://bsclaunch.org/"
                    target="_blank"
                    trackerNames={['bscLaunch']}
                    >
                        <div className="banner"><img src={bannerImg3} /></div>
                    </ReactGA.OutboundLink>
                </div>
            </Slider>
        </div>
    );
})

export default Banner;