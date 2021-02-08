import { formPageInterface } from '../interfaces/forms/signup-form';

// if the user is on the first step of signup
const namesForm: formPageInterface = {
	inputTypes: [ 'text', 'text' ],
	inputMessages: [ 'first name', 'last name' ],
	buttonMessages: [ 'next' ],
	pageNumber: 1
};

// if the user is on the second step of signup
const emailPasswordForm: formPageInterface = {
	inputTypes: [ 'email', 'password' ],
	inputMessages: [ 'email', 'password' ],
	buttonMessages: [ 'previous', 'next' ],
	pageNumber: 2
};

// if the user is on the final step of signup
const uniForm: formPageInterface = {
	inputTypes: [ 'dropdown', 'dropdown', 'dropdown' ],
	inputMessages: [ 'university name', 'university location', 'major name' ],
	buttonMessages: [ 'previous', 'submit' ],
	pageNumber: 3
};

export { namesForm, emailPasswordForm, uniForm };
