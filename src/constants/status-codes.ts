// The 200 family
const OK: number = 200;
const CREATED: number = 201;
const ACCEPTED: number = 202;

// The 400 family
const BAD_REQUEST: number = 400;
const UNAUTHORIZED: number = 401;
const NOT_FOUND: number = 404;

// related constants
const refreshTokenLimit: number = 2;

// functions
const getErrorStatusCode = (message: string): number => {
	const currentStatus = Number(message.substr(message.length - 3));
	if (currentStatus === BAD_REQUEST) return BAD_REQUEST;
	if (currentStatus === UNAUTHORIZED) return UNAUTHORIZED;
	return NOT_FOUND;
};

export { OK, CREATED, ACCEPTED, BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, getErrorStatusCode, refreshTokenLimit };
