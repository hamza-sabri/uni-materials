import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import pdfImage from '../../../../assets/data-entry-assets/pdf.svg';
import LoadingUpload from './loading-upload';
import lottie from 'lottie-web';
import dropeHere from '../../../../assets/data-entry-assets/drop-here.json'

type dropZoneInterface = {
	bookLinkInput: React.RefObject<HTMLInputElement>;
	results: string[];
};

export default function DropZone({ bookLinkInput, results }: dropZoneInterface) {
	const MySwal = withReactContent(Swal);
	const message: string = 'Click to Add\n Or drag and drop a PDF file';
	const dropeHereRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		lottie.loadAnimation({
			container: dropeHereRef.current!,
			autoplay: true,
			renderer: 'svg',
			loop: true,
			animationData: dropeHere
		});
	}, []);

	const DefualtDrooeZone = ()=>{
		return (
			<div>
				<pre>{message}</pre>
				<div className="upload-here" ref={dropeHereRef} style={{width:"15%", marginLeft:"1.2rem"}}></div>

			</div>
		);
	}
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
		if (acceptedFiles[0].type !== 'application/pdf') {
			Swal.fire({
				title: 'Ops!',
				html: `<pre>Wrong Type\n pleas add a <b>PDF</b> file insted</pre>`,
				icon: 'error'
			});
		} else {
			showLoading();
			try {
				const { url } = await uploadFile(acceptedFiles[0]);
				setDropedFile(
					<div>
						<img style={{ width: '2.5rem', height: '2.5rem' }} src={pdfImage} alt="pdficon" />
						<pre> </pre>
						<p style={{ fontSize: '1.8rem' }}>{acceptedFiles[0].name}</p>
					</div>
				);
				updateBookLink(url);
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

	const updateBookLink = (url: string) => {
		results[bookLinkIndex] = url;
		bookLinkInput.current!.value = url;
		bookLinkInput.current!.disabled = true;
	};

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

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
	return (
		<div className="drop-zoon-container">
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				{isDragActive ? <pre className="active-pre">Drop here !!!</pre> : dropedFile}
			</div>
		</div>
	);
}
