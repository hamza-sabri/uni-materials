import { AxiosInstance } from 'axios';
import { responseInterface } from './responses';

export type apiCallerInterface = {
	requestBody?: object;
	requestParams?: object;
	api: any; // this must be changed
};
