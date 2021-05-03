import React, { useState } from 'react';
import '../../styles/logins/login.css';
import '../../styles/logins/login-animations.css';
import ForgotPassword from './forgotPassword';
import SignUpButton from './signUpButton';
import { isLogedin, signin } from '../../requestes/user-requestes/user';
import signinImage from '../../assets/login-assets/sign-in.svg';
import { showAlert } from '../../utilities/alearts';
import { homePageRoute } from '../../constants/pages-route';
import history from '../../history/credationls-history';
import Swal from 'sweetalert2';

export default function LoginPage() {
	isLogedin();
	const [ { email, password }, setCredentials ] = useState({ email: '', password: '' });

	const login = async () => {
		Swal.showLoading();
		const { result, message } = await signin({ email, password });
		if (result) {
			Swal.clickCancel();
			history.push(homePageRoute);
		} else {
			if(message) showAlert({ title: 'Ops', text: message, icon: 'error', confirmButtonText: 'Ok' });
			else showAlert({ title: 'Ops', text: "sorry somethig went wrong pleas try again", icon: 'error', confirmButtonText: 'Ok' });
		}
	};

	return (
		<div className="login-container">
			<div className="login-design inner-div">
				<img className="icon" src={signinImage} alt="what" />
			</div>

			<div className="login-form inner-div">
				<h1 className="login-h1">Log in</h1>

				<div className="card">
					<input
						className="input form-control"
						placeholder="Email"
						value={email}
						type="email"
						onChange={(event) =>
							setCredentials({
								email: event.target.value,
								password
							})}
					/>
					<input
						className="input form-control"
						placeholder="Password"
						type="password"
						value={password}
						onChange={(event) =>
							setCredentials({
								email,
								password: event.target.value
							})}
					/>
					<button className="btn" type="submit" onClick={login}>
						Login
					</button>
				</div>
				<ForgotPassword />
				<span>don't have an account?</span>
				<SignUpButton />
			</div>
		</div>
	);
}
