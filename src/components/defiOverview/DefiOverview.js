import React, { Fragment, Suspense, useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import ShowMoreText from 'react-show-more-text';    // https://www.npmjs.com/package/react-show-more-text

import defistationApplicationList from "../../defistationApplicationList.json";

import '../../App.css';

const DefiOverview = observer((props) => {

    const [overviewTag, setOverviewTag] = useState();

    function findDescription(defiName) {
        // defistationApplicationList 에서 Official Project Name 이 defiName와 일치하는 것 찾기

        // 예외처리
        if (defiName == "pancake") {
            defiName = "PancakeSwap";
        }

        let result = "";
        for (var i = 0; i < defistationApplicationList.length; i++) {
            if (defistationApplicationList[i]["Official Project Name"] == defiName) {
                result = defistationApplicationList[i]["Detailed Project Description"];
                // Audit 정보에 https 가 포함 있으면 Description 아래에 추가
                // if (defistationApplicationList[i]["Security Information"] != undefined) {
                //     if (defistationApplicationList[i]["Security Information"].indexOf("https://") != -1) {
                //         result += "\n\n" + defistationApplicationList[i]["Security Information"];
                //     }
                // }
                break;
            }
        }
        return result;
    }

    useEffect(() => {
        // defistationApplicationList

        // if (props.defiName =)
        let overviewStr = findDescription(props.defiName);

        setOverviewTag(
            // <div className="defiOverview">
            //     <p className="defiOverviewContent">
            //         {overviewStr}
            //     </p>
            // </div>
            <div className="defiOverview">
                <ShowMoreText
                    /* Default options */
                    lines={6}
                    more='Show more'
                    less='Show less'
                    className='defiOverviewShowMoreText'
                    anchorClass='my-anchor-css-class'
                    expanded={false}
                >
                    {overviewStr}
                </ShowMoreText>
            </div>
        );

        return () => {

        };
    }, [props.defiName])

    return (
        <>
            {overviewTag}
        </>
    );
})

export default DefiOverview;