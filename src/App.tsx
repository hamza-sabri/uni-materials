import { userCredentials } from './interfaces/user/credentials';
import { getUserCredentials, signin, signup } from './requestes/user';

function App() {
	const test = async () => {

		const existedUser: userCredentials = {
			email: 'ahmad.badran.19999@gmail.com',
			password: 'hamoz2000@@xX'
		};
		const newUser: userCredentials = {
			email: 'abohmade20asd2@gmail.com',
			password: 'hamoz2000@@xX',
			firstName: 'Ahmad',
			lastName: 'guze',
			universityName: 'PTUK',
			field: 'CSE',
			studentNumber: '201710163',
			universityLocation: 'Tulkarem'
		};
		console.log(await signin(existedUser));
		console.log(await signup(newUser));
		console.log(getUserCredentials());
	};
	return (
		<div className="App">
			<button onClick={test}>send data</button>
		</div>
	);
}

export default App;
