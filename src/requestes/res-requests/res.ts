import { getErrorStatusCode } from '../../constants/status-codes';
import { createResRoute, getAllResRoute } from '../../constants/urls';
import { responseInterface } from '../../interfaces/responses';
import { AxiosInstance } from 'axios';

const createNewRes = async (axios: AxiosInstance, requestBody: any, requestParams: any): Promise<responseInterface> => {
	try {
		const { status, data } = await axios.post(createResRoute, requestBody, { params: requestParams });
		return { data, status };
	} catch (err) {
		console.log(JSON.stringify(err));
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

const getAllRes = async (axios: AxiosInstance, requestParams: any): Promise<responseInterface> => {
	try {
		const { status, data } = await axios.get(getAllResRoute, { params: requestParams });
		return { data, status };
	} catch (err) {
		console.log(JSON.stringify(err));
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

const deleteRes = async (axios: AxiosInstance, requestParams: any): Promise<responseInterface> => {
	try {
		const { status, data } = await axios.delete(getAllResRoute, { params: requestParams });
		return { data, status };
	} catch (err) {
		console.log(JSON.stringify(err));
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

const updateRes = async (axios: AxiosInstance, requestParams: any, requestBody: any): Promise<responseInterface> => {
	try {
		const { status, data } = await axios.put(getAllResRoute, requestBody, {  params: requestParams });
		return { data, status };
	} catch (err) {
		console.log(JSON.stringify(err));
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

export { createNewRes, getAllRes, deleteRes, updateRes };
