// split url
const splitURl: string = 'https://young-atoll-63362.herokuapp.com/split-file';

// external urls
const rootURL: string = 'https://us-central1-uni-materials-412a2.cloudfunctions.net/webApi';

// user routes
const signinRoute: string = '/users/signin';
const signupRoute: string = '/users/signup';

// uni routes
const getUnisRoute: string = '/unis/all';
const updateUniRoute: string = '/unis/update';
const createUniRoute: string = '/unis/create';
const deleteUniRoute: string = '/unis/uni/delete';

// material routes
const createMaterialRoute: string = '/materials/create';
const allMaterialsRoute: string = '/unis/all-materials';
const updateMaterialRoute: string = '/materials/update';
const createByBookRoute: string = '/materials/topic/create/all';

// functions
const urlConcatenator = (seconderyPath: string[]): string => {
	let apiPath: string = rootURL;
	seconderyPath.forEach((route) => (apiPath += route));
	return apiPath;
};

export {
	rootURL,
	signinRoute,
	signupRoute,
	urlConcatenator,
	getUnisRoute,
	updateUniRoute,
	createUniRoute,
	deleteUniRoute,
	createMaterialRoute,
	splitURl,
	allMaterialsRoute,
	updateMaterialRoute,
	createByBookRoute
};
