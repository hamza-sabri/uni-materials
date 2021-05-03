import { userCredentials } from '../../interfaces/user/credentials';
import { urlConcatenator, signinRoute, signupRoute, userProfileRoute, refreshTokenRoute, updateProfileRoute } from '../../constants/urls';
import { IDTokenKey, refreshTokenKey } from '../../constants/local-storage-keys';
import { CREATED, getErrorStatusCode, OK } from '../../constants/status-codes';
import { signinError, signUpError, userCreated } from '../../constants/messages';
import axios, { AxiosInstance } from 'axios';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import history from '../../history/credationls-history';
import { homePageRoute, singinPageRoute } from '../../constants/pages-route';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);
const { auth } = firebase.default;

// this function is called if the user wants to signin or to refresh his IDToken if needed
const signin = async (userData: userCredentials): Promise<any> => {
  try {
    // extract all needed data
    const { email, password } = userData;
    // const signInPath = urlConcatenator([signinRoute]);
    // const { status, data } = await axios.post(signInPath, {
    //   email: email,
    //   password: password,
    // });
    // if the response status is not OK then throw an error else save the token
	// if (status !== OK) throw new Error(signinError);
	// userData.uniID = data.uniID;
	// saveUserCredentials(data.IDToken, data.refreshToken);
	await auth().signInWithEmailAndPassword(email,password);
	auth().onAuthStateChanged(async(user) =>{
		const userToken = await user?.getIdToken(true);
		saveUserCredentials(userToken!, user!.refreshToken);
	})
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
	await auth().createUserWithEmailAndPassword(userData.email, userData.password);
	auth().onAuthStateChanged(async(user)=>{
			if(!user || user === null )return;
			const { uid} = user!;
			userData.uid = uid;
			const signUpPath = urlConcatenator([signupRoute]);
			await axios.post(signUpPath, userData);
			const userToken = await user?.getIdToken(true);
			saveUserCredentials(userToken!, user!.refreshToken); 
	});
	
	return { result: true, message: userCreated };
  } catch (err) {
    if (err && err.response) {
      const { data } = err.response;
      return { result: false, message: data.error.message };
    }
    return { result: false, message: signinError };
  }
};

const saveUserCredentials = (IDToken: string, refreshToken: string) => {
	saveLocaly(IDTokenKey, IDToken);
	saveLocaly(refreshTokenKey, refreshToken);
};

const getUserProfile = async (axios: AxiosInstance) => {
	try {
		const { status, data } = await axios.get(userProfileRoute);
		return { data, status };
	} catch (err) {
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

const updateUserProfile = async(axios:AxiosInstance, requestBody:any) =>{
	try{
		const { status, data } = await axios.put(updateProfileRoute, requestBody);
		return { data, status };
	}catch(err){
		return { status: getErrorStatusCode(err.message), data: err };
	}
}

const refreshUserToken = async () => {
	console.log("refreshing");
	const refreshToken = getStoredItems(refreshTokenKey);
	const reqBody = { grant_type: 'refresh_token', refresh_token: refreshToken };
	const reqParams = { key: process.env.REACT_APP_API_KEY };
	try {
		const { data } = await axios.post(refreshTokenRoute, reqBody, { params: reqParams });
		saveUserCredentials(data.access_token, data.refresh_token);
		console.log("refreshed")
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

const saveLocaly = (localStorageKey: string, data: string) => localStorage.setItem(localStorageKey, data);

const getStoredItems = (localStorageKey: string): string | null => localStorage.getItem(localStorageKey);

const clearStorage = async () => {
	localStorage.clear();
	await auth().signOut();
};

const forgetPassword = (email:string)=>{
	firebase.default.auth().sendPasswordResetEmail(email)
	.then(()=> Swal.fire("Check Your Email","A reset password email has been sent please chenc your inbox", "success"))
	.catch(()=> Swal.fire("Ops!","sorry but something went wrong :(", "error"))
}

let times =0;
const isLogedin =  ()=> {
	 auth().onAuthStateChanged((user)=>{
		 if(times === 1)return;
		if (!user || user === null) history.push(singinPageRoute);
		else history.push(homePageRoute)
		times++;
		
	});
};

export { signin, getStoredItems, signup, clearStorage, getUserProfile, refreshUserToken, isLogedin, forgetPassword, updateUserProfile };
