import React from 'react';
import { formInterface } from '../../interfaces/forms/signup-form';
import FormButtons from './form-buttons';
import FormInputs from './form-inputs';

export default function SignupForm({ formPage, setFormPage, signupResult, setSignupResult }: formInterface) {
	return (
		<div className="signup-content">
			<h1>Signup</h1>
			<div className="signup-form ">
				<FormInputs {...{ formPage, signupResult, setSignupResult }} />
				<FormButtons {...{ formPage, setFormPage }} />
			</div>
		</div>
	);
}
