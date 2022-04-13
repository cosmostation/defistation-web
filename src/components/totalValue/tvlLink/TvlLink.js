import '../../../App.css';

import React from "react";
import { observer } from 'mobx-react';

const ConnectBtn = observer((props) => {

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