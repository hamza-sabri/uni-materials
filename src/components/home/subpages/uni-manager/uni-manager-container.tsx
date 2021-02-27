import React, { useState } from 'react';
import '../../../../styles/dynamic-content/uni-manager/uni-manager.css';
import UniManagerInfo from './uni-manager-info';

export default function UniManagerContainer() {
	const [ uniManagerResult, setUniManagerResult ] = useState({
		uniID: '',
		uniName: '',
		uniLocations: [],
		uniMajors: []
	});

	return (
		<div className="uni-manager-container-2">
			<UniManagerInfo {...{ uniManagerResult, setUniManagerResult }} />
		</div>
	);
}
