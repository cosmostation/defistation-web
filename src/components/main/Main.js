import React, { Component, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';

import '../../App.css';

import TopBar from '../topBar/TopBar';
import TotalValue from '../totalValue/TotalValue';
import MiniCards from '../miniCards/MiniCards';
import Banner from '../banner/Banner';
import DefiList from '../defiList/DefiList';
import Footer from '../footer/Footer';

const Main = observer(() => {

    useEffect(() => {
        //   console.log('렌더링이 완료되었습니다!');

        return () => {
            console.log('cleanup');
        };
    }, [])

    return (
        <div className="wrapper">
            <TopBar />
            <TotalValue defiName="DeFi" />
            <MiniCards defiName="DeFi" />
            <Banner />
            <DefiList />
            <Footer />
        </div>
    );
})

export default Main;
