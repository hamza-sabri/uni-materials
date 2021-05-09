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
	allTopicRes,
	updateTopicRes,
	addResMethods,
	materialInfoRoute,
	notFoundRoute,
	scheduleRoute,
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
import SchedulePage from '../../../pages/schedule-page';
import GuidancePage from '../../../pages/guidance';
import UpdateTopic from '../../../components/home/subpages/data-entry/update-topic'
import NotFoundPage from '../../../pages/not-found-page';
import ViewAllTopicRes from '../subpages/data-entry/view-all-res'
import UpdateRes from '../subpages/data-entry/update-res';

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
				<Route path={notFoundRoute} exact component={NotFoundPage} />
				<Route path={`${materialInfoRoute}/:matID`} exact component={MaterialInfoPage} />
				<Route path={cretateTopics} exact component={ViewerPage} />
				<Route path={profileRoute} exact component={ProfilePage} />
				<Route path={scheduleRoute} exact component={SchedulePage} />
				<Route path={`${addResMethods}/:matID/:topicID`} exact component={DataEntryPage} />
				<Route path={`${updateTopic}`} exact component={UpdateTopic} />
				<Route path={`${updateTopic}/:id/`} exact component={AddManuallyPage} />
				<Route path={`${manualEntryRoute}/:id`} exact component={AddManuallyPage} />
				<Route path={guidanceRoute} exact component={GuidancePage} />
				<Route path={`${allTopicRes}/:matID/:topicID`} exact component={ViewAllTopicRes}/>
				<Route path={`${updateTopicRes}/:resType/:matID/:topicID/:resID`} exact component={UpdateRes}/>

				{/*if no route matches  */}
				<Route component={NotFoundPage}/>
			</Switch>
		</div>
	);
}