import React, { Fragment, useRef } from 'react';
import addByBookImg from '../../../../assets/data-entry-assets/book-entry.svg';
import manualAddingImg from '../../../../assets/data-entry-assets/manual-entry.svg';
import { bookEntryRoute, manualEntryRoute } from '../../../../constants/pages-route';
import DataEntryMethods from './data-entry-methods';
import { match as dataEntryMatch } from 'react-router-dom';
import pdfAnimation from '../../../../assets/data-entry-assets/pdf-animation.json';
import qAndA from '../../../../assets/data-entry-assets/Q-and-A.json';
import videoAnimatedIcon from '../../../../assets/data-entry-assets/video-animated-icon.json';
import ResMethods from './res-methods';
import { resMethodsInterface } from '../../../../interfaces/res/res-interface';
import { addPDFResCode, addQAndAResCode, addVideoResCode } from '../../../../constants/action-cods';

// TODO:
/* call this big boy with some props so you can check later on
 if the values are not undefined then it means we have some context 
 for this data entry process thus a meterial or a topic
 thus you can call the data entry method in a more genaric way */

export default function DataEntryContainer({ match }: { match: dataEntryMatch<{ matID: string; topicID: string }> }) {
	const { matID, topicID } = match.params;
	const dataEntryMessage: string = 'Data Entry Methods';
	const resEntryMessage: string = 'Resources Entry Methods';
	const pdfRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLDivElement>(null);
	const QARef = useRef<HTMLDivElement>(null);

	const normalDataMethods = () => {
		return (
			<Fragment>
				<DataEntryMethods alt="book" img={addByBookImg} method="Add By Book" routeTo={bookEntryRoute} />
				<DataEntryMethods alt="manual" img={manualAddingImg} method="Add Manually" routeTo={manualEntryRoute} />
			</Fragment>
		);
	};

	const topicRes = () => {
		const resRefs: resMethodsInterface[] = [
			{ divRef: pdfRef, resType: 'PDFs', anim: pdfAnimation, action: addPDFResCode },
			{ divRef: videoRef, resType: 'Vidoes', anim: videoAnimatedIcon, action: addVideoResCode },
			{ divRef: QARef, resType: 'Q & A', anim: qAndA, action: addQAndAResCode }
		];
		return resRefs.map((current, index) => <ResMethods {...current} key={index} />);
	};

	return (
		<div className="data-entry-container">
			<div className="methods-header">{topicID ? resEntryMessage : dataEntryMessage}</div>
			{topicID ? topicRes() : normalDataMethods()}
		</div>
	);
}
