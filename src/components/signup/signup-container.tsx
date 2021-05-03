import React, { useState } from 'react';
import '../../styles/signup-styles/signup-main.css';
import SignupForm from './signup-forms';
import SignupImage from './signup-image';
import { namesForm } from '../../constants/form-arrays';
import { formPageInterface } from '../../interfaces/forms/signup-form';
import { isLogedin } from '../../requestes/user-requestes/user';

export default function SignupContainer() {
	isLogedin();
	const [ signupResult, setSignupResult ] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		universityLocation: '',
		universityName: '',
		field: '',
		uniID: ''
	});
	const [ formPage, setFormPage ] = useState<formPageInterface>(namesForm);

	return (
		<div className="signup-container">
			<SignupImage />
			<SignupForm {...{ formPage, setFormPage, signupResult, setSignupResult }} />
		</div>
	);
}
