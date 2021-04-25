import axios from 'axios';
import { IDTokenKey } from '../constants/local-storage-keys';
import { rootURL } from '../constants/urls';
import { getStoredItems } from './user-requestes/user';

const getAxiosInstance = () => {
	return axios.create({
		baseURL: rootURL,
		headers: {
			Authorization: getStoredItems(IDTokenKey),
			ContentType: 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		
	});
};

export { getAxiosInstance };
