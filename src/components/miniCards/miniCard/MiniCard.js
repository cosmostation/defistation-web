import React, { useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { numberWithCommas } from '../../../util/Util';

import '../../../App.css';

const MiniCard = observer((props) => {
    useEffect(() => {
        console.log("[0428] 테스트 22222 props.dataNum: ", props.dataNum);

        return () => {

        };
    }, [])

    return (
        <li className="miniCardList">
            <span className="miniCardTitle">{props.title}</span>
            {
                props.symbol == "BNB" && props.dataNum > 0 ? props.data24hChange : undefined
            }
            {
                props.symbol != "BNB" ? props.data24hChange : undefined
            }
            {props.trendingDefiName}
            <p style={props.symbol == "BNB" && props.dataNum > 0 ? undefined : { display: "none" } }  className="miniCardDataNum">{numberWithCommas(props.dataNum, false)} <span style={{"color":"#f0b923"}}>BNB</span></p>
            <p style={props.symbol == "BNB" && props.dataNum == 0 ? undefined : { display: "none" } }  className="miniCardDataNum">-</p>
            <p style={props.symbol == "BNB" ? { display: "none" } : undefined }  className="miniCardDataNum">{props.dataNum}</p> 
        </li>
    );
})

export default MiniCard;