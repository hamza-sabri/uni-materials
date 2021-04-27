import React, { useState } from 'react';
import '../../styles/signup-styles/signup-main.css';
import SignupForm from './signup-forms';
import SignupImage from './signup-image';
import { namesForm } from '../../constants/form-arrays';
import { formPageInterface } from '../../interfaces/forms/signup-form';
import { alreadyLogedIn } from '../../utilities/user-checker';

export default function SignupContainer() {
	alreadyLogedIn();
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
