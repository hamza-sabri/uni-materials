import { namesForm, emailPasswordForm, uniForm } from '../../constants/form-arrays';
import { formInterface } from '../../interfaces/forms/signup-form';

export default function SignupForm({ formPage, setFormPage }: formInterface) {
	const { inputTypes, inputMessages, buttonMessages } = formPage;
	let { pageNumber } = formPage;

	const transitionHandler = ({ target }: any) => {
		const btnMessage = target.innerText;
		if (btnMessage === 'submit') console.log('finsihed');
		if (btnMessage === 'next') pageNumber++;
		else pageNumber--;

		if (pageNumber === 1) setFormPage(namesForm);
		else if (pageNumber === 2) setFormPage(emailPasswordForm);
		else setFormPage(uniForm);
	};

	const getInputs = () => {
		return inputMessages.map((message, index) => (
			<input placeholder={message} key={index} type={inputTypes[index]} />
		));
	};

	const getButtons = () => {
		return buttonMessages.map((btnMessage) => (
			<button id={btnMessage} key={btnMessage} onClick={transitionHandler}>
				{btnMessage}
			</button>
		));
	};

	return (
		<div className="signup-form ">
			<div className="inputs-container">{getInputs()}</div>
			<div className="buttons-container">{getButtons()}</div>
		</div>
	);
}
