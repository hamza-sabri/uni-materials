import { emailPasswordForm, namesForm, uniForm } from '../../constants/form-arrays';
import { formInterface } from '../../interfaces/forms/signup-form';
import { saveLocaly, signup } from '../../requestes/user-requestes/user';
import { reqiredFields, addSelectedValues } from '../../validation/signup-validation';
import { showAlert } from '../../utilities/alearts';
import history from '../../history/credationls-history';
import Swal from 'sweetalert2';
import { homePageRoute } from '../../constants/pages-route';
import { useContext } from 'react';
import { UniDataContext } from '../../contexts/signup-context/uni-data-context';

export default function FormButtons({ formPage, setFormPage, signupResult }: formInterface) {
	let { buttonMessages, pageNumber, keysAndIDs } = formPage;
	const unisDataList = useContext(UniDataContext);
	const unisTabel = unisDataList.map(({ id, doc }) => {
		const currentUni = { id: id, name: doc.name };
		return currentUni;
	});

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
		saveLocaly('sign','up');
		// TODO validate the whole oject before sending it to backend
		const finalUserData = addSelectedValues(signupResult, keysAndIDs, unisTabel);
		Swal.showLoading();
		const { result, message } = await signup(finalUserData);
		if (result) {
			showAlert({
				title: 'Congrats',
				text: message,
				icon: 'success',
				confirmButtonText: 'Continue',
				sucessFunction: sucessSignup // TODO when this is clicked go to home
			});
		} else {
			showAlert({
				title: 'Ops',
				text: message,
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		}
	};

	const sucessSignup = ({ isConfirmed, isDismissed }: any) => {
		if (isConfirmed || isDismissed) history.push(homePageRoute);
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
