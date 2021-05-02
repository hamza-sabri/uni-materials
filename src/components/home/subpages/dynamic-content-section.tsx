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
	profileRoute,
	updateTopic,
	addResMethods,
	materialInfoRoute,
	notFoundRoute,
	guidanceRoute
} from '../../../constants/pages-route';

// components
import DataEntryPage from '../../../pages/data-entry-page';
import AddByBookPage from '../../../pages/book-entry-page';
import AddManuallyPage from '../../../pages/manual-entry';
import UniManagerPage from '../../../pages/uni-manager-page';
import ViewerPage from '../../../pages/view-page';
import ProfilePage from '../../../pages/profile-page';
import MaterialInfoPage from '../../../pages/material-info-page';
import FourOFour from '../../404/404-componant';
import GuidancePage from '../../../pages/guidance';
import UpdateTopic from '../../../components/home/subpages/data-entry/update-topic'

export default function DynamicContentSection() {
	return (
		<div className="dynamic-content-section">
			<Switch>
				<Route path={dataEntryRoute} exact component={DataEntryPage} />
				<Route path={bookEntryRoute} exact component={AddByBookPage} />
				<Route path={manualEntryRoute} exact component={AddManuallyPage} />
				<Route path={uniMangerRoute} exact component={UniManagerPage} />
				<Route path={updatematerialsRoute} exact component={ViewerPage} />
				<Route path={materialInfoRoute} exact component={ViewerPage} />
				<Route path={notFoundRoute} exact component={FourOFour} />
				<Route path={`${materialInfoRoute}/:matID`} exact component={MaterialInfoPage} />
				<Route path={cretateTopics} exact component={ViewerPage} />
				<Route path={profileRoute} exact component={ProfilePage} />
				<Route path={`${addResMethods}/:matID/:topicID`} exact component={DataEntryPage} />
				<Route path={`${updateTopic}`} component={UpdateTopic} />
				<Route path={`${updateTopic}/:id/`} component={AddManuallyPage} />
				<Route path={`${manualEntryRoute}/:id`} component={AddManuallyPage} />
				<Route path={guidanceRoute} component={GuidancePage} />

				{/*if no route matches  */}
				<Route component={FourOFour}/>
			</Switch>
		</div>
	);
}