import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';

import '../../../App.css';

const MiniCard = observer((props) => {

    useEffect(() => {
        
        return () => {

        };
    }, [])

    return (
        <li className="miniCardList">
            <span className="miniCardTitle">{props.title}</span>
            <p className="miniCardDataNum">{props.dataNum}</p>
        </li>
    );
})

export default MiniCard;