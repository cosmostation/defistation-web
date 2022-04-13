import '../../App.css';

import React, { useEffect } from "react";

import Footer from '../footer/Footer';
import TopBar from '../topBar/TopBar';
import { observer } from 'mobx-react';

const Apply = observer(() => {
    useEffect(() => {
        
        return () => {
            console.log('cleanup');
        };
    }, [])

    return (
        <>
            <div className="wrapper">
                <TopBar />


                <Footer />
            </div>
        </>
    );
})

export default Apply;
