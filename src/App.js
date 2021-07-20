import React, { Component, Fragment, Suspense, useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useHistory, useLocation } from 'react-router-dom';

import Main from './components/main/Main';
import DefiDetail from './components/defiDetail/DefiDetail';
import About from './components/about/About';
import TheDefiList from './components/theDefiList/TheDefiList';

// Font
import 'typeface-montserrat';   // $ npm install --save typeface-montserrat
import 'typeface-roboto';       // $ npm install --save typeface-roboto

require('typeface-rubik')   // npm install --save typeface-rubik
require('typeface-heebo')   // npm install --save typeface-heebo

import './App.css';

// Google Analytics
import ReactGA from 'react-ga';     // https://github.com/react-ga/react-ga
if (process.env.NODE_ENV === "production") {
    ReactGA.initialize('UA-181754248-1');
}

const App = observer(() => {
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        return () => {
            console.log('cleanup');
        };
    }, []);

    return (
        <>
            <Suspense fallback={<div></div>}>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/about" component={About} />
                    <Route path="/projects" component={TheDefiList} />
                    <Route path="/:defiName" component={DefiDetail} />
                    <Route exact path="/docs.html">
                        <Redirect push to={"/docs.html"} />
                    </Route> 
                </Switch>
            </Suspense>
        </>
    );
})

export default App;
