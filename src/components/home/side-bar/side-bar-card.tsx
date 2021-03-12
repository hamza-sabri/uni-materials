import { sideBarCardInterface } from '../../../interfaces/side-bar/side-bar-interfaces';
import { NavLink } from 'react-router-dom';
export default function SideBarCard({ cardName, cardIcon, routeTo }: sideBarCardInterface) {
	return (
		<NavLink className="side-bar-card" to={routeTo}>
			<div className="icon-wrapper">
				<img className="card-icon" alt="card icon" src={cardIcon} />
			</div>
			<div className="card-name">{cardName}</div>
		</NavLink>
	);
}
