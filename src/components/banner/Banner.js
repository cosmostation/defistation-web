import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../App.css';

import React, { Fragment, Suspense, useEffect, useState } from "react";
import { inject, observer } from 'mobx-react';

// Google Analytics
import ReactGA from 'react-ga';
import Slider from "react-slick";
import binanceImg1 from "../../assets/images/binanceimg.gif";
import bscLaunch from "../../assets/images/banner/banner_bsclaunch_web.gif";
import bscLaunchMobile from "../../assets/images/banner/banner_bsclaunch_mobile.gif";
import bunnyPark from "../../assets/images/banner/banner_bunnypark_web.jpg";
import bunnyParkMobile from "../../assets/images/banner/banner_bunnypark_mobile.jpg";
import cryptoPlanet from "../../assets/images/banner/CryptoPlanet_Web.jpg";
import cryptoPlanetMobile from "../../assets/images/banner/CryptoPlanet_Mobile.jpg";
import { generateRandom } from '../../util/Util';
import o3Swap from "../../assets/images/banner/banner_o3swap_web.jpg";
import o3SwapMobile from "../../assets/images/banner/banner_o3swap_mobile.jpg";
import { random } from "lodash";
import ten from "../../assets/images/banner/banner_tenfi_web.png";
import tenMobile from "../../assets/images/banner/banner_tenfi_mobile.png";

// import useStores from '../../../useStores';
// import { Animate } from 'react-move'

  // https://github.com/akiran/react-slick
// $ npm install react-slick --save
// $ npm install slick-carousel

   




// import bifi from "../../assets/images/banner/Defistation Banner_BiFi.png";
// import bifiMobile from "../../assets/images/banner/banner_bifi_mobile.png";

// import aries from "../../assets/images/banner/banner_ARIES_web.png";
// import ariesMobile from "../../assets/images/banner/banner_ARIES_mobile.png";



// import moonLiftProtocol from "../../assets/images/banner/banner_moonliftprotocol_web.png";
// import moonLiftProtocolMobile from "../../assets/images/banner/banner_moonliftprotocol_mobile.jpg";



    // https://github.com/react-ga/react-ga

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
    const [bannerImg2, setBannerImg2] = useState(ten);
    const [bannerImg3, setBannerImg3] = useState(cryptoPlanet);

    const [randomNum, setRandomNum] = useState(0);

    useEffect(() => {
        if (window.innerWidth > 1034) {
            setBannerImg(bunnyPark);
            setBannerImg2(ten);
            setBannerImg3(cryptoPlanet);
        } else {
            setBannerImg(bunnyParkMobile);
            setBannerImg2(tenMobile);
            setBannerImg3(cryptoPlanetMobile);
        }
        
        let tempRandom = generateRandom(0, 100);
        setRandomNum(tempRandom);
        
        return () => {

        };
    }, [bannerImg])

    return (
        <div>
            {/* 1 */}
            <Slider {...settings} className="bannerWrapper" style={randomNum < 33 ? undefined : { display: "none" }}>
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
                    eventLabel="bannerClick(TEN)"
                    to="https://ten.finance/"
                    target="_blank"
                    trackerNames={['TEN']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(Crypto Planet)"
                    to="https://t.me/CryptoPlanet_Gaming"
                    target="_blank"
                    trackerNames={['Crypto Planet']}
                    >
                        <div className="banner"><img src={bannerImg3} /></div>
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
                    eventLabel="bannerClick(TEN)"
                    to="https://ten.finance/"
                    target="_blank"
                    trackerNames={['TEN']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(Crypto Planet)"
                    to="https://t.me/CryptoPlanet_Gaming"
                    target="_blank"
                    trackerNames={['Crypto Planet']}
                    >
                        <div className="banner"><img src={bannerImg3} /></div>
                    </ReactGA.OutboundLink>
                </div>
            </Slider>
            {/* 2 */}
            <Slider {...settings} className="bannerWrapper" style={randomNum >= 33 && randomNum < 66 ? undefined : { display: "none" }}>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(TEN)"
                    to="https://ten.finance/"
                    target="_blank"
                    trackerNames={['TEN']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(Crypto Planet)"
                    to="https://t.me/CryptoPlanet_Gaming"
                    target="_blank"
                    trackerNames={['Crypto Planet']}
                    >
                        <div className="banner"><img src={bannerImg3} /></div>
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
                    eventLabel="bannerClick(TEN)"
                    to="https://ten.finance/"
                    target="_blank"
                    trackerNames={['TEN']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(Crypto Planet)"
                    to="https://t.me/CryptoPlanet_Gaming"
                    target="_blank"
                    trackerNames={['Crypto Planet']}
                    >
                        <div className="banner"><img src={bannerImg3} /></div>
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
            <Slider {...settings} className="bannerWrapper" style={randomNum >= 66 ? undefined : { display: "none" }}>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(Crypto Planet)"
                    to="https://t.me/CryptoPlanet_Gaming"
                    target="_blank"
                    trackerNames={['Crypto Planet']}
                    >
                        <div className="banner"><img src={bannerImg3} /></div>
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
                    eventLabel="bannerClick(TEN)"
                    to="https://ten.finance/"
                    target="_blank"
                    trackerNames={['TEN']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
                <div>
                    <ReactGA.OutboundLink
                    eventLabel="bannerClick(Crypto Planet)"
                    to="https://t.me/CryptoPlanet_Gaming"
                    target="_blank"
                    trackerNames={['Crypto Planet']}
                    >
                        <div className="banner"><img src={bannerImg3} /></div>
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
                    eventLabel="bannerClick(TEN)"
                    to="https://ten.finance/"
                    target="_blank"
                    trackerNames={['TEN']}
                    >
                        <div className="banner"><img src={bannerImg2} /></div>
                    </ReactGA.OutboundLink>
                </div>
            </Slider>
        </div>
    );
})

export default Banner;