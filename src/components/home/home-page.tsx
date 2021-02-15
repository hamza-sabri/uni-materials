import { validateUserOrSignHimIn } from '../../utilities/user-checker';
import React from 'react';
import NavBar from './nav-bar';

import '../../styles/home/home-style.css'
import SideBar from './side-bar';
export default function HomePage() {
	validateUserOrSignHimIn();
	return <div className='home-page'>
		<NavBar />
		<SideBar />
	</div>;
}
