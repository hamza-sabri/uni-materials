import React, { useContext, useState } from 'react';
import CardCreateor from '../components/home/subpages/data-entry/add-manually';
import { match as matchType } from 'react-router-dom';
import { DynamicContentContext } from '../contexts/home-context/dynamic-content-state-context';
import { addResMethods, updateTopic } from '../constants/pages-route';

export default function AddManuallyPage({ match }: { match: matchType<any> }) {
	let inputs = [ 'Material Name', 'Material Image', 'Material Number' ];
	let descriptionInput = 'Describe the Material';
	let values: string[] = [];
	const { materialsTable } = useContext(DynamicContentContext);
	const { id } = match.params;
	let rate:number = 5;
	const basicTopicRoute:string = `${addResMethods}/${id}`;
	const [resRoute, setResRoute] = useState<string>(basicTopicRoute);


	// TODO
	// check if the match parameters have an ID, and if they do
	// get the values of that ID and send them as values to the next child
	// then display the values thier
	const updateUI = () => {
		if(match.url.includes(updateTopic)){
			inputs =[ 'Topic Name', 'Topic Image' ];
			descriptionInput = 'Describe the Topic';
		}
		else if (id) {
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

	console.log('123-materialsTable', materialsTable);
	

	updateUI();
	return (
		<div className="dynamic-subpage">
			<CardCreateor {...{ inputs, descriptionInput, values, localMaterialID:id, rate, resRoute, setResRoute }} />
		</div>
	);
}
