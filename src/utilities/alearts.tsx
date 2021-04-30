import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LoadingUpload from '../components/home/subpages/data-entry/loading-upload';
import OCR from '../components/home/subpages/data-entry/ocr';
const MySwal = withReactContent(Swal);

type alertType = {
	title: string;
	text: string;
	icon: 'success' | 'error' | 'warning' | 'info' | 'question';
	confirmButtonText: string;
	sucessFunction?: any;
};

const showAlert = ({ title, text, icon, confirmButtonText, sucessFunction }: alertType) => {
	if (sucessFunction) Swal.fire({ title, text, icon, confirmButtonText }).then(sucessFunction);
	else Swal.fire({ title, text, icon, confirmButtonText });
};

const hideLoading = () => {
	let temp = document.querySelector('.transparent-background');
	if (temp === null || temp === undefined) {
		MySwal.clickCancel();
		Swal.clickCancel();
		return;
	}

	temp!.className = 'empty-div';
	temp = document.querySelector('.swal2-container');
	temp!.className = 'empty-div';
	MySwal.clickCancel();
	Swal.clickCancel();
};

const showLoading = (flag: number) => {
	MySwal.fire(flag === 0 ? <LoadingUpload /> : <OCR />);
	const temp = document.querySelector('.swal2-popup');
	temp!.className = 'transparent-background';
};

export { showAlert, hideLoading, showLoading };
