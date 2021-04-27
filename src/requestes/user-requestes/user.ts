import { userCredentials } from '../../interfaces/user/credentials';
import { urlConcatenator, signinRoute, signupRoute, userProfileRoute } from '../../constants/urls';
import { emailKey, IDTokenKey, passwordKey } from '../../constants/local-storage-keys';
import { CREATED, getErrorStatusCode, OK } from '../../constants/status-codes';
import { signinError, signUpError, userCreated } from '../../constants/messages';
import axios, { AxiosInstance } from 'axios';
import * as firebase from 'firebase';

// TODO add them to the env file
const firebaseConfig = {
	apiKey: 'AIzaSyDuwEpjOh-6ZX1pO44Sx1XRQ88DpGtn6_0',
	authDomain: 'uni-materials-412a2.firebaseapp.com',
	projectId: 'uni-materials-412a2',
	storageBucket: 'uni-materials-412a2.appspot.com',
	messagingSenderId: '22309204619',
	appId: '1:22309204619:web:a183ad7372ae8b27951a8e',
	measurementId: 'G-GDFQC61GXN'
};

// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);
const { auth } = firebase.default;

// this function is called if the user wants to signin or to refresh his IDToken if needed
const signin = async (userData: userCredentials): Promise<any> => {
  try {
    // extract all needed data
    const { email, password } = userData;
    const signInPath = urlConcatenator([signinRoute]);
    const { status, data } = await axios.post(signInPath, {
      email: email,
      password: password,
    });

    // if the response status is not OK then throw an error else save the token
    if (status !== OK) throw new Error(signinError);
    userData.uniID = data.uniID;
    saveUserCredentials(userData, data.IDToken);
    return { result: true, message: userCreated };
  } catch (err) {
    if (err && err.response) {
      const { data } = err.response;
      return { result: false, message: data.error.message };
    }
    return { result: false, message: signinError };
  }
};

const signup = async (userData: userCredentials): Promise<any> => {
  try {
    const signUpPath = urlConcatenator([signupRoute]);
    const { status, data } = await axios.post(signUpPath, userData);

    if (status !== CREATED) throw new Error(signUpError);
    saveUserCredentials(userData, data.IDToken);

    return { result: true, message: userCreated };
  } catch (err) {
    if (err && err.response) {
      const { data } = err.response;
      return { result: false, message: data.error.message };
    }
    return { result: false, message: signinError };
  }
};

const saveUserCredentials = (userData: userCredentials, IDToken: string) => {
	console.log('saving!!!');
	saveLocaly(IDTokenKey, IDToken);
	saveLocaly(emailKey, userData.email);
	saveLocaly(passwordKey, userData.password);
	console.log('done saving');
};

const getUserCredentials = (): userCredentials => {
  const savedUser: userCredentials = {
    email: getStoredItems(emailKey)!,
    password: getStoredItems(passwordKey)!,
    IDToken: getStoredItems(IDTokenKey)!,
  };
  return savedUser;
};

const getUserProfile = async (axios: AxiosInstance) => {
	try {
		const { status, data } = await axios.get(userProfileRoute);
		return { data, status };
	} catch (err) {
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

const saveLocaly = (localStorageKey: string, data: string) => localStorage.setItem(localStorageKey, data);

const getStoredItems = (localStorageKey: string): string | null =>
  localStorage.getItem(localStorageKey);

const clearStorage = async() => {
	localStorage.clear();
	await auth().signOut();
};
export { signin, getStoredItems, signup, getUserCredentials, clearStorage, getUserProfile };
