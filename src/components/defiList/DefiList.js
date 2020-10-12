import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useHistory, useLocation } from 'react-router-dom';
// import useStores from '../../../useStores';

import '../../App.css';

import rankIcon1 from "../../assets/images/rank1@2x.png";
import rankIcon2 from "../../assets/images/rank2@2x.png";
import rankIcon3 from "../../assets/images/rank3@2x.png";

const DefiList = observer((props) => {

    useEffect(() => {

        return () => {

        };
    }, [])

    return (
        <div className="defiList">
            <table className="defiListTable">
                <thead className="defiListTableHead">
                    <tr>
                        <th>Rank</th><th>Name</th><th>Chain</th><th>Category</th><th>Locked(USD)</th><th>1 Days</th>
                    </tr>
                </thead>
                <tbody className="defiListTableBody">
                    <tr>
                        <td><img src={rankIcon1} style={{"width":"24px", marginTop:"4px"}} /></td>
                        <td>BSC Swap</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td><img src={rankIcon2} style={{"width":"24px", marginTop:"4px"}} /></td>
                        <td>BSC Swap</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td><img src={rankIcon3} style={{"width":"24px", marginTop:"4px"}} /></td>
                        <td>BSC Swap</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>BSC Swap</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>BSC Swap</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>BSC Swap</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>BSC Swap</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>BSC Swap</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>BSC Swap</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>BSC Swap</td>
                        <td>Binance Smart Chain</td>
                        <td>Dex</td>
                        <td>$0.00B</td>
                        <td>+9.99%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
})

export default DefiList;