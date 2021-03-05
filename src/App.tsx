import { Router, Route, Switch } from 'react-router-dom';
import { homePageRoute, signupPageRoute, singinPageRoute } from './constants/pages-route';
import history from './history/credationls-history';

// pages
import Signup from './pages/signup';
import Home from './pages/home';
import Login from './pages/signin';

function App() {
	return (
		<div className="App">
			<Router history={history}>
				<Switch>
					<Route path={signupPageRoute} exact component={Signup} />
					<Route path={singinPageRoute} exact component={Login} />
					<Route path={homePageRoute} component={Home} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
