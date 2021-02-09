import { userCredentials } from '../user/credentials';

export type formInterface = {
	formPage: formPageInterface;
	setFormPage?: React.Dispatch<React.SetStateAction<formPageInterface>>;
	signupResult?: any;
	setSignupResult?: React.Dispatch<React.SetStateAction<any>>;
};

export type formPageInterface = {
	inputTypes: string[];
	inputMessages: string[];
	buttonMessages: string[];
	pageNumber: number;
	keysAndIDs: string[];
};
