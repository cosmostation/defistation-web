import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
// import useStores from '../../../useStores';

import '../../App.css';

import MiniCard from './miniCard/MiniCard';

const MiniCards = observer((props) => {

    useEffect(() => {
        
        return () => {

        };
    }, [])

    return (
        <div className="miniCards">
            <ul className="miniCardUl">
                {/* <li className="miniCardList">
                    <span className="miniCardTitle">Uniswap Dominance</span>
                    <p className="miniCardDataNum">21.80%</p>
                </li> */}
                <MiniCard title="Total Value Locked (USD)" dataNum="$10.89B" />
                <MiniCard title="BSC Swap Dominance" dataNum="21.80%" />
                <MiniCard title="Total BNB Locked" dataNum="918,281" symbol="BNB" />
                <MiniCard title="TVL 1 Day (%)" dataNum="+27.72%" />
            </ul>
        </div>
    );
})

export default MiniCards;