import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import { numberWithCommas, capitalize, replaceAll, getCurrencyUnit, getCurrencyDigit } from '../../../util/Util';

import '../../../App.css';

const MiniCard = observer((props) => {
    // const [miniCardTag, setMiniCardTag] = useState();

    useEffect(() => {
        // if (props.symbol == "BNB") {
        //     if (props.dataNum > 0) {
        //         setMiniCardTag(<p className="miniCardDataNum">{props.dataNum} <span style={{"color":"#f0b923"}}>BNB</span></p>);
        //     } else {
        //         setMiniCardTag(<p className="miniCardDataNum">-</p>);
        //     }
        // } else {
        //     setMiniCardTag(<p className="miniCardDataNum">{props.dataNum}</p>);
        // }

        console.log("[0428] 테스트 22222 props.dataNum: ", props.dataNum);

        return () => {

        };
        //  props.dataNum
    }, [])

    return (
        <li className="miniCardList">
            <span className="miniCardTitle">{props.title}</span>
            {/* {props.data24hChange} */}
            {
                props.symbol == "BNB" && props.dataNum > 0 ? props.data24hChange : undefined
            }
            {props.trendingDefiName}
            {/* <p style={props.symbol == "BNB" ? undefined : { display: "none" } }  className="miniCardDataNum">{props.dataNum} <span style={{"color":"#f0b923"}}>BNB</span></p>
            <p style={props.symbol == "BNB" ? { display: "none" } : undefined }  className="miniCardDataNum">{props.dataNum}</p> */}
            <p style={props.symbol == "BNB" && props.dataNum > 0 ? undefined : { display: "none" } }  className="miniCardDataNum">{numberWithCommas(props.dataNum, false)} <span style={{"color":"#f0b923"}}>BNB</span></p>
            <p style={props.symbol == "BNB" && props.dataNum == 0 ? undefined : { display: "none" } }  className="miniCardDataNum">-</p>

            <p style={props.symbol == "BNB" ? { display: "none" } : undefined }  className="miniCardDataNum">{props.dataNum}</p> 
        </li>
    );
})

export default MiniCard;