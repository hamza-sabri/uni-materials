import { emailPasswordForm, namesForm, uniForm } from '../../constants/form-arrays';
import { formInterface } from '../../interfaces/forms/signup-form';
import { signup } from '../../requestes/user-requestes/user';
import { reqiredFields, addSelectedValues } from '../../validation/signup-validation';

export default function FormButtons({ formPage, setFormPage, signupResult, setSignupResult }: formInterface) {
	let { buttonMessages, pageNumber, keysAndIDs } = formPage;

	// TODO complete this function and submit to db when submit is clciked
	const transitionHandler = ({ target }: any) => {
		const btnMessage = target.innerText;
		if (btnMessage === 'submit') submitSignupResults();
		else {
			if (btnMessage === 'next') {
				if (!reqiredFields(keysAndIDs)) return; // validate fields
				pageNumber++;
			} else pageNumber--;

			if (pageNumber === 1) setFormPage!(namesForm);
			else if (pageNumber === 2) setFormPage!(emailPasswordForm);
			else setFormPage!(uniForm);
		}
	};

	const submitSignupResults = async () => {
		// TODO validate the whole oject before sending it to backend
		const filnaUserData = addSelectedValues(signupResult, keysAndIDs);
		console.log(await signup(filnaUserData));
	};

	return (
		<div className="buttons-container">
			{buttonMessages.map((btnMessage) => (
				<button id={btnMessage} key={btnMessage} onClick={transitionHandler}>
					{btnMessage}
				</button>
			))}
		</div>
	);
}
