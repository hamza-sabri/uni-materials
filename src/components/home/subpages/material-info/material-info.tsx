import { useContext, useEffect, useRef, useState } from 'react';
import { match as infoPageMatch } from 'react-router-dom';
import MaterialCard from "./../viewer/material-card";
import TopicCard from "./../viewer/topic-card";
import { APIsCaller } from './../../../../requestes/apis-caller'
import { deleteTopic, getAllTopics } from './../../../../requestes/material-requests/mateirla';
import { DynamicContentContext } from './../../../../contexts/home-context/dynamic-content-state-context';
import loadMoreIcon from '../../../../assets/material-info-assets/load-more-icon.json';
import loadingIcon from '../../../../assets/material-info-assets/loading_icon.json';
import lottie, { AnimationItem } from 'lottie-web';
import { allTopicRes, updateTopic } from '../../../../constants/pages-route';


import './../../../../styles/materials-info/materials-info.css';
import Swal from 'sweetalert2';

interface LooseObject {
    [key: string]: any
}

export default function MaterialInfo({ match }: { match: infoPageMatch<{ matID: string }> }) {
	const materialID = match.params.matID;
	const TOPIC_SEGEMENT_LENGTH = 11; // how many topic in each page (initial viwed topics count and how many to add each load more click).

	const { materialsTable, setDtaToSearchIn, searchResult } = useContext(DynamicContentContext);

	const [allTopics, setAllTopics] = useState([]);
	const [topicsToDisplay, setTopicsToDisplay] = useState<any[]>([]);
	const [nextTopicsIndex, setNextTopicsIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [topicsFound, setTopicsFound] = useState(true);
	const [maxNumToDisplay, setMaxNumToDisplay] = useState(-1)

	const loadMoreDivRef = useRef(null);
	const loadingDivRef = useRef(null);

	let material = materialsTable[materialID];
	let [loadMoreAnimation, setLoadMoreAnimation] = useState<AnimationItem>();
	let [loadingAnimation, setLoadingAnimation] = useState<AnimationItem>();

	// helllllllllllllllllllllllllllllo, plz rename
	let addNewSetOfTopicsToDisplay = (allTopics: any, length: number = TOPIC_SEGEMENT_LENGTH) => {
		console.log("addnewItems", nextTopicsIndex + length);

		let newTopics: any[] = [];
		// loop for either what the pagenation allows detrmianed by the value of [nextTopicsIndex + length]
		// or for the length of the data you can show detrminded by the value of [maxNumToDisplay]
		// maxNumToDisplay: can take the value of allTopics.length if there is no search operation is done(empty search bar)
		// otherwise it will take the value of the length of the search result length.
		for (var i = 0; newTopics.length < (nextTopicsIndex + length) && newTopics.length < maxNumToDisplay; i++) {
			let topicObj: LooseObject = Object.entries(allTopics)[i][1] as LooseObject;
			topicObj.cardID = Object.entries(allTopics)[i][0];
			if (searchResult && searchResult.includes(Object.entries(allTopics)[i][0])) {
				newTopics.push(Object.assign({}, topicObj));
			} else if (!searchResult) {
				newTopics.push(Object.assign({}, topicObj))
			}
		}
		setTopicsToDisplay(newTopics);
		setNextTopicsIndex(nextTopicsIndex + length);
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

			// guess what this line of code does, and you will win the "I can read code" grand prize.
			setMaxNumToDisplay(Object.keys(allTopics).length);

			// set search bar context.
			setDtaToSearchIn(Object.entries(allTopics).map((item: any) => {
				return { key: item[1].topicName.replace(' ', ''), value: item[0] }
			}));
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

	useEffect(() => {
		if (allTopics.length != 0) {
			if (searchResult != undefined) {
				setMaxNumToDisplay(() => searchResult.length);
			} else {
				setNextTopicsIndex(0);
				setMaxNumToDisplay(() => Object.entries(allTopics).length);
			}
		}
	}, [searchResult])

	useEffect(() => {
		if (allTopics.length != 0) {
			addNewSetOfTopicsToDisplay(allTopics);
		} else {
			setNextTopicsIndex(0);
		}
	}, [maxNumToDisplay])

	let deleteTopicFun = async (cardID: any) => {
		const requestParams = { materialID: materialID, topicID: cardID };
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
			showLoaderOnConfirm: true,
		}).then(async (result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "Deleting Topic",
					text: "Please Wait...",
					didOpen: async () => {
						Swal.showLoading();
						let res = await APIsCaller({ api: deleteTopic, requestParams });
						Swal.hideLoading();
						removeFromAllTopics(cardID);
						if (res.status === 200) {
							// after deleting completed
							Swal.fire(
								'Deleted!',
								res.data.message,
								'success'
							)
						} else {
							Swal.fire({
								icon: 'error',
								title: 'Oops...',
								text: 'Something went wrong!',
								footer: '<a href>Please Try Agian</a>'
							})
						}

					}
				})
			}
		})
	}

	// 
	let removeFromAllTopics = (topicID: any) => {
		delete allTopics[topicID];
		setAllTopics(() => allTopics);
		localStorage.setItem('currentTopics', JSON.stringify({ id: materialID, topics: allTopics }) as any)
		addNewSetOfTopicsToDisplay(allTopics, nextTopicsIndex);
	}

	let editTopicFun = (history: any, cardID: any, cardTitle: any, cardPhoto: any, topicDes: any) => {
		history.push(updateTopic, { materialID: materialID, topicID: cardID, name: cardTitle, photo: cardPhoto, description: topicDes })
	}

	let bodyTopicFun = (history: any, cardID: any, cardTitle: any, cardPhoto: any, cardRate: any, topicDes: any) => {
		history.push(`${allTopicRes}/${materialID}/${cardID}`, { title: cardTitle, photo: cardPhoto, rate: cardRate, description: topicDes })
	}

	let onClickHandlers = {
		delete: deleteTopicFun,
		edit: editTopicFun,
		body: bodyTopicFun
	}

	let allCards = () => {
		return (
			(searchResult?.length !== 0 && topicsFound) ?
				topicsToDisplay.map((topic: any, index) => {
					return <TopicCard key={index}
						cardID={topic.cardID}
						cardTitle={topic.topicName || material.materialName}
						cardPhoto={topic.topicPhoto || material.materialPhoto}
						cardRate={topic.topicRate || material.totalRate}
						description={topic.description || material.materialDesc || "No Description"}
						onClickHandlers={{...onClickHandlers}}
						routeTo={allTopicRes} />
				})
				: <p>No Topics Found</p>
		)
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
							: allCards()
					}

					{
						(nextTopicsIndex < maxNumToDisplay) ?
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