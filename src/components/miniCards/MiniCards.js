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
                <MiniCard />
                <MiniCard />
                <MiniCard />
                <MiniCard />
            </ul>
        </div>
    );
})

export default MiniCards;