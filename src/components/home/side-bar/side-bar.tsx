import SideBarSection from './side-entry-section';
import { dataEntrySectionCards } from '../../../constants/side-bar-section-cards';

export default function SideBar() {
	return (
		<div className="side-bar">
			<SideBarSection {...dataEntrySectionCards} />
		</div>
	);
}
