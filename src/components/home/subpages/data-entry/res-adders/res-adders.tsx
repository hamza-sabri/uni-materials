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
import LoadingUpload from '../loading-upload';
import withReactContent from 'sweetalert2-react-content';

export function PDFAdder({ matID, topicID }: { matID: string; topicID: string }) {
	const results: string[] = [ '', '', '' ];
	const bookLinkInput = useRef<HTMLInputElement>(null);
	const divRef = useRef<HTMLDivElement>(null);
	const pdfNameInput = useRef<HTMLInputElement>(null);
	const MySwal = withReactContent(Swal);
	const hideLoading = () => {
		let temp = document.querySelector('.transparent-background');
		temp!.className = 'empty-div';
		temp = document.querySelector('.swal2-container');
		temp!.className = 'empty-div';
		MySwal.clickCancel();
		Swal.clickCancel();
	};

	const showLoading = () => {
		MySwal.fire(<LoadingUpload />);
		const temp = document.querySelector('.swal2-popup');
		temp!.className = 'transparent-background';
	};

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
			showLoading();
			const { status, data } = await APIsCaller({ api: createNewRes, requestParams, requestBody });
			console.log(status, data);
			hideLoading();
		}
	};
	return (
		<div className="adder">
			<div className="res-animation-container" ref={divRef} />
			<input type="text" className="res-input" placeholder="PDF Name" ref={pdfNameInput} />
			<input type="url" className="res-input" placeholder="PDF link" ref={bookLinkInput} />

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
			<input type="text" className="res-input" placeholder="Question Name" />
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
			<input type="text" className="res-input" placeholder="Question Name" />
			<textarea className="res-text-area" placeholder="Question" />
			<textarea className="res-text-area" placeholder="Answer" />
			<div className="res-submit-btn" onClick={submitHandler}>
				submit
			</div>
		</div>
	);
}
