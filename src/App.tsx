import { Router, Route, Switch } from 'react-router-dom';
import { homePageRoute, signupPageRoute, singinPageRoute } from './constants/pages-route';
import history from './history/credationls-history';

// pages
import Signup from './pages/signup';
import Home from './pages/home';
import Login from './pages/signin';
import { APIsCaller } from './requestes/apis-caller';
import { updateUni } from './requestes/uni-requests/university';
function App() {
	const testing = async () => {
		const requestBody = {
			name: 'Alnajah3',
			locations: [ 'every where', 'Qalqelea', 'Tulkarem', 'Ramallah', 'Nuablus', 'Heabron' ],
			fields: [ 'CSE', 'IVR', 'WTF' ]
		};
		const requestParams = { uniID: 'ag6J3LCkxENy9DegEtP5' };
		const { status, data } = await APIsCaller({ api: updateUni, requestBody, requestParams });
		console.log(status);
	};
	testing();
	return (
		<div className="App">
			<Router history={history}>
				<Switch>
					<Route path={signupPageRoute} component={Signup} />
					<Route path={singinPageRoute} component={Login} />
					<Route path={homePageRoute} exact component={Home} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
