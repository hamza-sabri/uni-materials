import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { match as infoPageMatch } from 'react-router-dom';
import MaterialCard from "./../viewer/material-card";
import TopicCard from "./../viewer/topic-card";
import { APIsCaller } from './../../../../requestes/apis-caller'
import { DynamicContentContext } from './../../../../contexts/home-context/dynamic-content-state-context';

import './../../../../styles/materials-info/materials-info.css';

// 	materialName: "Bashar (23)"
// materialNumber: "98129837129"
// materialPhoto: "https://scontent.ftlv13-1.fna.fbcdn.net/v/t1.0-9/101747520_3488375791245532_1863491575640752128_o.jpg?_nc_cat=101&ccb=1-3&_nc_sid=e3f864&_nc_ohc=RKUB55cmJ3EAX_t73rl&_nc_ht=scontent.ftlv13-1.fna&oh=155c3be30eef75c4c19198b056e99515&oe=60815E10"
// totalRate: 5

let getTopics = (material:any) => [material, material, material, material, material, material, material, material, material, material, material, material, material, material, material,];
let getDesc = () => { return "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quo eius sint officiis, laudantium unde non aliquam voluptatem recusandae fugit vero veniam! Doloribus odio id minus sunt quisquam beatae ut." };


export default function MaterialInfo({ match }: { match: infoPageMatch<{ matID: string }> }) {
	const materialID = match.params.matID;
	const TOPIC_SEGEMENT_LENGTH = 10; // how many topics each load more action will be added

	const { materialsTable } = useContext(DynamicContentContext);
	let desc = getDesc(); // material.decription

	const [allTopics, setAllTopics] = useState([]);
	const [topicsToDisplay, setTopicsToDisplay] = useState([]);
	const [nextTopicsIndex, setNextTopicsIndex] = useState(0);

	// let material =	async function () {return await materialsTable[materialID];}();
	let material = materialsTable[materialID];

	// helllllllllllllllllllllllllllllo, plz rename
	let addNewSetOfTopicsToDisplay = (allTopics: any, length: number = TOPIC_SEGEMENT_LENGTH) => {
		setTopicsToDisplay(allTopics.slice(0, nextTopicsIndex + length));
		setNextTopicsIndex(nextTopicsIndex + length);

		if(nextTopicsIndex + length >= allTopics.length) {
			document.getElementById("load-more-topics-btn")!.style.display = "none";
		}
	}

	useEffect(() => {
		// I think this is a bit overkill but why not :).
		// this is to retrive sutiable topics in localstoreage.
		// if topics retrived is valid then update "allTopics" with it's value
		// else send a request to retrive data from database.
		if (allTopics.length == 0 || allTopics == undefined) {
			let res = JSON.parse(localStorage.getItem('currentTopics') as any) || [];
			if (res.length == 0 || res == undefined || res.id != materialID) {
				setAllTopics(getTopics(material) as any);
			} else {
				setAllTopics(res.topics);
			}
		}
	}, []);



	useEffect(() => {
		// this effect is entered twice when refreshing the page.
		// once on the value of allTopics is initilized to [].
		// the second when the other useEffect populates allTopics with fetched data
		// so this if statment servers as a gaurd for that.
		// note: if we found better way to handle this I'll change it, but for now i think it's working.
		if (allTopics.length != 0) {
			// store current fetched topics for if page is refresed.
			localStorage.setItem('currentTopics', JSON.stringify({ id: materialID, topics: allTopics }) as any)

			// add the first n topics to be displied on the initial refresh.
			addNewSetOfTopicsToDisplay(allTopics);
		}
	}, [allTopics]);

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
						topicsToDisplay.map((topic: any, index) => {
							return <TopicCard key={index} cardTitle={topic.materialName} cardPhoto={topic.materialPhoto} cardRate={topic.totalRate} />
						})
					}
				</div>
				<button id="load-more-topics-btn" className="load-more-btn" onClick={()=>addNewSetOfTopicsToDisplay(allTopics)}>load More...</button>
			</div>
		</div>

	);
}