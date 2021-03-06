import '../../../../styles/data-entry-styles/book/book-entry.css';
import { useContext, useRef } from 'react';
import '../../../../styles/data-entry-styles/manual/manual-entry.css';
import emptySVG from '../../../../assets/data-entry-assets/empty.svg';
import Swal from 'sweetalert2';
import DropZone from './drop-zone';
import axios from 'axios';
import { splitURl } from '../../../../constants/urls';
import { APIsCaller } from '../../../../requestes/apis-caller';
import { addMaterialByBook } from '../../../../requestes/material-requests/mateirla';
import { DynamicContentContext } from '../../../../contexts/home-context/dynamic-content-state-context';
import { CREATED, OK } from '../../../../constants/status-codes';
import { hideLoading, showLoading } from '../../../../utilities/alearts';

export default function AddByBook({ inputs }: { inputs: string[]; }) {
	const materialName = useRef<HTMLPreElement>(null);
	const bookLinkInput = useRef<HTMLInputElement>(null);
	const previewer = useRef<HTMLImageElement>(null);
	const emptyName: string = '???? ????';
	const results: string[] = new Array(inputs.length).fill('');
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const {materialsTable, setMaterialsTable } = useContext(DynamicContentContext);


	const inputHandler = (e: any, index: number) => {
		const value: string = e.target.value || '';
		if (index === 0) materialName.current!.innerHTML = value !== '' ? value : emptyName;
		else if (index === 1) {
			previewer.current!.src = (value !== '' ? value : emptySVG)
		}
		results[index] = value;
	};

	const submitHandler = () => {
		let emptyIndex: number = -1;
		results.forEach((result, index) => (result === '' || !result) ? emptyIndex = index : '')
		if (emptyIndex !== -1) Swal.fire('Ops!', `Sorry but the "${inputs[emptyIndex]}" is required`, 'error');
		else submitMaterial();
	}

	const submitMaterial = async () => {
		Swal.showLoading();
		const requestBody:any = {
			materialName: results[0],
			materialPhoto: results[1],
			materialNumber: results[2],
			materialDesc: textAreaRef?.current?.value || '',
			totalRate: 5
		}
		showLoading(1);
		try{
			const {data,status} = await axios.post(splitURl, { filename: requestBody.materialName, url: results[3] });
			// check if the status from husieen is not somthing then show an err
			if(status === OK || status === CREATED){
			requestBody.topics = data;
			const {data:createdMaterial, status:creatingStatus}= await APIsCaller({api:addMaterialByBook, requestBody});
			if(creatingStatus === CREATED){
				const createdID = createdMaterial.materialID;
				delete requestBody.topics;
				updateMaterialLocally(createdID, requestBody);
				hideLoading();
				Swal.fire('Congrants', createdMaterial.message, 'success')
			}else showError();
		}else showError();
			
		} catch(err){
			hideLoading();
			// TODO show an err message
		}

	}
	const showError = ()=> Swal.fire('Ops!','something went wrong please try again latter','error')

	const updateMaterialLocally = (matID:string, newMat:any)=>{
		const newData = {
			...materialsTable,
			[matID]: newMat
		}
		setMaterialsTable(()=> newData);
	}

	const MaterialInputs = () => {
		return (
			<div className="inputs-container">
				{inputs.map((hint, index) => {
					if (hint.includes("Link")) return <input placeholder={hint} key={index} ref={bookLinkInput} onChange={(e) => inputHandler(e, index)} />
					return <input placeholder={hint} key={index} onChange={(e) => inputHandler(e, index)} />
				}
				)}
				{<textarea placeholder='Describe the Material' ref={textAreaRef} onFocus={() => {
					textAreaRef.current!.style.overflowY = 'scroll';
				}} onBlur={() => {
					textAreaRef.current!.style.overflow = 'hidden';
				}} />
				}
				<DropZone {...{ bookLinkInput, results }} />
				<div className="submit-material-button" onClick={submitHandler}>
					Submit
				</div>
			</div>
		);
	};

	const Materialpreviewer = () => {
		return (
			<div className="material-previewer-container">
				<div className="material-previewer" >
					<img src={emptySVG} alt="card-img" ref={previewer}/>
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
