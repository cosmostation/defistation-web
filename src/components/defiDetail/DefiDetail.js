import React, { Component, Suspense, useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import { numberWithCommas, capitalize, replaceAll } from '../../util/Util';

import '../../App.css';

import TopBar from '../topBar/TopBar';
import TotalValue from '../totalValue/TotalValue';
import MiniCards from '../miniCards/MiniCards';
import DefiOverview from '../defiOverview/DefiOverview';
import DefiDetailList from '../defiDetailList/DefiDetailList';
import Footer from '../footer/Footer';

const DefiDetail = observer(() => {

    const location = useLocation();

    const [defiName, setDefiName] = useState("");
    // const [invalidNameFlag, setInvalidNameFlag] = useState(false);

    useEffect(() => {
        //   console.log('렌더링이 완료되었습니다!');

        // 현재 페이지 url 이름 파악하기 defiName

        // if ((location.pathname).includes("pancake")) {
        //     setDefiName("pancake");
        // } else if ((location.pathname).includes("bscswap")) {
        //     setDefiName("bscswap");
        // } else if ((location.pathname).includes("beefyfinance")) {
        //     setDefiName("beefyfinance");
        // }

        if (location.pathname == "/pancake") {
            setDefiName("pancake");
        } else if (location.pathname == "/bscswap") {
            setDefiName("bscswap");
        } else if (location.pathname == "/beefyfinance") {
            setDefiName("beefyfinance");
        } else {
            // NotFound
            // setInvalidNameFlag(true);
        }

        return () => {
            console.log('cleanup');
        };
    }, [])

    return (
        <>
            <div className="wrapper" style={defiName != "" ? undefined : {display: "none"}}>
                <TopBar />
                <div className="navBox noDrag"><span className="navHome">DEFISTATION</span> &gt; <span className="navDefiName">{defiName}</span></div>
                <TotalValue defiName={defiName} />
                <MiniCards defiName={defiName} />
                <DefiOverview defiName={defiName} />
                <DefiDetailList />
                <Footer />
            </div>
            <div id="wrapper" style={defiName == "" ? undefined : {display: "none"}}>
                <div className="notFound" style={defiName == "" ? {display: "block"} : {display: "none"}}>
                    <h1>404</h1>
                    <div>
                        <h3>This page could not be found</h3>
                    </div>
                </div>
            </div >
        </>
    );
})

export default DefiDetail;
