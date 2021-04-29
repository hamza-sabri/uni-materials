import React, { useEffect, useState, useRef } from 'react';
import defualtAvatar from '../../../../assets/home/profile/avatar.png';
import '../../../../styles/dynamic-content/user-profile/user-profile.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ProfileDropZone from './profile-dropzone';
import saveIcon from '../../../../assets/home/profile/save.svg';
import { APIsCaller } from '../../../../requestes/apis-caller';
import { updateUserProfile } from '../../../../requestes/user-requestes/user';
import { OK } from '../../../../constants/status-codes';

interface SelectProtected {
	readonly wrapperElement: HTMLDivElement;
}

export default function Avatar({ data, unisDataList, setUser }: any) {
	const MySwal = withReactContent(Swal);

	const { userProfile } = data;
	const { firstName, lastName, email, universityName } = userProfile;
	const fullName = firstName + ' ' + lastName;
	const [ name, setName ] = useState(fullName);
	const [ Email, setEmail ] = useState(email);
	const [ uniName, setUniName ] = useState(universityName);

	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const uniNameRef = useRef<HTMLInputElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);

	const [ disabled, setDisabled ] = useState(false);

	const tempUnisNames: string[] = unisDataList.map(({ doc }: any) => doc.name) || [];
	const [ unisNames, setUnisNames ] = useState(tempUnisNames);

	let index = 0;
	const [ search, setSearch ] = useState(uniName);
	const [ display, setDisplay ] = useState(false);
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutSide);

		nameRef.current!.disabled = true;
		emailRef.current!.disabled = true;
		uniNameRef.current!.disabled = true;

		return () => {
			document.removeEventListener('mousedown', handleClickOutSide);
		};
	}, []);

	const selectProtected: SelectProtected = {
		wrapperElement: document.createElement('div')
	};
	const wrapperRef = useRef(selectProtected.wrapperElement);

	const handleClickOutSide = (e: any) => {
		const { current: wrap } = wrapperRef;
		if (wrap && !wrap.contains(e.target)) {
			setDisplay(false);
		}
	};

	const setUniDex = (uni: string) => {
		if (unisNames.includes(uni)) {
			setUniName(uni);
		} else {
			setUniName('');
		}
	};

	const submitHandler = async()=>{
		Swal.showLoading();
		try{
			const name:string  = nameRef.current!.value;
			const email:string = emailRef.current!.value;
			const universityName:string = uniNameRef.current!.value;
			const profileAvatar:string = imgRef.current!.src;
			let uniID:string = "";
			unisDataList.forEach(({doc}:any) =>(doc.name === universityName)? uniID = doc.id:"")
			if(uniID === "") Swal.fire("Ops!", "The univeristy you choose no longer exist please try another","error");
			else{
				const [firstName, lastName] = name.split(" ");
				const requestBody = {
					uniID,
					universityName,
					email,
					firstName,
					lastName,
					profileAvatar
				}
				
			const {data, status} = 	await APIsCaller({api:updateUserProfile,requestBody});
			if(status === OK) {
				Swal.fire("Woow!", data.message, "success");
			}else{
				throw new Error("hello")
			}
			}
		}catch(err){
			Swal.fire("Ops!", "Sorry something went wrong please try again latter!","error");
		}
	}

	return (
		<div className="head-div">
			<img
				ref={imgRef}
				alt=""
				className="profile-avatar"
				src={userProfile.profileAvatar || defualtAvatar}
				onDoubleClick={() =>
					MySwal.fire({
						title: 'select image',
						html: <ProfileDropZone imageRef={imgRef} />,
						confirmButtonText: 'save',
						confirmButtonColor: '#766ffa'
					})}
			/>
			<div className="profile-info">
				<input
					ref={nameRef}
					className="profile-info-data user-name"
					value={name}
					placeholder="name"
					onChange={(e) => setName(e.target.value)}
					disabled={disabled}
					onDoubleClick={() => (nameRef.current!.disabled = false)}
					onBlur={() => (nameRef.current!.disabled = true)}
				/>
				<input
					ref={emailRef}
					className="profile-info-data user-email"
					value={Email}
					placeholder="email"
					onChange={(e) => setEmail(e.target.value)}
					disabled={disabled}
					onDoubleClick={() => (emailRef.current!.disabled = false)}
					onBlur={() => (emailRef.current!.disabled = true)}
					style={{ paddingLeft: '1.5rem' }}
				/>
				<input
					ref={uniNameRef}
					className="auto-input input profile-info-data user-uniName"
					onClick={() => setDisplay(true)}
					value={search}
					autoComplete="off"
					onChange={(event) => setSearch(event.target.value)}
					onBlur={(event) => {
						setUniDex(search);
						uniNameRef.current!.disabled = true;
					}}
					placeholder="university name"
					onDoubleClick={() => (uniNameRef.current!.disabled = false)}
				/>
				{display && (
					<div ref={wrapperRef} className="autoContainer">
						{unisNames.filter((uniName: string) => uniName.indexOf(search) > -1).map((uniName: string) => {
							return (
								<div
									onClick={() => {
										setSearch(() => uniName);
										setUniDex(uniName);
										setDisplay(false);
									}}
									className="option"
									key={index++}
								>
									<span className="uni-name-option">{uniName}</span>
								</div>
							);
						})}
					</div>
				)}
			</div>

			<div className="save-button" onClick={submitHandler}>
				<img alt="save" src={saveIcon} />
			</div>
		</div>
	);
}
