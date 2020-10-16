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
                <MiniCard title="Total Value Locked (USD)" dataNum="$00.00B" />
                <MiniCard title="Total BNB Locked" dataNum="0" symbol="BNB" />
                <MiniCard title="Project" dataNum="3" />
                <MiniCard title="TVL 1 Day (%)" dataNum="+00.00%" />
            </ul>
        </div>
    );
})

export default MiniCards;