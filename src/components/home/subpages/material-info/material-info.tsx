import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { match as infoPageMatch } from 'react-router-dom';
import MaterialCard from "./../viewer/material-card";
import TopicCard from "./../viewer/topic-card";
import { DynamicContentContext } from './../../../../contexts/home-context/dynamic-content-state-context';

import './../../../../styles/materials-info/materials-info.css';

// 	materialName: "Bashar (23)"
// materialNumber: "98129837129"
// materialPhoto: "https://scontent.ftlv13-1.fna.fbcdn.net/v/t1.0-9/101747520_3488375791245532_1863491575640752128_o.jpg?_nc_cat=101&ccb=1-3&_nc_sid=e3f864&_nc_ohc=RKUB55cmJ3EAX_t73rl&_nc_ht=scontent.ftlv13-1.fna&oh=155c3be30eef75c4c19198b056e99515&oe=60815E10"
// totalRate: 5

export default function MaterialInfo({ match }: { match: infoPageMatch<{ matID: string }> }) {
	const materialID = match.params.matID;
	const { materialsTable } = useContext(DynamicContentContext);

	const [allTopics, setAllTopics] = useState([]);
	const [topicsToDisplay, setTopicsToDisplay] = useState([]);
	const [nextTopicsIndex, setNextTopicsIndex] = useState(0);

	let material = materialsTable[materialID];
	// disblay waiting for conext result
	// show spining circle, a moneky eating a banana or a cat photo anything.
	if (!material) {
		// show material not found or something.
		return (
			<p>
				Material Not Found :)
			</p>
		)
	}

	useEffect(() => {
		setAllTopics();
	}, []);

	let getDesc = () => { return "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quo eius sint officiis, laudantium unde non aliquam voluptatem recusandae fugit vero veniam! Doloribus odio id minus sunt quisquam beatae ut." };

	let desc = getDesc(); // material.decription

	let getTopics = () => [material, material, material, material, material, material, material, material, material, material, material, material, material, material, material,];
	let topics = getTopics();

	return (
		<div id="materials-info-container">
			<div id="material-card">
				<MaterialCard cardTitle={material.materialName} cardPhoto={material.materialPhoto} cardRate={material.totalRate} />
			</div>
			<div id="desc">
				<p id="desc-title">Description: </p>
				<p id="desc-text">{desc}</p>
			</div>
			<div id="topics-contianer">
				<p>Topics: </p>
				<div id="topics">
					{
						topicsToDisplay.map((topic: any) => {
							return <TopicCard cardTitle={topic.materialName} cardPhoto={topic.materialPhoto} cardRate={topic.totalRate} />
						})
					}
				</div>
				<button className="load-more-btn">load More...</button>
			</div>
		</div>

	);
}
