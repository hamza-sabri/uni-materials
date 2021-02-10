import { ACCEPTED, OK, UNAUTHORIZED, refreshTokenLimit, BAD_REQUEST } from '../constants/status-codes';
import { responseInterface } from '../interfaces/responses';
import { getAxiosInstance } from './axios-creation';
import { getUserCredentials, signin } from './user-requestes/user';

let times: number = 0;

// TODO complete this file and document it
const APIsCaller = async (api: any, requestBody?: any): Promise<responseInterface> => {
	const axios = getAxiosInstance();
	try {
		let response: responseInterface = { status: OK };
		if (requestBody) response = await api(axios, requestBody);
		else response = await api(axios);

		const { status, data } = response;
		if (status >= OK && status <= ACCEPTED) return response;
		if (status === UNAUTHORIZED) {
			if ((await refreshIDToken()) && times < refreshTokenLimit) {
				times++;
				return APIsCaller(api, requestBody);
			} else times = 0;
		}
		return response;
	} catch (err) {
		console.error(err);
		return { status: BAD_REQUEST, data: {} };
	}
};

// this function would resign the user in again
const refreshIDToken = async (): Promise<boolean> => {
	const { email, password } = getUserCredentials();
	if (!email || !password) return false;
	try {
		return await signin({ email, password });
	} catch (err) {
		return false;
	}
};

export { APIsCaller };
