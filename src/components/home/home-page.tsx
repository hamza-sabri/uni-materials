import { validateUserOrSignHimIn } from '../../utilities/user-checker';
import NavBar from './nav-bar/nav-bar';
import SideBar from './side-bar/side-bar';

import '../../styles/home/home-style.css';
import DynamicContentSection from './subpages/dynamic-content-section';

export default function HomePage() {
	validateUserOrSignHimIn();
	// TODO very very very very important
	/**
	 * very important 
	 * here do all the requests needed for the platform once
	 * ie: the user profile
	 * uni manger data
	 * all materials ...
	 */
	return (
		<div className="home-page">
			<NavBar />
			<SideBar />
			<DynamicContentSection />
		</div>
	);
}
