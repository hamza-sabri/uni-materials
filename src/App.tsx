import { userCredentials } from './interfaces/user/credentials';
import { signin } from './requestes/user';

function App() {
	const test = async() => {
		const newUser: userCredentials = {
			email: 'ahmad.badran.19999@gmail.com',
			password: 'hamoz2000@@xX'
		};
		console.log(await signin(newUser));
	};
	return (
		<div className="App">
			<button onClick={test}>send data</button>
		</div>
	);
}

export default App;
