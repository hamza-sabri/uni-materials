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

export type signupDropdownInterface = {
	unisNames: string[];
	doc: any;
	setUniIndex: React.Dispatch<React.SetStateAction<number>>;
	formPage: formPageInterface;
	signupResult: any;
	setSignupResult?: React.Dispatch<React.SetStateAction<any>>;
};
