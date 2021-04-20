import React, { useEffect, useState } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import { resMethodsInterface } from '../../../../interfaces/res/res-interface';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { addPDFResCode, addQAndAResCode, addUsefulResCode, addVideoResCode } from '../../../../constants/action-cods';
import { PDFAdder, QAAdder, UsefulRes, VideoAdder } from './res-adders/res-adders';

export default function ResMethods({ resType, divRef, action, anim }: resMethodsInterface) {
	const MySwal = withReactContent(Swal);
	const [ controller, setController ] = useState<AnimationItem>();
	useEffect(() => {
		const temp = lottie.loadAnimation({
			container: divRef.current!,
			autoplay: false,
			renderer: 'svg',
			loop: false,
			animationData: anim,
			rendererSettings:{
			}
		});
		temp.setSpeed(1.1);
		setController(temp);
	}, [divRef, anim]);

	const actionHandler = () => {
		if (action === addPDFResCode)    MySwal.fire({showConfirmButton:false, title:'PDFs',   html: <PDFAdder />});
		if (action === addVideoResCode)	 MySwal.fire({showConfirmButton:false, title:'Videos', html: <VideoAdder />});
		if (action === addQAndAResCode)	 MySwal.fire({showConfirmButton:false, title:'Q & A',  html: <QAAdder />});
		if (action === addUsefulResCode) MySwal.fire({showConfirmButton:false, title:'fix me later',  html: <UsefulRes />});
	};

	return (
		<div className="res-adder" onClick={actionHandler}>
			<div className="animation-container" ref={divRef} 
			onMouseEnter ={()=> {
				controller!.setDirection(1);
				controller!.loop = true;
				controller!.play()}}
			onMouseLeave ={()=> {
				controller!.setDirection(-1);
				controller!.loop = false;
				}}
			>
				<div className="res-type-container">{resType}</div>
			</div>
		</div>
	);
}
