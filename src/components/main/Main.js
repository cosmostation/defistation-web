import '../../App.css';

import React, { useEffect } from "react";

import DefiList from '../defiList/DefiList';
import Footer from '../footer/Footer';
import MiniCards from '../miniCards/MiniCards';
import ReactGA from "react-ga";
import TopBar from '../topBar/TopBar';
import TotalValue from '../totalValue/TotalValue';
import { observer } from 'mobx-react';

const Main = observer(() => {

    useEffect(() => {
        
        // Google Analytics
        if (process.env.NODE_ENV === "production") ReactGA.pageview(window.location.pathname + window.location.search);

        // const nightModeFlag = !window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        // console.log("nightModeFlag: ", nightModeFlag);

        return () => {
            console.log('cleanup');
        };
    }, [])

    return (
        <div className="wrapper">
            <TopBar />
            <TotalValue defiName="DeFi" />
            <MiniCards defiName="DeFi" />
            {/* <Banner /> */}
            <DefiList  />
            <Footer />
        </div>
    );
})

export default Main;
