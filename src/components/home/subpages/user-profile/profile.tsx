import React, { useEffect, useState, useContext } from 'react';
import Avatar from './avatar';
import "../../../../styles/dynamic-content/user-profile/user-profile.css";

import { APIsCaller } from '../../../../requestes/apis-caller';
import { getUserProfile } from '../../../../requestes/user-requestes/user';
import { DynamicContentContext } from '../../../../contexts/home-context/dynamic-content-state-context';

export default function Profile() {
	const [flag, setFlag] = useState(false);
	const [state, setstate] = useState<any>(null);
	const { unisDataList, setUnisDataList } = useContext(DynamicContentContext);

	useEffect(() => {
		const obj  = async () => {
		  const {data, status} = await APIsCaller({api: getUserProfile}); 
		  setstate(data);
		  setFlag(true);
		} 
		obj();
	  }, []);
	return <div>

		{flag && unisDataList.length && <Avatar data={state} unisDataList={unisDataList}/>}
		
	</div>;
}
