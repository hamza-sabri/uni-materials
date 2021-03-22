import React, { useEffect, useRef } from 'react';
import uploading from '../../../../assets/data-entry-assets/uploading.json';
import lottie from 'lottie-web';
export default function LoadingUpload() {
	const uploadingRef = useRef(null);

	useEffect(() => {
		lottie.loadAnimation({
			container: uploadingRef.current!,
			autoplay: true,
			renderer: 'svg',
			loop: true,
			animationData: uploading
		});
	}, []);

	return <div  className='upload-container'>
        <div className="lottie-upload" ref={uploadingRef}></div>
    </div>;
}
