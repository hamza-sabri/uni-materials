import { useContext } from 'react';
import Avatar from './avatar';
import '../../../../styles/dynamic-content/user-profile/user-profile.css';

import { DynamicContentContext } from '../../../../contexts/home-context/dynamic-content-state-context';

export default function Profile() {
	const { unisDataList, user, setUser } = useContext(DynamicContentContext);

	// replace the empty div with a loading container

	return (
		<div>
			{!user.userProfile? <div></div>: <Avatar data={user} unisDataList={unisDataList} setUser={setUser} />}
			
		</div>
	);
}
