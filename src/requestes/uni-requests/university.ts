import { getErrorStatusCode } from '../../constants/status-codes';
import { getUnisRoute, updateUniRoute } from '../../constants/urls';
import { responseInterface } from '../../interfaces/responses';
import { AxiosInstance } from 'axios';

// this function is used to get all the unis with all the abstract info about each one of them
const getAllUnis = async (axios: AxiosInstance): Promise<responseInterface> => {
	try {
		const { status, data } = await axios.get(getUnisRoute);
		return { data, status };
	} catch (err) {
		return { status: getErrorStatusCode(err.message) };
	}
};

const updateUni = async (axios: AxiosInstance, requestBody: any, requestParams: any) => {
	try {
		const { status, data } = await axios.put(updateUniRoute, requestBody, { params: requestParams });
		return { data, status };
	} catch (err) {
		return { status: getErrorStatusCode(err.message) };
	}
};

const createUni = async (axios: AxiosInstance, requestBody: any) => {
	try {
		const { status, data } = await axios.post(updateUniRoute, requestBody);
		return { data, status };
	} catch (err) {
		return { status: getErrorStatusCode(err.message) };
	}
};

export { getAllUnis, updateUni, createUni };
