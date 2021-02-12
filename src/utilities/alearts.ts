import Swal from 'sweetalert2';
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

export { showAlert };
