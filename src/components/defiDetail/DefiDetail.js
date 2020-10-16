import React, { Component, Suspense, useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import '../../App.css';

import TopBar from '../topBar/TopBar';
import TotalValue from '../totalValue/TotalValue';
import MiniCards from '../miniCards/MiniCards';
import Banner from '../banner/Banner';
import DefiList from '../defiList/DefiList';
import Footer from '../footer/Footer';

const DefiDetail = observer(() => {

    const location = useLocation();

    const [defiName, setDefiName] = useState("");

    useEffect(() => {
        //   console.log('렌더링이 완료되었습니다!');

        // 현재 페이지 url 이름 파악하기 defiName

        if ((location.pathname).includes("pancake")) {
            setDefiName("pancake");
        } else if ((location.pathname).includes("bscswap")) {
            setDefiName("bscswap");
        } else if ((location.pathname).includes("beefyfinance")) {
            setDefiName("beefyfinance");
        }


        return () => {
            console.log('cleanup');
        };
    }, [])

    return (
        <div className="wrapper">
            <TopBar />
            <div className="navBox noDrag"><span className="navHome">DEFISTATION</span> &gt; <span className="navDefiName">{defiName}</span></div>
            {/* <TotalValue />
            <MiniCards />
            <Banner />
            <DefiList />
            <Footer /> */}
        </div>
    );
})

export default DefiDetail;
