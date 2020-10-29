import React, { Component, Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
// import ReactTooltip from 'react-tooltip';
// import useStores from '../../useStores';

import defistationLogo from "../../assets/images/defistation_logo@2x.png";
import defistationLogoAlpha from "../../assets/images/defistation_logo_alpha.svg";

// import Chart from "react-google-charts";
// import * as Icon from 'react-feather';
// import chainConfig from '../../chainConfig.json';

// import qrcode from '../../assets/images/cosmos/qr-code@2x.png';
// // import cosmosSymbol from "../../assets/images/cosmos/symbol/atom-ic@2x.png";
// // import kavaSymbol from "../../assets/images/cosmos/symbol/kava-token-img@2x.png";

// const cosmosSymbol = React.lazy(() => import('../../assets/images/cosmos/symbol/' + chainConfig[0].tokenIcon));
// const irisSymbol = React.lazy(() => import('../../assets/images/cosmos/symbol/' + chainConfig[1].tokenIcon));
// const kavaSymbol = React.lazy(() => import('../../assets/images/cosmos/symbol/' + chainConfig[2].tokenIcon));
// const bandSymbol = React.lazy(() => import('../../assets/images/cosmos/symbol/' + chainConfig[3].tokenIcon));
// const iovSymbol = React.lazy(() => import('../../assets/images/cosmos/symbol/' + chainConfig[4].tokenIcon));

// import 'react-responsive-modal/styles.css';
// import { Modal } from 'react-responsive-modal';   // https://github.com/pradel/react-responsive-modal
// import Step from '../popup/Step';

// // import '../../../App.css';

// // import cosmosChainSymbol from '../../assets/images/cosmos/symbol/sym_cosmos_img@2x.png';
// // import kavaChainSymbol from '../../assets/images/cosmos/symbol/sym_kava_img@2x.png';
// // import irisChainSymbol from '../../assets/images/cosmos/symbol/sym_iris_img@2x.png';
// // import bandChainSymbol from '../../assets/images/cosmos/symbol/sym_band_img@2x.png';
// // import binanceChainSymbol from '../../assets/images/cosmos/symbol/sym_binanca_img@2x.png';
// // import iovChainSymbol from '../../assets/images/cosmos/symbol/sym_iov_img@2x.png';

// import ledgerImg from '../../assets/images/cosmos/ledger@2x.png';
// import ledgerImgEnterPinCode from '../../assets/images/cosmos/ledger_pincode.gif';
// import ledgerImgSelectChain from '../../assets/images/cosmos/ledger_chain.gif';
// import ledgerImgSign from '../../assets/images/cosmos/ledger_sign.gif';
// import ledgerImgCheck from '../../assets/images/cosmos/ledger_check.gif';

// const AtomInfoCard = React.lazy(() => import('../dashboard/atomInfoCard/AtomInfoCard'));
// const SendActionCard = React.lazy(() => import('../send/sendActionCard/SendActionCard'));
// const MyValidatorCard = React.lazy(() => import('../delegate/myValidatorCard/MyValidatorCard'));
// const ValidatorsCard = React.lazy(() => import('../delegate/validatorsCard/ValidatorsCard.js'));

const TopBar = observer((props) => {

    const location = useLocation();
    const history = useHistory();

    function movePage(path) {
        history.push(path);
    }

    useEffect(() => {

        return () => {
            console.log('cleanup');
            // clearTimeout(timer);
        };
    }, [])

    return (
        <div className="topBar">
            <ul className="topBarUl">
                <li>
                    <img src={defistationLogoAlpha} style={{"width":"260px"}} onClick={() => movePage("/")} />
                </li>
                <li><span onClick={() => movePage("/about")}>About</span></li>
                <li><span onClick={() => movePage("/projects")}>Projects</span></li>
                {/* <li><span>Apply to be listed</span></li> */}
            </ul>
        </div>
    );
})

export default TopBar;