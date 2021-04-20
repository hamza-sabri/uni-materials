import { getErrorStatusCode } from '../../constants/status-codes';
import {
	createByBookRoute,
	createMaterialRoute,
	createTopicRoute,
	deleteTopicRoute,
	getAllTopicsRoute,
	updateMaterialRoute,
	updateTopicRoute
} from '../../constants/urls';
import { responseInterface } from '../../interfaces/responses';
import { AxiosInstance } from 'axios';

const createNewMaerial = async (axios: AxiosInstance, requestBody: any): Promise<responseInterface> => {
	try {
		const { status, data } = await axios.post(createMaterialRoute, requestBody);
		return { data, status };
	} catch (err) {
		console.log(JSON.stringify(err));
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

const updateMaterial = async (
	axios: AxiosInstance,
	requestBody: any,
	requestParams: any
): Promise<responseInterface> => {
	try {
		const { status, data } = await axios.put(updateMaterialRoute, requestBody, { params: requestParams });
		return { data, status };
	} catch (err) {
		console.log(JSON.stringify(err));
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

const createTopic = async (axios: AxiosInstance, requestBody: any, requestParams: any): Promise<responseInterface> => {
	try {
		const { status, data } = await axios.post(createTopicRoute, requestBody, { params: requestParams });
		return { data, status };
	} catch (err) {
		console.log(JSON.stringify(err));
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

const addMaterialByBook = async (axios: AxiosInstance, requestBody: any): Promise<responseInterface> => {
	try {
		const { status, data } = await axios.post(createByBookRoute, requestBody);
		return { data, status };
	} catch (err) {
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

// topics APIs
const getAllTopics = async (axios: AxiosInstance, requestParams: any): Promise<responseInterface> => {
	try {
		const { status, data } = await axios.get(getAllTopicsRoute, { params: requestParams });
		return { data, status };
	} catch (err) {
		console.log(JSON.stringify(err));
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

const updateTopic = async (axios: AxiosInstance, requestBody: any, requestParams: any): Promise<responseInterface> => {
	try {
		const { status, data } = await axios.put(updateTopicRoute, requestBody, { params: requestParams });
		return { data, status };
	} catch (err) {
		console.log(JSON.stringify(err));
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

const deleteTopic = async (axios: AxiosInstance, requestParams: any): Promise<responseInterface> => {
	try {
		const { status, data } = await axios.delete(deleteTopicRoute, { params: requestParams });
		return { data, status };
	} catch (err) {
		console.log(JSON.stringify(err));
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

export { createNewMaerial, updateMaterial, addMaterialByBook, createTopic, getAllTopics, updateTopic, deleteTopic };
