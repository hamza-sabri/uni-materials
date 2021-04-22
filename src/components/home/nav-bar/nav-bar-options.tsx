import React from 'react';
import defualtUserImage from '../../../assets/home/nav-bar/user.svg';
export default function NavBarOptions() {
	return (
		<div className="bar-options">
			<div className="option-wrpper">
				<div className="user-avatar">
					<img alt="" src={defualtUserImage} />
				</div>
                <span>log out</span>
			</div>
		</div>
	);
}
