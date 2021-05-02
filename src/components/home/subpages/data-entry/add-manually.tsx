import React, { useContext, useEffect, useRef } from 'react';
import '../../../../styles/data-entry-styles/manual/manual-entry.css';
import lottie from 'lottie-web';
import floattingLaptop from '../../../../assets/data-entry-assets/floatting-laptop.json';
import emptySVG from '../../../../assets/data-entry-assets/empty.svg';
import Swal from 'sweetalert2';
import { APIsCaller } from '../../../../requestes/apis-caller';
import { createNewMaerial, createTopic, updateMaterial, updateTopic } from '../../../../requestes/material-requests/mateirla';
import { CREATED, OK } from '../../../../constants/status-codes';
import { DynamicContentContext } from '../../../../contexts/home-context/dynamic-content-state-context';
import { NavLink } from 'react-router-dom';

type cardCreateorInterface = {
	inputs: string[];
	descriptionInput?: string;
	values: string[];
	localMaterialID?: string;
	rate?: number;
	resRoute: string;
	topicID?: string;
	setResRoute: React.Dispatch<React.SetStateAction<string>>;
}

export default function CardCreateor({ inputs, descriptionInput, values, localMaterialID, topicID, rate, resRoute, setResRoute }: cardCreateorInterface) {
	const inputLottie = useRef(null);
	const materialName = useRef<HTMLPreElement>(null);
	const previewer = useRef<HTMLImageElement>(null);
	const emptyName: string = '???? ????';
	const results: string[] = (values.length === inputs.length) ? values : new Array(inputs.length).fill('');
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const addResButtonRef = useRef<HTMLDivElement>(null);
	const { materialsTable, setMaterialsTable } = useContext(DynamicContentContext);

	useEffect (() => {
		if(topicID) {
			addResButtonRef.current!.style.display = 'flex';
		}
	});

	useEffect(() => {
		lottie.loadAnimation({
			container: inputLottie.current!,
			autoplay: true,
			renderer: 'svg',
			loop: true,
			animationData: floattingLaptop
		});
	}, [materialsTable, resRoute]);

	const inputHandler = (e: any, index: number) => {
		const value: string = e.target.value || '';
		if (index === 0) materialName.current!.innerHTML = value !== '' ? value : emptyName;
		else if (index === 1) {
			previewer.current!.src = (value !== '' ? value : emptySVG)
		}
		results[index] = value;
	};

	const submitHandler = () => {
		let emptyIndex: number = -1;
		results.forEach((result, index) => (result === '' || !result) ? emptyIndex = index : '')
		if (emptyIndex !== -1) Swal.fire('Ops!', `Sorry but the "${inputs[emptyIndex]}" is required`, 'error');
		else {
			if (topicID != undefined) { updateTopicDocument(); }
			else if (inputs[0].includes('Topic')) submitTopic();
			else if (values.length !== 0) updateDocument();
			else if (descriptionInput) submitMaterial();
			// to add the topic later
		}
	}

	const updateDocument = async () => {
		Swal.showLoading();
		const requestBody: any = {
			materialName: results[0],
			materialPhoto: results[1],
			materialNumber: results[2],
			materialDesc: textAreaRef?.current?.value || '',
			totalRate: rate
		}
		const requestParams = {
			materialID: localMaterialID!
		}
		const { data, status } = await APIsCaller({ api: updateMaterial, requestBody, requestParams });
		const { message } = data;
		if (status === OK) {
			updateMaterialLocally(localMaterialID!, requestBody);
			Swal.fire('Thanks', message, 'success');
		}
		else Swal.fire('Ops!', 'Something went wrong', 'error');
	}

	const submitMaterial = async () => {
		Swal.showLoading();
		const requestBody = {
			materialName: results[0],
			materialPhoto: results[1],
			materialNumber: results[2],
			materialDesc: textAreaRef?.current?.value || '',
			totalRate: 5,
		}
		const { data, status } = await APIsCaller({ api: createNewMaerial, requestBody });
		const { message, materialID } = data;

		if (status === CREATED) {
			updateMaterialLocally(materialID, requestBody);
			Swal.fire('Thanks', message, 'success');
		}
		else Swal.fire('Ops!', message || 'Something went wrong', 'error');
	}

	const submitTopic = async () => {
		Swal.showLoading();
		const requestBody = {
			topicName: results[0],
			topicPhoto: results[1],
			topicDes: textAreaRef?.current?.value || ''
		}
		const requestParams = { materialID: localMaterialID }
		const { data, status } = await APIsCaller({ api: createTopic, requestBody, requestParams });
		const { message, topicID } = data;
		if (status === CREATED || status === OK) {
			console.log(addResButtonRef.current)
			setResRoute((currentRoute) => `${currentRoute}/${topicID}`);
			await Swal.fire('Thanks', message, 'success');
			addResButtonRef.current!.style.display = 'flex';

		}
		else Swal.fire('Ops!', 'Something went wrong', 'error');

	}

	const updateTopicDocument = async () => {
		Swal.showLoading();
		const requestBody = {
			topicName: results[0],
			topicPhoto: results[1],
			topicDes: textAreaRef?.current?.value || ''
		}
		const requestParams = { materialID: localMaterialID, topicID: topicID }
		const { data, status } = await APIsCaller({ api: updateTopic, requestBody, requestParams });
		const { message } = data;
		if (status === CREATED || status === OK) {
			// setResRoute((currentRoute) => `${currentRoute}/${topicID}`);
			// addResButtonRef.current!.style.display = 'flex';
			Swal.fire('Thanks', message, 'success');
		}
		else Swal.fire('Ops!', 'Something went wrong', 'error');
	}

	const updateMaterialLocally = (matID: string, newMat: any) => {
		const newData = {
			...materialsTable,
			[matID]: newMat
		}
		setMaterialsTable(() => newData);
	}

	const MaterialInputs = () => {

		return (
			<div className="inputs-container">
				{inputs.map((hint, index) => {
					if (values!.length > index) return <input placeholder={hint} key={index} onChange={(e) => inputHandler(e, index)} defaultValue={values[index]} type={hint.includes("Number") ? "number" : "text"} />
					return <input placeholder={hint} key={index} onChange={(e) => inputHandler(e, index)} type={hint.includes("Number") ? "number" : "text"} />
				})}
				{
					descriptionInput ? <textarea placeholder={descriptionInput} ref={textAreaRef}
						defaultValue={(localMaterialID) ? materialsTable[localMaterialID].materialDesc : ''}
						onFocus={() => {
							textAreaRef.current!.style.overflowY = 'scroll';
						}} onBlur={() => {
							textAreaRef.current!.style.overflow = 'hidden';
						}} /> : <div />
				}
				<div className="lottie-input-container" ref={inputLottie} />
				<div className="submit-material-button" onClick={submitHandler}>
					{(values.length !== 0) ? "Update" : "Submit"}
				</div>
			</div>
		);
	};

	const Materialpreviewer = () => {
		return (
			<div className="material-previewer-container">
				<div className="material-previewer" >
					<img src={(values.length >= 2) ? values[1] : emptySVG} alt="card-img" ref={previewer} />
					<pre className="material-name-container" ref={materialName}>
						{(values.length >= 2) ? values[0] : emptyName}
					</pre>
				</div>
				{addResButton()}
			</div>
		);
	};

	// TODO if I recived the topic ID then the button should be display flex by defualt
	const addResButton = () => {
		return <NavLink to={resRoute}>
			<div className="add-res-button" ref={addResButtonRef}>Add resources</div>
		</NavLink>
	}

	return (
		<div className="manual-entry-method">
			<MaterialInputs />
			<Materialpreviewer />
		</div>
	);
}
