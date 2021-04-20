import React from 'react'
import {match as infoPageMatch} from 'react-router-dom';
import MaterialInfo from '../components/home/subpages/material-info/material-info'
export default function MaterialInfoPage({match}:{match: infoPageMatch<{matID:string}>}) {
    return (
        <div className="dynamic-subpage"> 
            <MaterialInfo {...{match}} />
        </div>
    )
}
