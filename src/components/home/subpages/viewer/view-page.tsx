import React, { useContext, useState } from 'react';
import { DynamicContentContext } from '../../../../contexts/home-context/dynamic-content-state-context';
import { cardInterface } from '../../../../interfaces/cards/cards';
import '../../../../styles/viewer/cards-viewer/cards-viewer.css';
import MaterialCard from './material-card';
import { cretateTopics, manualEntryRoute, materialInfoRoute, updatematerialsRoute, updateTopic } from '../../../../constants/pages-route';
import { match as cardsViewerMatch } from 'react-router-dom';
import saveIcon from '../../../../assets/home/profile/save.svg';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { APIsCaller } from '../../../../requestes/apis-caller';
import { updateUserProfile } from '../../../../requestes/user-requestes/user';
import { BAD_REQUEST, OK } from '../../../../constants/status-codes';
export default function CardsViewer({ match }: { match?: cardsViewerMatch<any> }) {
	const { materialsTable } = useContext(DynamicContentContext);
	const MySwal = withReactContent(Swal);
	
	const createCardsList = (routeTo:string): cardInterface[] => {
		const result: cardInterface[] = [];
		for (let [ key, value ] of Object.entries(materialsTable)) {
			const data: any = value;
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

	const scheduleCardList = ()=>{
		const result: cardInterface[] = [];
		for (let [ key, value ] of Object.entries(materialsTable)) {
			const data: any = value;
			result.push({
				cardPhoto: data.materialPhoto,
				cardRate: data.totalRate,
				cardTitle: data.materialName,
				cardID: key,
			});
		}
		return result;
	}

	const urlHandler = (): cardInterface[] => {
		const url: string | undefined = match?.url;
		if(!url)return scheduleCardList();
		
		switch (url) {
			case updatematerialsRoute: return createCardsList(manualEntryRoute);
			case cretateTopics: return createCardsList(updateTopic);
			case materialInfoRoute: return createCardsList(materialInfoRoute);
			default: return [];
		}
	};

	const [data, setData]  = useState<(cardInterface | undefined)[]>(urlHandler());
	const [selected, setSelected]  = useState<(cardInterface | undefined)[]>();
	const [userSchedule, setUserSchedule] = useState<string[]>([]);

	const SaveFAB = ()=>{
		return (
			<div className="save-button" onClick={saveShcedule}>
				<img alt="save" src={saveIcon} />
			</div>
		)
	}

	const saveShcedule = async()=>{
		console.log(`userSchedule`, userSchedule);
		const {isConfirmed} = await MySwal.fire({
			title:'Materials',
			html: <VeiwSelected />, 
			icon:"info", 
			confirmButtonText:"Create",
			width:"70vw",
			confirmButtonColor:"#766ffa",
	})
	if(!isConfirmed){
		Swal.clickCancel();
		return;
	}
	Swal.showLoading();
	try{
		const requestBody = {
			schedule: userSchedule
		}
		const {status} = await APIsCaller({api:updateUserProfile, requestBody});
		// TODO fix it very very very soooooooooooooooon
		if(status === OK || status === BAD_REQUEST) Swal.fire("Congrats","Your Schedule has been updated!", "success");
		else Swal.fire("Ops!","Something went wrong", "error");
	}catch(err){
		Swal.fire("Ops!","Something went wrong", "error");
	  }
	}

	const VeiwSelected = ()=>{
		return (
			<div className='schedule-alert'>
			{selected?.map((card, index) => <MaterialCard key={index} {...card!}  submitHandler={removeCardFromSchedule} option="-"/>)}
			</div>)
	}

	const removeCardFromSchedule = (matID:string)=>{
		console.log(`matID2`, matID);
		const newData = selected?.filter((tempCard) => tempCard?.cardID !== matID);
		console.log(newData)
		setSelected(() => newData);
		Swal.clickCancel();
	}

	const onCardClickHandler = (matID:string)=>{
		console.log(`matID`, matID);
		setUserSchedule((mySchedule)=>[...[matID, ...mySchedule]])
		const temp = materialsTable[matID];
		const cardToAdd = {
			cardPhoto: temp.materialPhoto,
			cardRate: temp.totalRate,
			cardTitle: temp.materialName,
			cardID: matID,
		}
		setSelected((selectedSoFar) => {
			if(selectedSoFar) return [...[cardToAdd, ...selectedSoFar]];
			return [...[cardToAdd]];
		})
		const newData = data?.filter((tempCard) => tempCard?.cardID !== matID);
		setData(newData)
	}

	// TODO check if the array is empty then give a diffrent UI
	return (
		<div className="cards-viewer">
			<div className="space" />
			{data?.map((card, index) => <MaterialCard key={index} {...card!} submitHandler={onCardClickHandler} option="+" />)}
			<div className="down-space" />
			{match ? <div/>: <SaveFAB />}

		</div>
	);
}
