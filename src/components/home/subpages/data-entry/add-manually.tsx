import React, { useEffect, useRef } from 'react';
import '../../../../styles/data-entry-styles/manual/manual-entry.css';
import lottie from 'lottie-web';
import floattingLaptop from '../../../../assets/data-entry-assets/floatting-laptop.json';
import emptySVG from '../../../../assets/data-entry-assets/empty.svg';

export default function CardCreateor({inputs}:{inputs:string[]}) {
	const inputLottie = useRef(null);
	const materialName = useRef<HTMLPreElement>(null);
	const previewer = useRef<HTMLDivElement>(null);
	const emptyName: string = '???? ????';
	const results: string[] = [ '', '', '' ];

	useEffect(() => {
		lottie.loadAnimation({
			container: inputLottie.current!,
			autoplay: true,
			renderer: 'svg',
			loop: true,
			animationData: floattingLaptop
		});
	}, []);

	const inputHandler = (e: any, index: number) => {
		const value: string = e.target.value || '';
		if (index === 0) materialName.current!.innerHTML = value !== '' ? value : emptyName;
		else if (index === 1) {
			previewer.current!.style.backgroundImage = `url(${value !== '' ? value : emptySVG})`;
		}
		results[index] = value;
	};

	const MaterialInputs = () => {
		return (
			<div className="inputs-container">
				{inputs.map((hint,index) =>{
					return <input placeholder={hint} key={index} onChange={(e) => inputHandler(e, index)} />
				})}
				<div className="lottie-input-container" ref={inputLottie} />
				<div className="submit-material-button" onClick={() => console.log(results)}>
					Submit
				</div>
			</div>
		);
	};

	const Materialpreviewer = () => {
		return (
			<div className="material-previewer-container">
				<div className="material-previewer" ref={previewer} style={{ backgroundImage: `url(${emptySVG})` }}>
					<pre className="material-name-container" ref={materialName}>
						{emptyName}
					</pre>
				</div>
			</div>
		);
	};

	return (
		<div className="manual-entry-method">
			<MaterialInputs />
			<Materialpreviewer />
		</div>
	);
}
