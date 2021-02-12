import Swal from 'sweetalert2';
export default function ForgotPassword() {
	const forgetPass = () => {
		Swal.fire({
			title: 'reset password',
			input: 'email',
			inputLabel: 'Your email address',
			inputPlaceholder: 'Enter your email address'
		});
	};
	return (
		<div className="forgot-password" onClick={forgetPass}>
			forgot password?
		</div>
	);
}
