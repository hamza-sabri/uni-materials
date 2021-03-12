import React from 'react';
import { NavLink } from 'react-router-dom';

type DataEntryMethodsInterface = {
	img: string;
	method: string;
	routeTo: string;
	alt: string;
};

export default function DataEntryMethods({ img, method, routeTo, alt }: DataEntryMethodsInterface) {
	return (
		<NavLink className="data-entry-method" to={routeTo}>
			<img src={img} alt={alt} className="data-entry-method-img" />
			<div className="method-container">
				<div className="method">{method}</div>
			</div>
		</NavLink>
	);
}
