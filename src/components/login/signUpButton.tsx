import { signupPageRoute } from '../../constants/pages-route';
import history from '../../history/credationls-history';
import '../../styles/logins/login.css';

export default function SignUpButton() {
	return (
		<div className="signup-btn" onClick={() => history.push(signupPageRoute)}>
			Sign up
		</div>
	);
}
