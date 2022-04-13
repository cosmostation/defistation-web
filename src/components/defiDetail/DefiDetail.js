import '../../App.css';

import React, { Component, Suspense, useEffect, useState } from "react";
import { inject, observer } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';

import DefiDetailList from '../defiDetailList/DefiDetailList';
import DefiOverview from '../defiOverview/DefiOverview';
import Footer from '../footer/Footer';
import MiniCards from '../miniCards/MiniCards';
import MobileDefiBtns from '../mobileDefiBtns/MobileDefiBtns';
import ReactGA from "react-ga";
import TopBar from '../topBar/TopBar';
import TotalValue from '../totalValue/TotalValue';
import useStores from '../../useStores';

const DefiDetail = observer(() => {
    const { global } = useStores();

    const location = useLocation();
    const history = useHistory();

    const [responseError, setResponseError] = useState();

    const [urlPathName, setUrlPathName] = useState();
    const [defiName, setDefiName] = useState("");

    async function checkValidDefiName() {
        const res = await fetch(global.defistationApiUrl + "/defiNames", {
            method: 'GET',
            headers: {
                Authorization: global.auth
            }
        });
        res
            .json()
            .then(res => {
                // console.log("res: ", res);

                for (var i = 0; i < res.length; i++) {
                    // res[i] 에 기호, 공백 제거하고 소문자로 변경하기
                    let tempDefiName = res[i];
                    
                    // 기호, 공백 제거(url 용도)
                    tempDefiName = tempDefiName.replace(/[.\s]/g,'');
                    tempDefiName = tempDefiName.toLowerCase();

                    // DB에 해당 pathname 이름이 존재한다.
                    if (location.pathname == "/" + tempDefiName) {
                        setDefiName(res[i]);    // 실제 이름
                        setUrlPathName(tempDefiName);   // url 용 이름
                        break;
                    }
                }
            })
            .catch(err => setResponseError(err));
    }

    function movePage(path) {
        history.push(path);
    }

    useEffect(() => {
        checkValidDefiName();

        // Google Analytics
        if (process.env.NODE_ENV === "production") ReactGA.pageview(window.location.pathname + window.location.search);

        return () => {
            console.log('cleanup');
        };
    }, [])

    return (
        <>
            <div className="wrapper" style={defiName != "" ? undefined : {display: "none"}}>
                <TopBar />
                <TotalValue defiName={defiName} />
                <MobileDefiBtns defiName={defiName} />
                <MiniCards defiName={defiName} />
                <DefiOverview defiName={defiName} />
                <DefiDetailList defiName={defiName} />
                <Footer />
            </div>
        </>
    );
})

export default DefiDetail;
