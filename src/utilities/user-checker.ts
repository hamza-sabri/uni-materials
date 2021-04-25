import { getUserCredentials } from '../requestes/user-requestes/user';
import history from '../history/credationls-history';
import { homePageRoute, singinPageRoute } from '../constants/pages-route';

// checking if the user is already loged in or not by checking his/her email
const validateUserOrSignHimIn = () => {
	const { email } = getUserCredentials();
	if (!email) history.push(singinPageRoute);
};

const alreadyLogedIn = ()=>{
	const { email: storedEmail} = getUserCredentials();
	if(storedEmail)  history.push(homePageRoute);
}

export { validateUserOrSignHimIn, alreadyLogedIn };
