import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import pdfImage from '../../../../assets/data-entry-assets/pdf.svg';
import LoadingUpload from './loading-upload';

type dropZoneInterface = {
	bookLinkInput: React.RefObject<HTMLInputElement>;
	results: string[];
};

export default function DropZone({ bookLinkInput, results }: dropZoneInterface) {
	const MySwal = withReactContent(Swal);
	const message: string = 'Click to Add\n Or drag and drop a PDF file';
	const [ dropedFile, setDropedFile ] = useState<JSX.Element>(<pre>{message}</pre>);
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
			setDropedFile(
				<div>
					<img style={{ width: '2.5rem', height: '2.5rem' }} src={pdfImage} alt="pdficon" />
					<pre>	</pre>
					<p style={{ fontSize: '1.8rem' }}>{acceptedFiles[0].name}</p>
				</div>
			);
			const { url } = await uploadFile(acceptedFiles[0]);
			console.log(url);
			updateBookLink(url);
			hideLoading();
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
		temp!.className = 'empty-div'
		temp = document.querySelector('.swal2-container');
		temp!.className = 'empty-div';
		MySwal.clickCancel();
		Swal.clickCancel();
	};

	const showLoading = () => {
		MySwal.fire(<LoadingUpload />);
		const temp = document.querySelector('.swal2-popup');
		temp!.className = 'transparent-background'
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
