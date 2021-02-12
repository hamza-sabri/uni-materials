import { validateUserOrSignHimIn } from '../../utilities/user-checker';

export default function HomePage() {
	validateUserOrSignHimIn();
	return <div>Home page</div>;
}
