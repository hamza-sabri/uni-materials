import { emailPasswordForm, namesForm, uniForm } from '../../constants/form-arrays';
import { formInterface } from '../../interfaces/forms/signup-form';
import { signup } from '../../requestes/user-requestes/user';
import { reqiredFields, addSelectedValues } from '../../validation/signup-validation';
import Swal from 'sweetalert2';
import { showAlert } from '../../utilities/alearts';
import { userCreated } from '../../constants/messages';

export default function FormButtons({ formPage, setFormPage, signupResult }: formInterface) {
	let { buttonMessages, pageNumber, keysAndIDs } = formPage;

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
		Swal.showLoading();
		if (await signup(filnaUserData)) {
			showAlert({
				title: 'Congrats',
				text: userCreated,
				icon: 'success',
				confirmButtonText: 'Continue' // TODO when this is clicked go to home
			});
		} else {
			showAlert({
				title: 'Ops',
				text: 'sorry but something went wrong',
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		}
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
