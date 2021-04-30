import React, { useContext, useEffect, useState } from 'react';
import defualtUserImage from '../../../assets/home/nav-bar/user.svg';
import { DynamicContentContext } from '../../../contexts/home-context/dynamic-content-state-context';
export default function NavBarOptions() {
	const {user} = useContext(DynamicContentContext);
	const [UserName, setUserName] = useState<string>("");

	useEffect(()=> {
		const firstName:string = user.userProfile?.firstName || "";
		const lastName:string = user.userProfile?.lastName || "";
		if(firstName === "" || lastName === "") setUserName("");
		else setUserName(`${firstName} ${lastName}`);
	},[user]);

	return (
		<div className="bar-options">
			<div className="option-wrpper">
				<div className="user-avatar">
					<img alt="" src={user.userProfile?.profileAvatar || defualtUserImage} onClick={()=> console.log('TODO go to the profile page')}/>
				</div>
				<div className="user-name">{UserName}</div>
			</div>
		</div>
	);
}
