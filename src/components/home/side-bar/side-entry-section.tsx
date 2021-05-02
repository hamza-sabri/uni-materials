import React, { useEffect } from 'react';
import SideBarCard from './side-bar-card';
import { sideBarSectionInterface } from '../../../interfaces/side-bar/side-bar-section-interface';
import gsap from 'gsap'

export default function SideBarSection({ sectionTitle, sectionCards }: sideBarSectionInterface) {
	useEffect(()=>{
		gsap.fromTo('.side-bar-card',{
			opacity:0,
			x: "-200%"
		},
		{x:0, opacity:1, duration:0.1, stagger:.08, ease:"ease-in-out"})
	},[])
	
	return (
		<nav className="side-bar-section">
			{sectionCards.map((card, index) => <SideBarCard {...card} key={index} />)}
		</nav>
	);
}
