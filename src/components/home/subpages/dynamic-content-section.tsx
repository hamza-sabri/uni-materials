import '../../../styles/dynamic-content/dynamic-content-section.css';
import { Route, Switch } from 'react-router-dom';

// routes
import { bookEntryRoute, dataEntryRoute, manualEntryRoute, uniMangerRoute } from '../../../constants/pages-route';

// components
import DataEntryPage from '../../../pages/data-entry-page';
import AddByBookPage from '../../../pages/book-entry-page';
import AddManuallyPage from '../../../pages/manual-entry';
import UniManagerPage from '../../../pages/uni-manager-page';

export default function DynamicContentSection() {
	return (
		<div className="dynamic-content-section">
			<Switch>
				<Route path={dataEntryRoute} exact component={DataEntryPage} />
				<Route path={bookEntryRoute} exact component={AddByBookPage} />
				<Route path={manualEntryRoute} exact component={AddManuallyPage} />
				<Route path={uniMangerRoute} exact component={UniManagerPage} />
			</Switch>
		</div>
	);
}
