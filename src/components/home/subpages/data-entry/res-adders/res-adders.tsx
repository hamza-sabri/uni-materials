import React, { useEffect, useRef } from 'react';
import '../../../../../styles/data-entry-styles/res/res-adders.css';
import pdfAnimation from '../../../../../assets/data-entry-assets/pdf-animation.json';
import qAndA from '../../../../../assets/data-entry-assets/Q-and-A.json';
import videoAnimatedIcon from '../../../../../assets/data-entry-assets/video-animated-icon.json';
import DropZone from '../drop-zone';
import lottie from 'lottie-web';

export function PDFAdder() {
	const results: string[] = [ '', '', '' ];
	const pdfUrlRef = useRef<HTMLInputElement>(null);
	const divRef = useRef<HTMLInputElement>(null);
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

	const submitHandler = () => {};
	return (
		<div className="adder">
			<div className="res-animation-container" ref={divRef} />
			<input type="text" className="res-input" placeholder="PDF Name" />
			<input ref={pdfUrlRef} type="url" className="res-input" placeholder="PDF link" />
			<DropZone bookLinkInput={pdfUrlRef} results={results} />
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
