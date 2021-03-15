import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DropZone() {
	const onDrop = useCallback((acceptedFiles) => {
		// Do something with the files
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div className="drop-zoon-container">
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				{isDragActive ? (<p className='active-p'>Drop here !!!</p>) : 
                (<p>Click to Add, Or drag and drop a PDF file</p>)}
			</div>
		</div>
	);
}
