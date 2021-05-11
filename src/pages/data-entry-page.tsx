import React from 'react'
import DataEntryContainer from '../components/home/subpages/data-entry/data-entry-container'
import {match as dataEntryMatch} from 'react-router-dom';

import '../styles/data-entry-styles/data-entry.css'
export default function DataEntryPage({match}:{match:dataEntryMatch<{matID:string, topicID:string}>}) {
    return (
        <div className='dynamic-subpage'>
            <DataEntryContainer { ...{match}}/>
        </div>
    )
}
