import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';

import '../../../App.css';

const MiniCard = observer((props) => {
    useEffect(() => {
        return () => {

        };
        //  props.dataNum
    }, [])

    return (
        <li className="miniCardList">
            <span className="miniCardTitle">{props.title}</span>
            {props.data24hChange}
            <p style={props.symbol == "BNB" ? undefined : { display: "none" } }  className="miniCardDataNum">{props.dataNum} <span style={{"color":"#f0b923"}}>BNB</span></p>
            <p style={props.symbol == "BNB" ? { display: "none" } : undefined }  className="miniCardDataNum">{props.dataNum}</p>
        </li>
    );
})

export default MiniCard;