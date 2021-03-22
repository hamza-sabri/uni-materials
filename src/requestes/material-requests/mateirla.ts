import { getErrorStatusCode } from '../../constants/status-codes';
import { createMaterialRoute, updateMaterialRoute } from '../../constants/urls';
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

const updateMaterial = async (axios: AxiosInstance, requestBody: any, requestParams: any): Promise<responseInterface> => {
	try {
		const { status, data } = await axios.put(updateMaterialRoute, requestBody, { params: requestParams });
		return { data, status };
	} catch (err) {
		console.log(JSON.stringify(err));
		return { status: getErrorStatusCode(err.message), data: err };
	}
};

export { createNewMaerial, updateMaterial };
