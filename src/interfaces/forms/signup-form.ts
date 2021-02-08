export type formInterface = {
	formPage: formPageInterface;
	setFormPage: React.Dispatch<React.SetStateAction<formPageInterface>>;
};

export type formPageInterface = {
	inputTypes: string[];
	inputMessages: string[];
	buttonMessages: string[];
	pageNumber: number;
};
