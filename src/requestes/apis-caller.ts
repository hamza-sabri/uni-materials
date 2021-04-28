import { ACCEPTED, OK, UNAUTHORIZED, refreshTokenLimit, BAD_REQUEST } from '../constants/status-codes';
import { apiCallerInterface } from '../interfaces/api-caller';
import { responseInterface } from '../interfaces/responses';
import { getAxiosInstance } from './axios-creation';
import { refreshUserToken } from './user-requestes/user';

let times: number = 0;

// TODO complete this file and document it
const APIsCaller = async ({ api, requestBody, requestParams }: apiCallerInterface): Promise<responseInterface> => {
	const axios = getAxiosInstance();
	try {
		let response: responseInterface = { status: OK };
		if (requestBody && requestParams) response = await api(axios, requestBody, requestParams);
		else if (requestBody) response = await api(axios, requestBody);
		else if (requestParams) response = await api(axios, requestParams);
		else response = await api(axios);

		const { status } = response;
		if (status >= OK && status <= ACCEPTED) return response;
		if (status === UNAUTHORIZED) {
			if ((await refreshUserToken()) && times < refreshTokenLimit) {
				times++;
				return APIsCaller({ api, requestBody, requestParams });
			} else times = 0;
		}
		return response;
	} catch (err) {
		console.error(err);
		return { status: BAD_REQUEST, data: {} };
	}
};

export { APIsCaller };
