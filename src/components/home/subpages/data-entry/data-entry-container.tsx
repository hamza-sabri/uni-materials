import React, { Fragment, useEffect, useRef } from 'react';
import addByBookImg from '../../../../assets/data-entry-assets/book-entry.svg';
import manualAddingImg from '../../../../assets/data-entry-assets/manual-entry.svg';
import { bookEntryRoute, manualEntryRoute } from '../../../../constants/pages-route';
import DataEntryMethods from './data-entry-methods';
import { match as dataEntryMatch } from 'react-router-dom';
import coolestThingEver from '../../../../assets/data-entry-assets/coolest_thing_ever.json';
import ResMethods from './res-methods';
import { resMethodsInterface } from '../../../../interfaces/res/res-interface';
// TODO:
/* call this big boy with some props so you can check later on
 if the values are not undefined then it means we have some context 
 for this data entry process thus a meterial or a topic
 thus you can call the data entry method in a more genaric way */

export default function DataEntryContainer({ match }: { match: dataEntryMatch<{ matID: string; topicID: string }> }) {
	const { matID, topicID } = match.params;
	const dataEntryMessage: string = 'Data Entry Methods';
	const resEntryMessage: string = 'Resorses Entry Methods';
	const pdfRef = useRef<HTMLDivElement>(null);
	const pdfRefs = useRef<HTMLDivElement>(null);

	const normalDataMethods = () => {
		return (
			<Fragment>
				<DataEntryMethods alt="book" img={addByBookImg} method="Add By Book" routeTo={bookEntryRoute} />
				<DataEntryMethods alt="manual" img={manualAddingImg} method="Add Manually" routeTo={manualEntryRoute} />
			</Fragment>
		);
	};

	const topicRes = () => {
		const refs: resMethodsInterface[] = [
			{ divRef: pdfRefs, resType: 'PDFs', anim:coolestThingEver, action:()=>{console.log('hello')}},
			{ divRef: pdfRef, resType: 'PDF2', anim:coolestThingEver, action:()=>{console.log('hello2')}},
		];
		return refs.map((current,index) => <ResMethods {...current} key={index}/>);
	};

	return (
		<div className="data-entry-container">
			<div className="methods-header">{topicID ? resEntryMessage : dataEntryMessage}</div>
			{topicID ? topicRes() : normalDataMethods()}
		</div>
	);
}
