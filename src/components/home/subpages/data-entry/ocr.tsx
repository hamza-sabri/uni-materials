import React, { useEffect, useRef } from 'react';
import ocrSVG from '../../../../assets/data-entry-assets/ocr.json';
import lottie from 'lottie-web';
export default function OCR() {
	const uploadingRef = useRef(null);

	useEffect(() => {
		lottie.loadAnimation({
			container: uploadingRef.current!,
			autoplay: true,
			renderer: 'svg',
			loop: true,
			animationData: ocrSVG,
            rendererSettings:{
                
            }
		});
	}, []);

	return (
		<div className="upload-container">
			<div className="lottie-ocr" ref={uploadingRef} />
            <div className="loading-message">Splitting the PDF please wait <span>...</span></div>
		</div>
	);
}
