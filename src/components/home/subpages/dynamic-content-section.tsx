import '../../../styles/dynamic-content/dynamic-content-section.css';
import { Router, Route, Switch } from 'react-router-dom';
import homeHistory from '../../../history/home-history';
import { dataEntryRoute } from '../../../constants/pages-route';
import DataEntryPage from '../../../pages/data-entry-page';

export default function DynamicContentSection() {
	return (
		<div className="dynamic-content-section">
			<Switch>
				<Route path={dataEntryRoute} component={DataEntryPage} />
			</Switch>
		</div>
	);
}
