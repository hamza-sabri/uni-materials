import { getUserCredentials } from '../requestes/user-requestes/user';
import history from '../history/credationls-history';
import { singinPageRoute } from '../constants/pages-route';

// checking if the user is already loged in or not by checking his/her email
const validateUserOrSignHimIn = () => {
	const { email } = getUserCredentials();
	if (!email) history.push(singinPageRoute);
};

export { validateUserOrSignHimIn };
