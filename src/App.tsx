import Signup from './pages/signup';
import { Router, Route, Switch } from 'react-router-dom';
import { homePageRoute, signupPageRoute } from './constants/pages-route';
import history from './history/credationls-history';
import Home from './pages/home';
function App() {
	return (
		<div className="App">
			<Router history={history}>
				<Switch>
					<Route path={signupPageRoute} component={Signup} />
					<Route path={homePageRoute} exact component={Home} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
