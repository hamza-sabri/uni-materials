import React from 'react';
import SideBarCard from './side-bar-card';
import { sideBarSectionInterface } from '../../../interfaces/side-bar/side-bar-section-interface';

export default function SideBarSection({ sectionTitle, sectionCards }: sideBarSectionInterface) {
	return (
		<nav className="side-bar-section">
			{/* <div className="section-title">{sectionTitle}</div> */}
			{sectionCards.map((card, index) => <SideBarCard {...card} key={index} />)}
		</nav>
	);
}
