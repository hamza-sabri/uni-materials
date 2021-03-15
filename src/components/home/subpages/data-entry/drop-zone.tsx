import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DropZone({bookLinkInput, results}:{bookLinkInput: React.RefObject<HTMLInputElement>; results:string[]}) {
    const bookLinkIndex:number = 3;
	
    const onDrop = useCallback((acceptedFiles) => {
        // TODO call this function with the url from cloudinary
		// updateBookLink(bookURL);
	}, []);

    const updateBookLink = (url:string) =>{
        results[bookLinkIndex] = url;
        bookLinkInput.current!.value = url;
        bookLinkInput.current!.disabled = true;
    }

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
