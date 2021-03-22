import React from 'react';
import CardsViewer from '../components/home/subpages/viewer/view-page';
import '../styles/shared-styles/page.css';
import {match as viewPageMatch} from 'react-router-dom';
export default function ViewerPage({match}:{match: viewPageMatch<any>}) {
	return (
		<div className="viewer-page dynamic-subpage">
			<CardsViewer {...{match}}/>
		</div>
	);
}
