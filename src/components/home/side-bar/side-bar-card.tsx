import { sideBarCardInterface } from '../../../interfaces/side-bar/side-bar-interfaces';
import { NavLink } from 'react-router-dom';
import { clearStorage } from '../../../requestes/user-requestes/user';
export default function SideBarCard({ cardName, cardIcon, routeTo }: sideBarCardInterface) {
	return (
		<NavLink className="side-bar-card" to={routeTo} onClick={() => (cardName === 'Log out' ? clearStorage() : '')}>
			<div className="icon-wrapper">
				<img className="card-icon" alt="card icon" src={cardIcon} />
			</div>
			<div className="card-name">{cardName}</div>
		</NavLink>
	);
}
