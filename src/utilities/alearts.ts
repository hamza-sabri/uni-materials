import Swal from 'sweetalert2';
type alertType = {
	title: string;
	text: string;
	icon: 'success' | 'error' | 'warning' | 'info' | 'question';
	confirmButtonText: string;
};

const showAlert = ({ title, text, icon, confirmButtonText }: alertType) => {
	Swal.fire({
		title: title,
		text: text,
		icon: icon,
		confirmButtonText: confirmButtonText
	});
};

export { showAlert };
