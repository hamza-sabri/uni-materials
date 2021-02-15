import { validateUserOrSignHimIn } from '../../utilities/user-checker';
import React from 'react';
import NavBar from './nav-bar';
import SideBar from './side-bar';

import '../../styles/home/home-style.css';
import DynamicContentSection from './dynamic-content-section';

export default function HomePage() {
	validateUserOrSignHimIn();
	return (
		<div className="home-page">
			<NavBar />
			<SideBar />
			<DynamicContentSection />
		</div>
	);
}
