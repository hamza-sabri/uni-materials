import React from 'react';
import { singinPageRoute } from '../../constants/pages-route';
import { getUserCredentials } from '../../requestes/user-requestes/user';
import history from '../../history/credationls-history';

export default function HomePage() {
	const { email } = getUserCredentials();
	// checking if the user is already loged in or not by checking his/her email
	(() => (!email ? history.push(singinPageRoute) : ''))(); // this is a self calling function
	return <div>Home page</div>;
}
