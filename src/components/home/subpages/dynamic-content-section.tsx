import '../../../styles/dynamic-content/dynamic-content-section.css';
import { Route, Switch } from 'react-router-dom';

// routes
import {
	bookEntryRoute,
	cretateTopics,
	dataEntryRoute,
	manualEntryRoute,
	updatematerialsRoute,
	uniMangerRoute,
	updateTopic,
	addResMethods
} from '../../../constants/pages-route';

// components
import DataEntryPage from '../../../pages/data-entry-page';
import AddByBookPage from '../../../pages/book-entry-page';
import AddManuallyPage from '../../../pages/manual-entry';
import UniManagerPage from '../../../pages/uni-manager-page';
import ViewerPage from '../../../pages/view-page';

export default function DynamicContentSection() {
	return (
		<div className="dynamic-content-section">
			<Switch>
				<Route path={dataEntryRoute} exact component={DataEntryPage} />
				<Route path={bookEntryRoute} exact component={AddByBookPage} />
				<Route path={manualEntryRoute} exact component={AddManuallyPage} />
				<Route path={uniMangerRoute} exact component={UniManagerPage} />
				<Route path={updatematerialsRoute} exact component={ViewerPage} />
				<Route path={cretateTopics} exact component={ViewerPage} />
				<Route path={`${addResMethods}/:matID/:topicID`} exact component={DataEntryPage} />
				<Route path={`${updateTopic}/:id/`} component={AddManuallyPage} />
				<Route path={`${manualEntryRoute}/:id`} component={AddManuallyPage} />
			</Switch>
		</div>
	);
}