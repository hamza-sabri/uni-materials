import { getErrorStatusCode } from '../../constants/status-codes';
import { createResRoute, getAllResRoute, deleteResRoute, updateResRoute, rateResRoute } from '../../constants/urls';
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
		const { status, data } = await axios.delete(deleteResRoute, { params: requestParams });
		return { data, status };
	} catch (err) {
		console.log(JSON.stringify(err));
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

const updateRes = async (axios: AxiosInstance, requestBody: any, requestParams: any ): Promise<responseInterface> => {
	try {
		const { status, data } = await axios.put(updateResRoute, requestBody, {  params: requestParams });
		return { data, status };
	} catch (err) {
		console.log(JSON.stringify(err));
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

const rateRes = async (axios: AxiosInstance, requestBody: any, requestParams: any ): Promise<responseInterface> => {
	try {
		const { status, data } = await axios.put(rateResRoute, requestBody, {  params: requestParams });
		return { data, status };
	} catch (err) {
		console.log(JSON.stringify(err));
		return { status: getErrorStatusCode(err.message), data: err };
	}
};


export { createNewRes, getAllRes, deleteRes, updateRes, rateRes };
