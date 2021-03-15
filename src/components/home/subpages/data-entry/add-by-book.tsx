import '../../../../styles/data-entry-styles/book/book-entry.css';
import React, { useRef } from 'react';
import '../../../../styles/data-entry-styles/manual/manual-entry.css';
import emptySVG from '../../../../assets/data-entry-assets/empty.svg';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DropZone from './drop-zone';
import OCR from './ocr';

export default function AddByBook({ inputs }: { inputs: string[]; }) {
	const materialName = useRef<HTMLPreElement>(null);
	const bookLinkInput = useRef<HTMLInputElement>(null);
	const previewer = useRef<HTMLDivElement>(null);
	const emptyName: string = '???? ????';
	const results: string[] = new Array(inputs.length).fill('');
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const MySwal = withReactContent(Swal);

	const inputHandler = (e: any, index: number) => {
		const value: string = e.target.value || '';
		if (index === 0) materialName.current!.innerHTML = value !== '' ? value : emptyName;
		else if (index === 1) {
			previewer.current!.style.backgroundImage = `url(${value !== '' ? value : emptySVG})`;
		}
		results[index] = value;
	};

	const submitHandler =  ()=>{
		let emptyIndex:number = -1;
		results.forEach((result,index) =>(result === '' || !result)? emptyIndex = index: '')
		if(emptyIndex !== -1) Swal.fire('Ops!',`Sorry but the "${inputs[emptyIndex]}" is required`, 'error' );
		else submitMaterial();
	}

	const submitMaterial = async()=>{
		Swal.showLoading();
		const requestBody = {
			materialName: results[0],
			materialPhoto: results[1],
			materialNumber: results[2],
			materialDesc: textAreaRef?.current?.value || ''
		}
		console.log(requestBody);
		showLoading();
		// TODO: call Hussien's API
		// TODO call the Firebase API
	
	}
	
	const hideLoading = () => {
		let temp = document.querySelector('.transparent-background');
		temp!.className = 'empty-div'
		temp = document.querySelector('.swal2-container');
		temp!.className = 'empty-div';
		MySwal.clickCancel();
		Swal.clickCancel();
	};

	const showLoading = () => {
		MySwal.fire(<OCR />);
		const temp = document.querySelector('.swal2-popup');
		temp!.className = 'transparent-background'
	};

	const MaterialInputs = () => {
		return (
			<div className="inputs-container">
				{inputs.map((hint, index) => {
						if(hint.includes("Link")) return <input placeholder={hint} key={index} ref={bookLinkInput} onChange={(e) => inputHandler(e, index)}  />
						return <input placeholder={hint} key={index} onChange={(e) => inputHandler(e, index) } />
					}
				)}
				{<textarea placeholder='Describe the Material' ref={textAreaRef} onFocus={()=>{
						textAreaRef.current!.style.overflowY ='scroll';
					}} onBlur={()=> {
						textAreaRef.current!.style.overflow ='hidden';
					}}/> 
				}
				<DropZone {...{bookLinkInput, results}}/>
				<div className="submit-material-button" onClick={submitHandler}>
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
        <div className='book-entry-method'>
            <MaterialInputs />
			<Materialpreviewer />
        </div>
    )
}
