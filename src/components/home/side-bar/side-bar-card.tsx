import React, { useContext } from 'react';
import { DynamicContentStateContext } from '../../../contexts/home-context/dynamic-content-state-context';
import { sideBarCardInterface } from '../../../interfaces/side-bar/side-bar-interfaces';

export default function SideBarCard({ cardName, cardIcon, routeTo }: sideBarCardInterface) {
	const setCurrentPage = useContext(DynamicContentStateContext);

	return (
		<div className="side-bar-card" onClick={() => setCurrentPage!(() => routeTo)}>
			<img className="card-icon" alt="card icon" src={cardIcon} />
			<div className="card-name">{cardName}</div>
		</div>
	);
}
