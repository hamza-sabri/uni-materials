import { userCredentials } from '../interfaces/user/credentials';
import { urlConcatenator, signinRoute, signupRoute } from '../constants/urls';
import { emailKey, IDTokenKey, passwordKey } from '../constants/local-storage-keys';
import { CREATED, OK } from '../constants/status-codes';
import { signinError, signUpError } from '../constants/messages';

const axios = require('axios').default;

// this function is called if the user wants to signin or to refresh his IDToken if needed
const signin = async (userData: userCredentials): Promise<boolean> => {
	try {
		// extract all needed data
		const { email, password } = userData;
		const signInPath = urlConcatenator([ signinRoute ]);
		const { status, data } = await axios.post(signInPath, { email: email, password: password });

		// if the response status is not OK then throw an error else save the token
		if (status !== OK) throw new Error(signinError);
		saveLocaly(IDTokenKey, data.IDToken);
		return true;
	} catch (err) {
		return false;
	}
};

const signup = async (userData: userCredentials): Promise<boolean> => {
	try {
		const signUpPath = urlConcatenator([ signupRoute ]);
		const { status, data } = await axios.post(signUpPath, userData);

		if (status !== CREATED) throw new Error(signUpError);
		saveUserCredentials(userData, data.IDToken);

		return true;
	} catch (err) {
		return false;
	}
};

const saveUserCredentials = (userData: userCredentials, IDToken: string) => {
	saveLocaly(IDTokenKey, IDToken);
	saveLocaly(emailKey, userData.email);
	saveLocaly(passwordKey, userData.password);
};

const getUserCredentials = (): userCredentials => {
	const savedUser: userCredentials = {
		email: getStoredItems(emailKey)!,
		password: getStoredItems(passwordKey)!,
		IDToken: getStoredItems(IDTokenKey)!
	};
	return savedUser;
};

const saveLocaly = (localStorageKey: string, data: string) => localStorage.setItem(localStorageKey, data);

const getStoredItems = (localStorageKey: string): string | null => localStorage.getItem(localStorageKey);

export { signin, getStoredItems, signup, getUserCredentials };
