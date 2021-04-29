import { useContext, useEffect, useRef } from 'react';
import Avatar from './avatar';
import lottie from 'lottie-web';
import '../../../../styles/dynamic-content/user-profile/user-profile.css';
import loadingProfileAnim from '../../../../assets/home/profile/loading-profile.json'

import { DynamicContentContext } from '../../../../contexts/home-context/dynamic-content-state-context';

export default function Profile() {
	const { unisDataList, user, setUser } = useContext(DynamicContentContext);
	const loadingRef = useRef<HTMLDivElement>(null);

	// replace the empty div with a loading container

	useEffect(() => {
		lottie.loadAnimation({
			container: loadingRef.current!,
			autoplay: true,
			renderer: 'svg',
			loop: true,
			animationData: loadingProfileAnim
		});
	}, []);

	const LoadingProfile = ()=>{
		return (
			<div className="user-profile-loading">
				<div className="profile-loading" ref={loadingRef} />
			</div>
		)
	}

	return (
		<div>
			{!user.userProfile? <LoadingProfile />: <Avatar data={user} unisDataList={unisDataList} setUser={setUser} />}
			
		</div>
	);
}
