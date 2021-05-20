import { useContext, useEffect, useState } from 'react';
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
	const { user, materialsTable, setUser, setDtaToSearchIn, searchResult } = useContext(DynamicContentContext);
	const MySwal = withReactContent(Swal);



	const createCardsList = (routeTo: string): cardInterface[] => {
		const result: cardInterface[] = [];
		for (let [key, value] of Object.entries(materialsTable)) {
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

	const scheduleCardList = () => {
		const result: cardInterface[] = [];
		for (let [key, value] of Object.entries(materialsTable)) {
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
		if (!url) return scheduleCardList();

		switch (url) {
			case updatematerialsRoute: return createCardsList(manualEntryRoute);
			case cretateTopics: return createCardsList(updateTopic);
			case materialInfoRoute: return createCardsList(materialInfoRoute);
			default: return [];
		}
	};

	const [data, setData] = useState<(cardInterface | undefined)[]>([]);
	const [selected, setSelected] = useState<(cardInterface | undefined)[]>();
	const [userSchedule, setUserSchedule] = useState<(string | undefined)[]>(user?.userProfile?.schedule);
	const [adding, setAdding] = useState<boolean>(false);

	useEffect(() => {
		// console.log(user)

		defualtValues();
	}, [userSchedule])


	// For search logic
	useEffect(() => {
		console.log("data", data);
		if(data.length != 0)
			setDtaToSearchIn(data.map(item => { return { key: item?.cardTitle, value: item?.cardID } }));
	}, [data]);

	// For search logic
	useEffect(() => {
		setData(urlHandler());

		return () => {
			setDtaToSearchIn(undefined);
		}
	}, []);

	const SaveFAB = () => {
		return (
			<div className="save-button" onClick={saveShcedule}>
				<img alt="save" src={saveIcon} />
			</div>
		)
	}

	const saveShcedule = async () => {

		console.log(`userSchedule`, userSchedule);
		const { isConfirmed } = await MySwal.fire({
			title: 'Materials',
			html: <VeiwSelected />,
			icon: "info",
			confirmButtonText: "Create",
			width: "70vw",
			confirmButtonColor: "#766ffa",
		})
		if (isConfirmed) await saveToFirebase()
	}

	const saveToFirebase = async () => {
		MySwal.fire('');
		MySwal.showLoading();
		try {
			const requestBody = {
				schedule: userSchedule
			}
			console.log(requestBody);
			const { status } = await APIsCaller({ api: updateUserProfile, requestBody });
			// TODO fix it very very very soooooooooooooooon
			if (status === OK || status === BAD_REQUEST) {
				const newUser = { ...user };
				newUser.userProfile.schedule = userSchedule;
				setUser(newUser);
				Swal.fire("Congrats", "Your Schedule has been updated!", "success");
			} else Swal.fire("Ops!", "Something went wrong", "error");
		} catch (err) {
			Swal.fire("Ops!", "Something went wrong", "error");
		}
	}

	const VeiwSelected = () => {

		return (
			<div className='schedule-alert'>
				{selected?.map((card, index) => <MaterialCard key={index} {...card!} submitHandler={removeCardFromSchedule} option="-" />)}
			</div>)
	}

	const defualtValues = () => {

		const temp: cardInterface[] = [];
		userSchedule?.forEach((val: any) => {
			const currentMat = materialsTable[val];
			temp.push({
				cardPhoto: currentMat.materialPhoto,
				cardRate: currentMat.totalRate,
				cardTitle: currentMat.materialName,
				cardID: val
			})
		});
		setSelected(() => temp);
		console.log(adding)
		if (selected && !adding) {
			if (selected?.length === 0) Swal.clickCancel();
			saveShcedule();
		}
	}

	const removeCardFromSchedule = (matID: string) => {
		setAdding(false);
		const newData = selected?.filter((tempCard) => `${tempCard?.cardID}` !== `${matID}`);
		const newSchedule = newData!.map((temp) => temp!.cardID);
		console.log(newData)
		setSelected(() => newData);
		setUserSchedule(() => newSchedule)
	}

	const onCardClickHandler = (matID: string) => {
		setAdding(true);
		console.log("am adding");

		setUserSchedule((mySchedule) => {
			if (!mySchedule) return [...[matID]]
			return [...[matID, ...mySchedule]];
		})
		const temp = materialsTable[matID];
		const cardToAdd = {
			cardPhoto: temp.materialPhoto,
			cardRate: temp.totalRate,
			cardTitle: temp.materialName,
			cardID: matID,
		}
		setSelected((selectedSoFar) => {

			if (selectedSoFar) return [...[cardToAdd, ...selectedSoFar]];
			return [...[cardToAdd]];
		})
		const newData = data?.filter((tempCard) => tempCard?.cardID !== matID);
		setData(newData)
	}

	// TODO check if the array is empty then give a diffrent UI
	return (
		<div className="cards-viewer">
			<div className="space" />
			{/* // For search logic */}
			{searchResult?.length !== 0 ?
				data?.map((card, index) => {
					// For search logic
					if (searchResult == undefined || searchResult?.includes(card?.cardID)) {
						return <MaterialCard key={index} {...card!} submitHandler={onCardClickHandler} option="+" />
					}
				})
				: <p> no material Found:(</p>}
			<div className="down-space" />
			{match ? <div /> : <SaveFAB />}

		</div>
	);
}
