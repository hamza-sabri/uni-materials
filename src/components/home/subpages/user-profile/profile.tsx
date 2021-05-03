import React, { useContext, useEffect, useRef } from 'react';
import Avatar from './avatar';
import lottie from 'lottie-web';
import '../../../../styles/dynamic-content/user-profile/user-profile.css';
import loadingProfileAnim from '../../../../assets/home/profile/loading-profile.json'

import { DynamicContentContext } from '../../../../contexts/home-context/dynamic-content-state-context';
import { cardInterface } from '../../../../interfaces/cards/cards';
import { materialInfoRoute } from '../../../../constants/pages-route';
import MaterialCard from '../viewer/material-card';

export default function Profile() {
	const { unisDataList, user, setUser, materialsTable } = useContext(DynamicContentContext);
	const loadingRef = useRef<HTMLDivElement>(null);
	// replace the empty div with a loading container

	useEffect(() => {
		lottie.loadAnimation({
			container: loadingRef.current!,
			autoplay: true,
			renderer: 'svg',
			loop: true,
			animationData: loadingProfileAnim
		});
	}, []);

	const LoadingProfile = ()=>{
		return (
			<div className="user-profile-loading">
				<div className="profile-loading" ref={loadingRef} />
			</div>
		)
	}

	const ShowMaterials = ()=>{
		const cardsList = createCardsList(materialInfoRoute);
	    return (
			<div className="wrapper">
			<div className="cards-viewer" style={{overflow:"scroll"}}>
			<div className="space" />
			{cardsList?.map((card, index) => <MaterialCard key={index} {...card!} />)}
			<div className="down-space" />
			</div>
		</div>
			)
	}

	const createCardsList = (routeTo:string): cardInterface[] => {
		const result: cardInterface[] = [];
		const subjects:string[] = user.userProfile.schedule;
		for (let [ key, value ] of Object.entries(materialsTable)) {
			const data: any = value;
			if(!subjects?.includes(key)) continue;
			result.push({
				cardPhoto: data.materialPhoto,
				cardRate: data.totalRate,
				cardTitle: data.materialName,
				cardID: key,
				routeTo: `${routeTo}/${key}`
			});
		}
		return result;
	};

	return (
		<div>
			{!user.userProfile? <LoadingProfile />: 
			<Avatar data={user} unisDataList={unisDataList} setUser={setUser} />}
			{user.userProfile? <ShowMaterials />: <div/>}
		</div>
	);
}
