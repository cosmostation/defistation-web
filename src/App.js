// Font
import 'typeface-montserrat';
import 'typeface-roboto';
import './App.css';

import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React, { Component, Fragment, Suspense, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';

import About from './components/about/About';
import DefiDetail from './components/defiDetail/DefiDetail';
import Main from './components/main/Main';
// Google Analytics
import ReactGA from 'react-ga';
import { Redirect } from "react-router-dom";
import TheDefiList from './components/theDefiList/TheDefiList';

// $ npm install --save typeface-montserrat
      // $ npm install --save typeface-roboto

require('typeface-rubik')   // npm install --save typeface-rubik
require('typeface-heebo')   // npm install --save typeface-heebo


    // https://github.com/react-ga/react-ga
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
