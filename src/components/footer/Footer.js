import React, { Fragment, Suspense, useState, useEffect } from "react";
import  ReactDOM from 'react-dom';
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';    // https://github.com/jaketrent/react-social-icons
// import useStores from '../../../useStores';

import '../../App.css';

const Footer = observer((props) => {

    useEffect(() => {

        return () => {

        };
    }, [])

    return (
        <div className="footer">
            <SocialIcon url="https://twitter.com/defistationio" target="_blank" bgColor="#77808f" style={{ height: 25, width: 25, marginRight:"20px" }} />
            <SocialIcon url="https://github.com/cosmostation" target="_blank" bgColor="#77808f" style={{ height: 25, width: 25, marginRight:"20px" }} />
            <SocialIcon url="https://medium.com/cosmostation" target="_blank" bgColor="#77808f" style={{ height: 25, width: 25 }} />

            <p>Powered By Cosmostation © 2020 COSMOSTATION</p>
        </div>
    );
})

export default Footer;