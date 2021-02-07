// external urls
const rootURL: string = 'https://us-central1-uni-materials-412a2.cloudfunctions.net/webApi';

// user routes
const signinRoute: string = '/users/signin';
const signupRoute: string = '/users/signup';

// uni routes
const getUnisRoute: string = '/unis/all';

// functions
const urlConcatenator = (seconderyPath: string[]): string => {
	let apiPath: string = rootURL;
	seconderyPath.forEach((route) => (apiPath += route));
	return apiPath;
};

export { rootURL, signinRoute, signupRoute, urlConcatenator, getUnisRoute };
