import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DropZone() {
	const onDrop = useCallback((acceptedFiles) => {
		// Do something with the files
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const message:string = 'Click to Add\n Or drag and drop a PDF file'
	return (
		<div className="drop-zoon-container">
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				{isDragActive ? (<pre className='active-pre'>Drop here !!!</pre>) : 
                (<pre>{message}</pre>)}
			</div>
		</div>
	);
}
