import React from 'react';
import CardCreateor from '../components/home/subpages/data-entry/add-manually';

export default function AddManuallyPage() {
	const inputs = ['Material Name','Material Image','Material Number']
	const descriptionInput = 'Describe the Material'
	return (
		<div className="dynamic-subpage">
			<CardCreateor {...{inputs, descriptionInput}}/>
		</div>
	);
}
