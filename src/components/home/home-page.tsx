import { validateUserOrSignHimIn } from '../../utilities/user-checker';
import React, { useState } from 'react';
import NavBar from './nav-bar/nav-bar';
import SideBar from './side-bar/side-bar';

import '../../styles/home/home-style.css';
import DynamicContentSection from './subpages/dynamic-content-section';
import { DynamicContentStateContext } from '../../contexts/home-context/dynamic-content-state-context';

export default function HomePage() {
	const [ currentPage, setCurrentPage ] = useState<JSX.Element>(<div />);
	validateUserOrSignHimIn();
	return (
		<div className="home-page">
			<NavBar />
			<DynamicContentStateContext.Provider value={setCurrentPage}>
				<SideBar />
			</DynamicContentStateContext.Provider>
			<DynamicContentSection {...{ currentPage }} />
		</div>
	);
}
