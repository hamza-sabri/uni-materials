import React, { useContext } from 'react';
import { DynamicContentContext } from '../../../../contexts/home-context/dynamic-content-state-context';
import { cardInterface } from '../../../../interfaces/cards/cards';
import '../../../../styles/viewer/cards-viewer/cards-viewer.css';
import MaterialCard from './material-card';
import { cretateTopics, manualEntryRoute, updatematerialsRoute, updateTopic } from '../../../../constants/pages-route';
import { match as cardsViewerMatch } from 'react-router-dom';
export default function CardsViewer({ match }: { match: cardsViewerMatch<any> }) {
	const { materialsTable } = useContext(DynamicContentContext);

	
	const updateMatirealsCards = (): cardInterface[] => {
		const result: cardInterface[] = [];
		for (let [ key, value ] of Object.entries(materialsTable)) {
			const data: any = value;
			result.push({
				cardPhoto: data.materialPhoto,
				cardRate: data.totalRate,
				cardTitle: data.materialName,
				cardID: key,
				routeTo: `${manualEntryRoute}/${key}`
			});
		}
		return result;
	};

	const createTopicsCards = (): cardInterface[] => {
		const result: cardInterface[] = [];
		for (let [ key, value ] of Object.entries(materialsTable)) {
			const data: any = value;
			result.push({
				cardPhoto: data.materialPhoto,
				cardRate: data.totalRate,
				cardTitle: data.materialName,
				cardID: key,
				routeTo: `${updateTopic}/${key}`
			});
		}
		return result;
	};

	const urlHandler = (): cardInterface[] => {
		const url: string = match.url;
		switch (url) {
			case updatematerialsRoute: return updateMatirealsCards();
			case cretateTopics: return createTopicsCards();

			default: return [];
		}
	};

	const data: cardInterface[] = urlHandler();

	return (
		<div className="cards-viewer">
			<div className="space" />
			{data.map((card, index) => <MaterialCard key={index} {...card} />)}
			<div className="down-space" />
		</div>
	);
}
