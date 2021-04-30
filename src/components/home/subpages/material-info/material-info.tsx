import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { match as infoPageMatch } from 'react-router-dom';
import MaterialCard from "./../viewer/material-card";
import TopicCard from "./../viewer/topic-card";
import { APIsCaller } from './../../../../requestes/apis-caller'
import { getAllTopics } from './../../../../requestes/material-requests/mateirla'
import { deleteTopic } from './../../../../requestes/material-requests/mateirla'
import { DynamicContentContext } from './../../../../contexts/home-context/dynamic-content-state-context';
import loadMoreIcon from '../../../../assets/material-info-assets/load-more-icon.json';
import loadingIcon from '../../../../assets/material-info-assets/loading_icon.json';
import lottie, { AnimationItem } from 'lottie-web';

import './../../../../styles/materials-info/materials-info.css';
import Swal from 'sweetalert2';

export default function MaterialInfo({ match }: { match: infoPageMatch<{ matID: string }> }) {
	const materialID = match.params.matID;
	const TOPIC_SEGEMENT_LENGTH = 11; // how many topic in each page (initial viwed topics count and how many to add each load more click).

	const { materialsTable } = useContext(DynamicContentContext);

	const [allTopics, setAllTopics] = useState([]);
	const [topicsToDisplay, setTopicsToDisplay] = useState([]);
	const [nextTopicsIndex, setNextTopicsIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [topicsFound, setTopicsFound] = useState(true);

	const loadMoreDivRef = useRef(null);
	const loadingDivRef = useRef(null);

	let material = materialsTable[materialID];
	let [loadMoreAnimation, setLoadMoreAnimation] = useState<AnimationItem>();
	let [loadingAnimation, setLoadingAnimation] = useState<AnimationItem>();

	// helllllllllllllllllllllllllllllo, plz rename
	let addNewSetOfTopicsToDisplay = (allTopics: any, length: number = TOPIC_SEGEMENT_LENGTH) => {
		setTopicsToDisplay(Object.entries(allTopics).slice(0, nextTopicsIndex + length).map((entry) => entry[1]) as any);
		setNextTopicsIndex(nextTopicsIndex + length)
	}

	useEffect(() => {
		// I think this is a bit overkill but why not :).
		// this is to retrieve suitable[topics for the current opened material] topics from local storage.
		// if the retrived topics are valid then update "allTopics" with its value.
		// else send a request to retrieve them from the database.
		if (allTopics.length == 0 || allTopics == undefined) {
			// get topics form localStorage
			let res = JSON.parse(localStorage.getItem('currentTopics') as any) || [];
			// is there is any data stored in localStorage [checked by res.length==0]
			// see if it belongs to the current opend data by comperaint materialId.
			if (res.length == 0 || res == undefined || res.id != materialID) {
				// no data or incorrecnt strored, send request.
				const getData = async () => {
					const requestParams = { materialID: materialID };
					const { data: topicsTable } = await APIsCaller({ api: getAllTopics, requestParams });
					if (topicsTable) setAllTopics(topicsTable.topicsTable);
					setLoading(false);
				};
				getData();
			} else {
				// correct data stored.
				setAllTopics(res.topics);
				setLoading(false);
			}
		}

		// loading animation for the loading animation.
		// this comment is intended to be confusing :);
		setLoadingAnimation(lottie.loadAnimation({
			container: loadingDivRef.current!,
			autoplay: true,
			renderer: 'svg',
			loop: true,
			animationData: loadingIcon,
		}));

		// delete currentTopics from localstorage, when component is unmounted. 
		return () => {
			localStorage.removeItem('currentTopics');
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

			// guess what this line of code does, and you will win the "I can read code" grand prize.
			setTopicsFound((Object.keys(allTopics).length != 0) ? true : false);

			// add the first n topics to be displied on the initial refresh,(where n=TOPIC_SEGEMENT_LENGTH).
			addNewSetOfTopicsToDisplay(allTopics);
		}
	}, [allTopics]);

	useEffect(() => {
		// loading animation for the loading more animation.
		setLoadMoreAnimation(lottie.loadAnimation({
			container: loadMoreDivRef.current!,
			autoplay: false,
			renderer: 'svg',
			loop: true,
			animationData: loadMoreIcon,
		}));
	}, [loadMoreDivRef.current])

	let deleteTopicFun = async (materialID: any, topicID: any) => {
		const requestParams = { materialID: materialID, topicID: topicID };
		const { data: topicsTable } = await APIsCaller({ api: deleteTopic, requestParams });
		removeFromAllTopics(topicID);
	}

	// Swal.showLoading
	let removeFromAllTopics = (topicID: any) => {
		delete allTopics[topicID];
		setAllTopics(() => allTopics);
		localStorage.setItem('currentTopics', JSON.stringify({ id: materialID, topics: allTopics }) as any)
		addNewSetOfTopicsToDisplay(allTopics, nextTopicsIndex);
	}

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
						(loading) ?
							<div className="loading-div" ref={loadingDivRef}></div>
							: (topicsFound) ?
								topicsToDisplay.map((topic: any, index) => {
									return <TopicCard key={index}
										materialID={materialID}
										cardID={Object.keys(allTopics)[index]}
										cardTitle={topic.topicName || material.materialName}
										cardPhoto={topic.topicPhoto || material.materialPhoto}
										cardRate={topic.topicRate || material.totalRate}
										deleteTopicFun={deleteTopicFun} />
								})
								: <p>No Topics Found</p>
					}

					{
						(nextTopicsIndex < Object.keys(allTopics).length) ?
							(<div ref={loadMoreDivRef} className="load-more-card" onClick={() => addNewSetOfTopicsToDisplay(allTopics)} onMouseEnter={() => { loadMoreAnimation!.play() }} onMouseLeave={() => { loadMoreAnimation!.stop() }}>
								{/* not the best way but it works */}
								<p>Load More</p>
							</div>)
							: null
					}
				</div>
			</div>
		</div>

	);
}