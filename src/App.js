import React, { Component, Fragment, Suspense, useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useHistory, useLocation } from 'react-router-dom';
import useStores from './useStores';

import TopBar from './components/topBar/TopBar';
import TotalValue from './components/totalValue/TotalValue';
import MiniCards from './components/miniCards/MiniCards';
import Banner from './components/banner/Banner';
import DefiList from './components/defiList/DefiList';
import Footer from './components/footer/Footer';

// require('typeface-montserrat');
import 'typeface-montserrat';
import 'typeface-roboto';

// import 

import './App.css';

const App = observer(() => {
  // inject 이름
  const { global, account } = useStores();

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    console.log('렌더링이 완료되었습니다!');

    return () => {
      console.log('cleanup');
    };
  }, []);

  return (
    <div className="wrapper">
      <TopBar />
      <TotalValue />
      <MiniCards />
      <Banner />
      <DefiList />
      <Footer />
    </div>
  );
})

export default App;
