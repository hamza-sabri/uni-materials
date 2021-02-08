import React, { useState } from 'react';
import '../../styles/signup-styles/signup-main.css';
import SignupForm from './signup-forms';
import SignupImage from './signup-image';
import { namesForm } from '../../constants/form-arrays';
import { formPageInterface } from '../../interfaces/forms/signup-form';

export default function SignupContainer() {
	const [ formPage, setFormPage ] = useState<formPageInterface>(namesForm);

	return (
		<div className="signup-container">
			<SignupImage />
			<div className="signup-content">
				<SignupForm {...{ formPage, setFormPage }} />
			</div>
		</div>
	);
}
