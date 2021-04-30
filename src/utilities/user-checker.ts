import history from '../history/credationls-history';
import { homePageRoute, singinPageRoute } from '../constants/pages-route';
import { isLogedin } from '../requestes/user-requestes/user';

// checking if the user is already loged in or not by checking his/her email
const validateUserOrSignHimIn = () => {
	const user = isLogedin();
	if (!user || user === null) history.push(singinPageRoute);
};

const alreadyLogedIn = ()=>{
	const user = isLogedin();
	if(user)  history.push(homePageRoute);
}

export { validateUserOrSignHimIn, alreadyLogedIn };
