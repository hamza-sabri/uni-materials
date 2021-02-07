import { ACCEPTED, OK, UNAUTHORIZED, refreshTokenLimit } from '../constants/status-codes';
import { getAxiosInstance } from './axios-creation';
import { getUserCredentials, signin } from './user-requestes/user';

let times: number = 0;

// TODO complete this file and document it
const APIsCaller = async (api: any, data?: any): Promise<any> => {
	const axios = getAxiosInstance();
	try {
		let response = { status: OK };
		if (data) response = await api(axios, data);
		else response = await api(axios);

		const { status } = response;
		if (status >= OK && status <= ACCEPTED) return response;
		if (status === UNAUTHORIZED) {
			if ((await refreshIDToken()) && times < refreshTokenLimit) {
				times++;
				return APIsCaller(api, data);
			} else times = 0;
		}
		return { status, data: {} };
	} catch (err) {
		console.log('this is the catch of the calling ');
		console.log(err);
		return { err };
	}
};

// this function would resign the user in again
const refreshIDToken = async (): Promise<boolean> => {
	console.log('refreshed');
	const { email, password } = getUserCredentials();
	if (!email || !password) return false;
	try {
		return await signin({ email, password });
	} catch (err) {
		return false;
	}
};

export { APIsCaller };
