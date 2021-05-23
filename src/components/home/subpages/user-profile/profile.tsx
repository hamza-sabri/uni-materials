import { useContext, useEffect, useRef, useState } from 'react';
import Avatar from './avatar';
import lottie from 'lottie-web';
import '../../../../styles/dynamic-content/user-profile/user-profile.css';
import loadingProfileAnim from '../../../../assets/home/profile/loading-profile.json'
import emptyProfileAnim from '../../../../assets/home/profile/empty.json'
import history from '../../../../history/credationls-history';

import { DynamicContentContext } from '../../../../contexts/home-context/dynamic-content-state-context';
import { cardInterface } from '../../../../interfaces/cards/cards';
import { materialInfoRoute, scheduleRoute } from '../../../../constants/pages-route';
import MaterialCard from '../viewer/material-card';

export default function Profile() {
	const { unisDataList, user, setUser, materialsTable, searchResult, setDtaToSearchIn } = useContext(DynamicContentContext);
	const loadingRef = useRef<HTMLDivElement>(null);
	const emptyRef = useRef<HTMLDivElement>(null);
	const emptyWrapperRef = useRef<HTMLDivElement>(null);
	const [hadShcedule, setHadShcedule] = useState<boolean>(false)
	const [dataToSearch, setDataToSearch] = useState<{key:any, value:any}[] | undefined>(undefined);
	// replace the empty div with a loading container

	useEffect(() => {
		lottie.loadAnimation({
			container: loadingRef.current!,
			autoplay: true,
			renderer: 'svg',
			loop: true,
			animationData: loadingProfileAnim
		});

		lottie.loadAnimation({
			container: emptyRef.current!,
			autoplay: true,
			renderer: 'svg',
			loop: true,
			animationData: emptyProfileAnim
		});

		setDataToSearch(()=>[]);
	}, []);


	const LoadingProfile = () => {

		return (
			<div className="user-profile-loading">
				<div className="profile-loading" ref={loadingRef} />
			</div>
		)
	}

	const ShowMaterials = () => {
		const cardsList = createCardsList(materialInfoRoute);

		return (
			<div className="wrapper">
				<div className="cards-viewer" style={{ overflow: "scroll" }}>
					<div className="space" />
					{
						cardsList?.map((card, index) => {
							if (searchResult === undefined || (searchResult && searchResult.includes(card.cardID))){ return <MaterialCard key={index} {...card!} />}
							else{ return null}
						})}
					<div className="down-space" />
				</div>
			</div>
		)
	}

	useEffect(() => {
		console.log(emptyWrapperRef.current);
		if (hadShcedule && emptyWrapperRef.current !== null)
			emptyWrapperRef.current.style.display = "none";


	}, [emptyWrapperRef, hadShcedule])

	const createCardsList = (routeTo: string): cardInterface[] => {
		const result: cardInterface[] = [];
		const subjects: string[] = user.userProfile.schedule;
		 // search logic
		for (let [key, val] of Object.entries(materialsTable) as [any, any]) {
			// search logic
			dataToSearch?.push({key: val.materialName, value: key},{key:val.materialNumber, value: key})
			const data: any = val;
			if (!subjects?.includes(key)) continue;
			result.push({
				cardPhoto: data.materialPhoto,
				cardRate: data.totalRate,
				cardTitle: data.materialName,
				cardID: key,
				routeTo: `${routeTo}/${key}`
			});
		}
		setHadShcedule(result.length > 0);
		// search logic
		return result;
	};

	useEffect(()=>{
		if(dataToSearch)
			setDtaToSearchIn(dataToSearch);
	}, [JSON.stringify(dataToSearch)])

	return (
		<div>
			{!user.userProfile ? <LoadingProfile /> :
				<Avatar data={user} unisDataList={unisDataList} setUser={setUser} />}
			<div className="empty-warpper" ref={emptyWrapperRef}>
				<div className="empty-lottie" ref={emptyRef} />
				<div className="create-schedule" onClick={() => { history.push(scheduleRoute) }}>create schedule</div>
			</div>
			{user.userProfile ? <ShowMaterials /> : <div />}
		</div>
	);
}
