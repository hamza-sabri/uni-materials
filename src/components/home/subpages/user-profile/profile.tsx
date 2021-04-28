import { useContext } from 'react';
import Avatar from './avatar';
import '../../../../styles/dynamic-content/user-profile/user-profile.css';

import { DynamicContentContext } from '../../../../contexts/home-context/dynamic-content-state-context';

export default function Profile() {
	const { unisDataList, user, setUser } = useContext(DynamicContentContext);

	return (
		<div>
			{/* if the user in undefined or null .... show a loading screan */}
			<Avatar data={user} unisDataList={unisDataList} />
		</div>
	);
}
