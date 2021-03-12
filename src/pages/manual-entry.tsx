import React from 'react';
import CardCreateor from '../components/home/subpages/data-entry/add-manually';

export default function AddManuallyPage() {
	const inputs = ['Material Name','Material Image','Material Number', 'Material Name','Material Image','Material Number']
	return (
		<div className="dynamic-subpage">
			<CardCreateor {...{inputs}}/>
		</div>
	);
}
