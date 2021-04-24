import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import pdfImage from '../../../../assets/data-entry-assets/pdf.svg';
import LoadingUpload from './loading-upload';
import lottie from 'lottie-web';
import dropeHere from '../../../../assets/data-entry-assets/drop-here.json';
import { hideLoading, showLoading } from '../../../../utilities/alearts';

type dropZoneInterface = {
	bookLinkInput: React.RefObject<HTMLInputElement>;
	pdfNameInput?: React.RefObject<HTMLInputElement>;
	results: string[];
};

export default function DropZone({ bookLinkInput, results, pdfNameInput }: dropZoneInterface) {
	const message: string = 'Click to Add\n Or drag and drop a PDF file';
	const dropeHereRef = useRef<HTMLDivElement>(null);
	const dropeZoneContainerRef = useRef<HTMLDivElement>(null);
	const LIMIT = 10000000;
	
	useEffect(() => {
		lottie.loadAnimation({
			container: dropeHereRef.current!,
			autoplay: true,
			renderer: 'svg',
			loop: true,
			animationData: dropeHere
		});
	}, [] );

	const DefualtDrooeZone = () => {
		return (
			<div>
				<pre>{message}</pre>
				<div id="upload-here" ref={dropeHereRef}  style={{width: "15%", marginLeft:"1.5rem"}} />
			</div>
		);
	};
	const [ dropedFile, setDropedFile ] = useState<JSX.Element>(DefualtDrooeZone());
	const bookLinkIndex: number = 3;

	const uploadFile = async (fileUploaded: any) => {
		let formData = new FormData();
		formData.append('file', fileUploaded);
		// TODO: Add to .env
		formData.append('cloud_name', 'dgviin24k');
		formData.append('upload_preset', 'ysd8j66q');
		formData.append('public_id', fileUploaded.name.split('.')[0]);

		let res = await fetch('https://api.cloudinary.com/v1_1/dgviin24k/auto/upload', {
			method: 'post',
			mode: 'cors',
			body: formData
		});

		let json = await res.json();

		return json;
	};

	const onDrop = useCallback(async (acceptedFiles) => {
		if(acceptedFiles[0].size > LIMIT){
			Swal.fire({
				title: 'Ops!',
				html: `<pre><b>File Must be less than ${LIMIT/1000000}MB</b></pre>`,
				icon: 'error'
			});
		} else if (acceptedFiles[0].type !== 'application/pdf') {
			Swal.fire({
				title: 'Ops!',
				html: `<pre>Wrong Type\n pleas add a <b>PDF</b> file insted</pre>`,
				icon: 'error'
			});
		} 
		else if (pdfNameInput){
			try {
				setDropedFile(<LoadingUpload />);
				const { url } = await uploadFile(acceptedFiles[0]);
				setDropedFile(
					<div>
						<img style={{ width: '2.5rem', height: '2.5rem' }} src={pdfImage} alt="pdficon" />
						<pre> </pre>
						<p style={{ fontSize: '1.8rem' }}>{acceptedFiles[0].name}</p>
					</div>
				);
				updateBookLink(url, acceptedFiles[0].name);
			} catch (err) {
				console.log(err);
				Swal.fire({
					title: 'Ops!',
					html: `<pre style='font-size:1.8rem; font-weight:600'>Something went wrong\nPlease try again</pre>`,
					icon: 'error'
				});
			}
		}
		else {
			showLoading(0);
			try {
				const { url } = await uploadFile(acceptedFiles[0]);
				setDropedFile(
					<div>
						<img style={{ width: '2.5rem', height: '2.5rem' }} src={pdfImage} alt="pdficon" />
						<pre> </pre>
						<p style={{ fontSize: '1.8rem' }}>{acceptedFiles[0].name}</p>
					</div>
				);
				updateBookLink(url, acceptedFiles[0].name);
				hideLoading();
			} catch (err) {
				console.log(err);
				hideLoading();
				Swal.fire({
					title: 'Ops!',
					html: `<pre style='font-size:1.8rem; font-weight:600'>Something went wrong\nPlease try again</pre>`,
					icon: 'error'
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateBookLink = (url: string, name:string) => {
		results[bookLinkIndex] = url;
		bookLinkInput.current!.value = url;
		bookLinkInput.current!.disabled = true;
		if(pdfNameInput){
			name = name.replace('.pdf','');
			pdfNameInput.current!.value = name;
			pdfNameInput.current!.disabled = true;
		}
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
	return (
		<div className="drop-zoon-container" >
			<div {...getRootProps()} ref={dropeZoneContainerRef}>
				<input {...getInputProps()} />
				{isDragActive ? <pre className="active-pre">Drop here !!!</pre> : dropedFile}
			</div>
		</div>
	);
}
