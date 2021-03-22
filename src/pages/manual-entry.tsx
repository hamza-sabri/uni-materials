import React, { useContext } from 'react';
import CardCreateor from '../components/home/subpages/data-entry/add-manually';
import { match as matchType } from 'react-router-dom';
import { DynamicContentContext } from '../contexts/home-context/dynamic-content-state-context';

export default function AddManuallyPage({ match }: { match: matchType<{ id: string }> }) {
	const inputs = [ 'Material Name', 'Material Image', 'Material Number' ];
	const descriptionInput = 'Describe the Material';
	let values: string[] = [];
	const { materialsTable } = useContext(DynamicContentContext);
	const { id } = match.params;
	let rate:number = 5;

	// TODO
	// check if the match parameters have an ID, and if they do
	// get the values of that ID and send them as values to the next child
	// then display the values thier
	const update = () => {
		if (id) {
			values = [];
			const material = materialsTable[id];
			if (material) {
				values.push(material.materialName);
				values.push(material.materialPhoto);
				values.push(material.materialNumber);
				rate = material.totalRate;
			}
		}
	};

	update();
	return (
		<div className="dynamic-subpage">
			<CardCreateor {...{ inputs, descriptionInput, values, localMaterialID:id, rate }} />
		</div>
	);
}
