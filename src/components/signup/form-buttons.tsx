import { emailPasswordForm, namesForm, uniForm } from '../../constants/form-arrays';
import { formInterface } from '../../interfaces/forms/signup-form';
import { signup } from '../../requestes/user-requestes/user';

export default function FormButtons({ formPage, setFormPage, signupResult }: formInterface) {
	let { buttonMessages, pageNumber } = formPage;

	// TODO complete this function and submit to db when submit is clciked
	const transitionHandler = ({ target }: any) => {
		const btnMessage = target.innerText;
		if (btnMessage === 'submit') submitSignupResults();
		else {
			if (btnMessage === 'next') pageNumber++;
			else pageNumber--;

			if (pageNumber === 1) setFormPage!(namesForm);
			else if (pageNumber === 2) setFormPage!(emailPasswordForm);
			else setFormPage!(uniForm);
		}
	};

	const submitSignupResults = async () => {
		console.log(await signup(signupResult!));
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
