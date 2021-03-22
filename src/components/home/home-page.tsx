import { validateUserOrSignHimIn } from '../../utilities/user-checker';
import NavBar from './nav-bar/nav-bar';
import SideBar from './side-bar/side-bar';

import '../../styles/home/home-style.css';
import DynamicContentSection from './subpages/dynamic-content-section';
import { useEffect, useState } from 'react';
import { APIsCaller } from '../../requestes/apis-caller';
import { getAllMaterials } from '../../requestes/uni-requests/university';
import { DynamicContentContext } from '../../contexts/home-context/dynamic-content-state-context';

export default function HomePage() {
	validateUserOrSignHimIn();
	const [ materialsTable, setMaterialsTable ] = useState<any>({});
	// TODO very very very very important
	/**
	 * very important 
	 * here do all the requests needed for the platform once
	 * ie: the user profile
	 * uni manger data
	 * all materials ...
	 */
	useEffect(() => {
		const getData = async () => {
			const { data: allMaterials } = await APIsCaller({ api: getAllMaterials });
			if (allMaterials && allMaterials.materialsTable) setMaterialsTable(allMaterials.materialsTable);
		};
		getData();
	}, []);
	return (
		<div className="home-page">
			<NavBar />
			<SideBar />
			<DynamicContentContext.Provider value={{ materialsTable, setMaterialsTable }}>
				<DynamicContentSection />
			</DynamicContentContext.Provider>
		</div>
	);
}
