import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
// import useStores from '../../../useStores';

// import 'react-responsive-modal/styles.css';
// import { Modal } from 'react-responsive-modal';   // https://github.com/pradel/react-responsive-modal
// import Step from '../../popup/Step';
// import chainConfig from '../../../chainConfig.json';
// import { numberWithCommas, capitalize, textEllipsis2, replaceAll, isNumeric, testAlert } from '../../../util/Util';

// import Big from 'big.js';

import '../../../App.css';

// import ledgerImg from '../../../assets/images/cosmos/ledger@2x.png';
// import ledgerImgEnterPinCode from '../../../assets/images/cosmos/ledger_pincode.gif';
// import ledgerImgSelectChain from '../../../assets/images/cosmos/ledger_chain.gif';
// import ledgerImgSign from '../../../assets/images/cosmos/ledger_sign.gif';

// import ledgerLoader from '../../../assets/images/cosmos/ledger-loader.gif';
// import ledgerConnect from '../../../assets/images/cosmos/ledger-connect.gif';

// // Ledger
// import CosmosApp from "ledger-cosmos-js";
// import TransportWebUSB from "@ledgerhq/hw-transport-webusb";	// 웹용(Mac) 최근
// import TransportWebHID from "@ledgerhq/hw-transport-webhid";			// 웹용(Windows)
// import secp256k1 from "secp256k1";
// import crypto from "crypto-js";

const ConnectBtn = observer((props) => {

    useEffect(() => {
        
        return () => {

        };
    }, [])

    return (
        <div className="tvlLinkBox" onClick={() => window.open(props.goPage, "_blank")}>
            <ul className="tvlLinkBoxUl">
                <li>
                    <img src={props.icon} width="38px" />
                </li>
                <li>
                    <span className="linkBoxTitle">{props.title}</span><br />
                    <span className="linkBoxSubTitle">{props.subTitle}</span>
                </li>
            </ul>
        </div>
    );
})

export default ConnectBtn;