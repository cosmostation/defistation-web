import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import useStores from '../../useStores';

import '../../App.css';

import MiniCard from './miniCard/MiniCard';

const MiniCards = observer((props) => {
    const { global } = useStores();

    const [miniCardTitle3, setMiniCardTitle3] = useState();
    const [miniCardData3, setMiniCardData3] = useState();

    useEffect(() => {
        console.log("props.defiName: ", props.defiName);

        if (props.defiName == "DeFi") {
            setMiniCardTitle3("Project");
            setMiniCardData3(3);
        } else {
            setMiniCardTitle3("Supply Locked (%)");
            //props.defiName 에 따라 다른 데이터 넣으면 됨
            setMiniCardData3("3.04%");
        }
        
        return () => {

        };
    }, [props.defiName])

    return (
        <div className="miniCards">
            <ul className="miniCardUl">
                <MiniCard title="Total Value Locked (USD)" dataNum={global.totalValueLockedUsd} />
                <MiniCard title="Total BNB Locked" dataNum="0" symbol="BNB" />
                <MiniCard title={miniCardTitle3} dataNum={miniCardData3} />
                <MiniCard title="TVL 1 Day (%)" dataNum="+00.00%" />
            </ul>
        </div>
    );
})

export default MiniCards;