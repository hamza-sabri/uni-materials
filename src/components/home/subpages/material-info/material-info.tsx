import {  useContext, useEffect, useRef, useState } from 'react';
import { match as infoPageMatch } from 'react-router-dom';
import MaterialCard from "./../viewer/material-card";
import TopicCard from "./../viewer/topic-card";
import { APIsCaller } from './../../../../requestes/apis-caller'
import { getAllTopics } from './../../../../requestes/material-requests/mateirla'
import { DynamicContentContext } from './../../../../contexts/home-context/dynamic-content-state-context';
import loadMoreIcon from '../../../../assets/material-info-assets/load-more-icon.json';
import lottie, { AnimationItem } from 'lottie-web';

import './../../../../styles/materials-info/materials-info.css';

export default function MaterialInfo({ match }: { match: infoPageMatch<{ matID: string }> }) {
	const materialID = match.params.matID;
	const TOPIC_SEGEMENT_LENGTH = 11; // how many topic in each page (initial viwed topics count and how many to add each load more click).

	const { materialsTable } = useContext(DynamicContentContext);

	const [allTopics, setAllTopics] = useState([]);
	const [topicsToDisplay, setTopicsToDisplay] = useState([]);
	const [nextTopicsIndex, setNextTopicsIndex] = useState(0);
	const [topicsFound, setTopicsFound] = useState(true);

	const loadMoreDivRef = useRef(null);

	let material = materialsTable[materialID];
	const [loadMoreAnimation, setLoadMoreAnimation] = useState<AnimationItem>();

	let addNewSetOfTopicsToDisplay = (allTopics: any, length: number = TOPIC_SEGEMENT_LENGTH) => {
		setTopicsToDisplay(Object.entries(allTopics).slice(0, nextTopicsIndex + length).map(entry => entry[1]) as any);
		setNextTopicsIndex(nextTopicsIndex + length);
	}

	useEffect(() => {
		setLoadMoreAnimation(lottie.loadAnimation({
			container: loadMoreDivRef.current!,
			autoplay: false,
			renderer: 'svg',
			loop: true,
			animationData: loadMoreIcon,
		}));
	}, [setLoadMoreAnimation, nextTopicsIndex]);

	useEffect(() => {
		// I think this is a bit overkill but why not :).
		// this is to retrive sutiable topics in localstoreage.
		// if topics retrived is valid then update "allTopics" with it's value
		// else send a request to retrive data from database.
		if (allTopics.length === 0 || allTopics === undefined) {
			let res = JSON.parse(localStorage.getItem('currentTopics') as any) || [];
			if (res.length === 0 || res === undefined || res.id !== materialID) {
				const getData = async () => {
					const requestParams = { materialID: materialID };
					const { data: topicsTable } = await APIsCaller({ api: getAllTopics, requestParams });
					if (topicsTable) setAllTopics(topicsTable.topicsTable);
				};
				getData();
			} else {
				setAllTopics(res.topics);
			}
		}

		// delete currentTopics from localstorage, when component is unmounted. 
		return () => {
			localStorage.removeItem('currentTopics');
		}
	}, [allTopics, materialID]);



	useEffect(() => {
		// this effect is entered twice when refreshing the page.
		// once on the value of allTopics is initilized to [].
		// the second when the other useEffect populates allTopics with fetched data
		// so this if statment servers as a gaurd for that.
		// note: if we found better way to handle this I'll change it, but for now i think it's working.
		if (allTopics.length !== 0) {
			// store current fetched topics for if page is refresed.
			localStorage.setItem('currentTopics', JSON.stringify({ id: materialID, topics: allTopics }) as any)


			setTopicsFound((Object.keys(allTopics).length !== 0) ? true : false);

			// add the first n topics to be displied on the initial refresh,(where n=TOPIC_SEGEMENT_LENGTH).
			addNewSetOfTopicsToDisplay(allTopics);
		}
	}, [allTopics, materialID, addNewSetOfTopicsToDisplay]);



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
				<p id="desc-text">{material.materialDesc || "No Description"}</p>
			</div>

			<div id="topics-section">
				<div id="topics">
					{
						(topicsFound) ?
							topicsToDisplay.map((topic: any, index) => {
								return <TopicCard key={index} cardTitle={topic.topicName || material.materialName} cardPhoto={topic.topicPhoto || material.materialPhoto} cardRate={topic.topicRate || material.totalRate} />
							})
							: <p>No Topics Found</p>
					}

					{
						(nextTopicsIndex < Object.keys(allTopics).length) ?
							(<div ref={loadMoreDivRef} className="load-more-card" onClick={() => addNewSetOfTopicsToDisplay(allTopics)} onMouseEnter={()=>{loadMoreAnimation!.play()}} onMouseLeave={()=>{loadMoreAnimation!.stop()}}></div>)
							: null
					}
				</div>
			</div>
		</div>

	);
}