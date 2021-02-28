import { Router, Route, Switch } from 'react-router-dom';
import { dataEntryRoute, homePageRoute, signupPageRoute, singinPageRoute } from './constants/pages-route';
import history from './history/credationls-history';

// pages
import Signup from './pages/signup';
import Home from './pages/home';
import Login from './pages/signin';
import DynamicContentSection from './components/home/subpages/dynamic-content-section';
function App() {
	return (
		<div className="App">
			<Router history={history}>
				<Route path={signupPageRoute} exact component={Signup} />
				<Route path={singinPageRoute} exact component={Login} />
				<Route path={homePageRoute} component={Home} />
			</Router>
		</div>
	);
}

export default App;
