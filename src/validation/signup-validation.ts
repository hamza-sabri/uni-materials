import { missingFieldMessage } from '../constants/messages';
import { showAlert } from '../utilities/alearts';

const reqiredFields = (inputIDs: string[]): boolean => {
	let result = true;
	inputIDs.forEach((id) => {
		const currentInput: any = document.getElementById(id);
		const value: string = currentInput.value;
		if (value === undefined || value === '') result = false;
	});
	if (!result) {
		showAlert({
			title: 'Ops',
			text: missingFieldMessage,
			icon: 'error',
			confirmButtonText: 'Ok'
		});
	}
	return result;
};

const addSelectedValues = (signupResult: any, selectorIDs: string[], unisTabel: any[]): any => {
	// TODO do the validation here
	const uniNameSelector: any = document.getElementById(selectorIDs[0]);
	const uniLocationsSelector: any = document.getElementById(selectorIDs[1]);
	const uniFieldsSelector: any = document.getElementById(selectorIDs[2]);

	const newResult = {
		...signupResult,
		universityName: uniNameSelector.value,
		universityLocation: uniLocationsSelector.value,
		field: uniFieldsSelector.value,
		uniID: getUniID(uniNameSelector.value, unisTabel)
	};
	return newResult;
};

const getUniID = (selectedUni: string, unisTabel: any[]): string => {
	let ID: string = '';
	unisTabel.forEach((currentUni: any) => {
		if (currentUni.name === selectedUni) ID = currentUni.id;
	});

	return ID;
};

export { reqiredFields, addSelectedValues };
