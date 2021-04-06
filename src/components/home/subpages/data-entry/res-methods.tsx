import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import { resMethodsInterface } from '../../../../interfaces/res/res-interface';

export default function ResMethods({ resType, divRef, action, anim }: resMethodsInterface) {
	useEffect(() => {
		lottie.loadAnimation({
			container: divRef.current!,
			autoplay: true,
			renderer: 'svg',
			loop: true,
			animationData: anim
		});
	}, []);
	return (
		<div className="res-adder" onClick={action}>
			<div className="animation-container" ref={divRef}>
				<div className="res-type-container">{resType}</div>
			</div>
		</div>
	);
}
