import { APIsCaller } from './requestes/apis-caller';
import { getAllUnis } from './requestes/uni-requests/university';
import { signin, signup } from './requestes/user-requestes/user';
import Signup from './pages/signup';

function App() {
	const test = async () => {
		// const existedUser: userCredentials = {
		// 	email: 'ahmad.badran.19999@gmail.com',
		// 	password: 'hamoz2000@@xX'
		// };

		// const newUser: userCredentials = {
		// 	email: 'abohmade20asd2@gmail.com',
		// 	password: 'hamoz2000@@xX',
		// 	firstName: 'Ahmad',
		// 	lastName: 'guze',
		// 	universityName: 'PTUK',
		// 	field: 'CSE',
		// 	studentNumber: '201710163',
		// 	universityLocation: 'Tulkarem'
		// };

		// console.log(await signin(existedUser));
		// console.log(await signup(newUser));
		// console.log(getUserCredentials());
		console.log(await APIsCaller(getAllUnis));
	};
	return (
		<div className="App">
			{/* <button onClick={test}>send data</button> */}
			<Signup />
		</div>
	);
}

export default App;
