import React, { useEffect, useRef } from 'react';
import '../../../../styles/data-entry-styles/manual/manual-entry.css';
import lottie from 'lottie-web';
import floattingLaptop from '../../../../assets/data-entry-assets/floatting-laptop.json';
import emptySVG from '../../../../assets/data-entry-assets/empty.svg';
import Swal from 'sweetalert2';
import { APIsCaller } from '../../../../requestes/apis-caller';
import { createNewMaerial } from '../../../../requestes/material-requests/mateirla';
import { CREATED } from '../../../../constants/status-codes';

export default function CardCreateor({ inputs, descriptionInput }: { inputs: string[]; descriptionInput?: string }) {
	const inputLottie = useRef(null);
	const materialName = useRef<HTMLPreElement>(null);
	const previewer = useRef<HTMLImageElement>(null);
	const emptyName: string = '???? ????';
	const results: string[] = new Array(inputs.length).fill('');
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		lottie.loadAnimation({
			container: inputLottie.current!,
			autoplay: true,
			renderer: 'svg',
			loop: true,
			animationData: floattingLaptop
		});
	}, []);

	const inputHandler = (e: any, index: number) => {
		const value: string = e.target.value || '';
		if (index === 0) materialName.current!.innerHTML = value !== '' ? value : emptyName;
		else if (index === 1) {
			previewer.current!.src = (value !== '' ? value : emptySVG)
		}
		results[index] = value;
	};

	const submitHandler =  ()=>{
		let emptyIndex:number = -1;
		results.forEach((result,index) =>(result === '' || !result)? emptyIndex = index: '')
		if(emptyIndex !== -1) Swal.fire('Ops!',`Sorry but the "${inputs[emptyIndex]}" is required`, 'error' );
		else{
			if(descriptionInput) submitMaterial();
			// to add the topic later
			}
	}

	const submitMaterial = async()=>{
		Swal.showLoading();
		const requestBody = {
			materialName: results[0],
			materialPhoto: results[1],
			materialNumber: results[2],
			materialDesc: textAreaRef?.current?.value || ''
		}
		const {data, status} = await APIsCaller({api:createNewMaerial, requestBody});
		const {message, materialID} = data;
		console.log({materialID});
		if (status === CREATED) Swal.fire('Thanks', message, 'success' );
		else Swal.fire('Ops!','Something went wrong', 'error' );
	
	}
	const MaterialInputs = () => {
		return (
			<div className="inputs-container">
				{inputs.map((hint, index) => (
					<input placeholder={hint} key={index} onChange={(e) => inputHandler(e, index)} />
				))}
				{
					descriptionInput ? <textarea placeholder={descriptionInput} ref={textAreaRef} onFocus={()=>{
						textAreaRef.current!.style.overflowY ='scroll';
					}} onBlur={()=> {
						textAreaRef.current!.style.overflow ='hidden';
					}}/> : <div/>
				}
				<div className="lottie-input-container" ref={inputLottie} />
				<div className="submit-material-button" onClick={submitHandler}>
					Submit
				</div>
			</div>
		);
	};

	const Materialpreviewer = () => {
		return (
			<div className="material-previewer-container">
				<div className="material-previewer" >
					<img src={emptySVG} alt="card-img" ref={previewer}/>
					<pre className="material-name-container" ref={materialName}>
						{emptyName}
					</pre>
				</div>
			</div>
		);
	};

	return (
		<div className="manual-entry-method">
			<MaterialInputs />
			<Materialpreviewer />
		</div>
	);
}
