import React, { useState, useEffect } from 'react';
import SignupContainer from '../components/signup/signup-container';
import { UniDataContext } from '../contexts/signup-context/uni-data-context';
import { APIsCaller } from '../requestes/apis-caller';
import { getAllUnis } from '../requestes/uni-requests/university';
import '../styles/signup-styles/signup-animations.css';

export default function Signup() {
	const [ unisDataList, setUnisDataList ] = useState<any[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const { data } = await APIsCaller(getAllUnis);
			const { unisList } = data;
			setUnisDataList(unisList);
		};
		fetchData();
	}, []);
	return (
		<div className="page signup-page">
			<UniDataContext.Provider value={unisDataList}>
				<SignupContainer />
			</UniDataContext.Provider>
		</div>
	);
}
