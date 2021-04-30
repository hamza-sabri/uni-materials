import Swal from 'sweetalert2';
import { forgetPassword } from '../../requestes/user-requestes/user';
export default function ForgotPassword() {
	const forgetPass = () => {
		Swal.fire({
			title: 'reset password',
			input: 'email',
			inputLabel: 'Your email address',
			inputPlaceholder: 'Enter your email address'
		}).then((result)=>{
			const {value:email} = result;
			forgetPassword(email);
		})
	};
	return (
		<div className="forgot-password" onClick={forgetPass}>
			forgot password?
		</div>
	);
}
