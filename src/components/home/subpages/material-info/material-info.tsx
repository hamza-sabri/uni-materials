import React from 'react';
import {match as infoPageMatch} from 'react-router-dom';
export default function MaterialInfo({match}:{match: infoPageMatch<{matID:string}>}) {
	console.log(match.params.matID)
	return (
		<div>
			hussien's component
		</div>
	);
}
