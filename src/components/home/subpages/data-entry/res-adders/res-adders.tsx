import React, { useEffect, useRef } from 'react';
import '../../../../../styles/data-entry-styles/res/res-adders.css';
import pdfAnimation from '../../../../../assets/data-entry-assets/pdf-animation.json';
import qAndA from '../../../../../assets/data-entry-assets/Q-and-A.json';
import rulesAnimation from '../../../../../assets/data-entry-assets/rules.json';
import usefulResAnimation from '../../../../../assets/data-entry-assets/useful-resources.json';
import videoAnimatedIcon from '../../../../../assets/data-entry-assets/video-animated-icon.json';
import DropZone from '../drop-zone';
import lottie from 'lottie-web';
import Swal from 'sweetalert2';
import { APIsCaller } from '../../../../../requestes/apis-caller';
import { createNewRes } from '../../../../../requestes/res-requests/res';
import { pdfsType } from '../../../../../constants/res-types';
import { hideLoading, showLoading } from '../../../../../utilities/alearts';
import { CREATED, OK } from '../../../../../constants/status-codes';


export function PDFAdder({ matID, topicID }: { matID: string; topicID: string }) {
	const results: string[] = [ '', '', '' ];
	const bookLinkInput = useRef<HTMLInputElement>(null);
	const divRef = useRef<HTMLDivElement>(null);
	const pdfNameInput = useRef<HTMLInputElement>(null);
	

	useEffect(() => {
		lottie
			.loadAnimation({
				container: divRef.current!,
				autoplay: true,
				renderer: 'svg',
				loop: true,
				animationData: pdfAnimation
			})
			.setSpeed(0.8);
	}, []);

	const submitHandler = async () => {
		const pdfName: string = pdfNameInput.current!.value;
		const pdfLink: string = bookLinkInput.current!.value;
		if (pdfName === '' || pdfLink === '') Swal.fire('Ops!', 'Sorry but all fields must not be empty', 'error');
		else {
			const requestParams = {
				materialID: matID,
				topicID: topicID
			};
			const requestBody = {
				resType: pdfsType,
				fileName: pdfName,
				link: pdfLink,
			};
			showLoading(0);
			const { status, data } = await APIsCaller({ api: createNewRes, requestParams, requestBody });
			console.log(status, data);
			if(status === OK || status === CREATED) Swal.fire('Congrats',data.message,'success');
			else Swal.fire('Ops!',data.message,'error');
		}
	};
	return (
		<div className="adder">
			<div className="res-animation-container" ref={divRef} />
			<input type="text" className="res-input" placeholder="PDF Name" ref={pdfNameInput} />
			<input type="url" className="res-input" id='pdf-link' placeholder="PDF link" ref={bookLinkInput} />
			<DropZone {...{ bookLinkInput, results, pdfNameInput }} />
			<div className="res-submit-btn" onClick={submitHandler}>
				submit
			</div>
		</div>
	);
}

export function VideoAdder() {
	const divRef = useRef<HTMLInputElement>(null);
	const submitHandler = () => {};
	useEffect(() => {
		lottie
			.loadAnimation({
				container: divRef.current!,
				autoplay: true,
				renderer: 'svg',
				loop: true,
				animationData: videoAnimatedIcon
			})
			.setSpeed(0.8);
	}, []);
	return (
		<div className="adder">
			<div className="res-animation-container" ref={divRef} />
			<input type="text" className="res-input" placeholder="video link" />
			<div className="video-previewer" />
			<div className="res-submit-btn" onClick={submitHandler}>
				submit
			</div>
		</div>
	);
}

export function UsefulRes() {
	const divRef = useRef<HTMLInputElement>(null);
	const submitHandler = () => {};
	useEffect(() => {
		lottie
			.loadAnimation({
				container: divRef.current!,
				autoplay: true,
				renderer: 'svg',
				loop: true,
				animationData: usefulResAnimation
			})
			.setSpeed(0.8);
	}, []);
	return (
		<div className="adder">
			<div className="res-animation-container" ref={divRef} />
			<input type="text" className="res-input" placeholder="video link" />
			<div className="video-previewer" />
			<div className="res-submit-btn" onClick={submitHandler}>
				submit
			</div>
		</div>
	);
}

export function QAAdder() {
	const divRef = useRef<HTMLInputElement>(null);
	const submitHandler = () => {};
	useEffect(() => {
		lottie
			.loadAnimation({
				container: divRef.current!,
				autoplay: true,
				renderer: 'svg',
				loop: true,
				animationData: qAndA
			})
			.setSpeed(0.8);
	}, []);
	return (
		<div className="adder">
			<div className="res-animation-container" ref={divRef} />
			<textarea className="res-text-area" placeholder="Question" />
			<textarea className="res-text-area" placeholder="Answer" />
			<div className="res-submit-btn" onClick={submitHandler}>
				submit
			</div>
		</div>
	);
}

export function Rules() {
	const divRef = useRef<HTMLInputElement>(null);
	const submitHandler = () => {};
	useEffect(() => {
		lottie
			.loadAnimation({
				container: divRef.current!,
				autoplay: true,
				renderer: 'svg',
				loop: true,
				animationData: rulesAnimation
			})
			.setSpeed(0.8);
	}, []);
	return (
		<div className="adder">
			<div className="res-animation-container" ref={divRef} />
			<input type="text" className="res-input" placeholder="ٌRule name" />
			<textarea className="res-text-area" placeholder="Rule content" />
			<textarea className="res-text-area" placeholder="Example" />
			<div className="res-submit-btn" onClick={submitHandler}>
				submit
			</div>
		</div>
	);
}
