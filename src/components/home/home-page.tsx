import { validateUserOrSignHimIn } from '../../utilities/user-checker';
import NavBar from './nav-bar/nav-bar';
import SideBar from './side-bar/side-bar';

import '../../styles/home/home-style.css';
import DynamicContentSection from './subpages/dynamic-content-section';
import { useEffect, useState } from 'react';
import { APIsCaller } from '../../requestes/apis-caller';
import { getAllMaterials, getAllUnis } from '../../requestes/uni-requests/university';
import { DynamicContentContext } from '../../contexts/home-context/dynamic-content-state-context';
import { getUserProfile } from '../../requestes/user-requestes/user';

export default function HomePage() {
	const [ materialsTable, setMaterialsTable ] = useState<any>({});
	const [ unisDataList, setUnisDataList ] = useState<any[]>([]);
	const [ user, setUser ] = useState<any>({});
	// TODO very very very very important
	// refactor this shit (language)
	// do a check on the status if its ok or not for all the requests
	useEffect(() => {
		validateUserOrSignHimIn();
		const getData = async () => {
			const { data: userData } = await APIsCaller({ api: getUserProfile });
			if (userData && userData.userProfile) setUser(userData);
			const { data: allMaterials } = await APIsCaller({ api: getAllMaterials });
			if (allMaterials && allMaterials.materialsTable) setMaterialsTable(allMaterials.materialsTable);
			const { data: allUniversites } = await APIsCaller({ api: getAllUnis });
			const { unisList } = allUniversites! || [];
			setUnisDataList(unisList);
		};
		getData();
	}, []);
	return (
		<div className="home-page">
			<DynamicContentContext.Provider
				value={{ materialsTable, setMaterialsTable, unisDataList, setUnisDataList, user, setUser }}
			>
				<NavBar />
				<SideBar />
				<DynamicContentSection />
			</DynamicContentContext.Provider>
		</div>
	);
}
