import { validateUserOrSignHimIn } from '../../utilities/user-checker';
import NavBar from './nav-bar/nav-bar';
import SideBar from './side-bar/side-bar';

import FourOFour from './../404/404-componant';

import '../../styles/home/home-style.css';
import DynamicContentSection from './subpages/dynamic-content-section';
import { useEffect, useState } from 'react';
import { APIsCaller } from '../../requestes/apis-caller';
import { getAllMaterials, getAllUnis } from '../../requestes/uni-requests/university';
import { DynamicContentContext } from '../../contexts/home-context/dynamic-content-state-context';

export default function HomePage() {
	validateUserOrSignHimIn();
	const [ materialsTable, setMaterialsTable ] = useState<any>({});
	const [unisDataList, setUnisDataList] = useState<any[]>([]);
	// TODO very very very very important
	// refactor this shit (language)
	// do a check on the status if its ok or not for all the requests
	useEffect(() => {
		const getData = async () => {
			const { data: allMaterials } = await APIsCaller({ api: getAllMaterials });
			if (allMaterials && allMaterials.materialsTable) setMaterialsTable(allMaterials.materialsTable);
			const { data: allUniversites } = await APIsCaller({ api: getAllUnis });
			const { unisList } = allUniversites! ||  [];
			setUnisDataList(unisList);
		};
		getData();
	}, []);
	return (
		<div className="home-page">
			<NavBar />
			<SideBar />
			<DynamicContentContext.Provider value={{ materialsTable, setMaterialsTable, unisDataList, setUnisDataList }}>
				<DynamicContentSection />
			</DynamicContentContext.Provider>
		</div>
	);
}
