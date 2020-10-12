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
            <span className="miniCardTitle">BSC Swap Dominance</span>
            <p className="miniCardDataNum">21.80%</p>
        </li>
    );
})

export default MiniCard;