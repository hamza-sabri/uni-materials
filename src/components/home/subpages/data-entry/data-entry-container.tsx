import React from 'react';
import addByBookImg from '../../../../assets/data-entry-assets/book-entry.svg';
import manualAddingImg from '../../../../assets/data-entry-assets/manual-entry.svg';
import DataEntryMethods from './data-entry-methods';

// TODO:
/* call this big boy with some props so you can check later on
 if the values are not undefined then it means we have some context 
 for this data entry process thus a meterial or a topic
 thus you can call the data entry method in a more genaric way */

export default function DataEntryContainer() {
	return (
		<div className="data-entry-container">
			<div className="methods-header">Data Entry Methods</div>
			<DataEntryMethods alt="book adding" img={addByBookImg} method="Add By Book" routeTo="book" />
			<DataEntryMethods alt="manual adding" img={manualAddingImg} method="Add Manually" routeTo="manual" />
		</div>
	);
}
