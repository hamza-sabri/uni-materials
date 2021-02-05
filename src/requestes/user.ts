import { userCredentials } from '../interfaces/user/credentials';
import { urlConcatenator, signinRoute } from '../constants/urls';
import { IDTokenKey } from '../constants/local-storage-keys';
import { OK } from '../constants/status-codes';
import { signinError } from '../constants/messages';

const axios = require('axios').default;

// this function is called if the user wants to signin or to refresh his IDToken if needed
const signin = async (userData: userCredentials): Promise<boolean> => {
	try {
		// extract all needed data
		const { email, password } = userData;
		const signInPath = urlConcatenator(signinRoute);
		const { status, data } = await axios.post(signInPath, { email: email, password: password });

		// if the response status is not OK then throw an error else save the token
		if (status !== OK) throw new Error(signinError);
		saveIDToken(data.IDToken);
		return true;
	} catch (err) {
		return false;
	}
};

const saveIDToken = (IDToken: string) => localStorage.setItem(IDTokenKey, IDToken);

const getIDToken = (): string | null => localStorage.getItem(IDTokenKey);

export { signin, getIDToken };
