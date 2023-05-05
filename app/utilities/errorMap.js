const ERROR_MESSAGE = {
	UNKNOWN_ERROR: {
		code: -1,
		message: 'Error',
	},
	COMPANY_IS_NOT_EXIST: {
		code: 407,
		message: 'Company is not exist',
	},
	INVESTOR_IS_NOT_EXIST: {
		code: 408,
		message: 'Investor is not exist',
	},
	AREA_IS_NOT_EXIST: {
		code: 409,
		message: 'Area is not exist',
	},
	INDUSTRY_IS_NOT_EXIST: {
		code: 410,
		message: 'Industry is not exist',
	},
	PERSON_IS_NOT_EXIST: {
		code: 411,
		message: 'Person is not exist',
	}
};
const ERROR_MAP = {
	UNKNOWN_ERROR: 'UNKNOWN_ERROR',
	COMPANY_IS_NOT_EXIST: 'COMPANY_IS_NOT_EXIST',
	INVESTOR_IS_NOT_EXIST: 'INVESTOR_IS_NOT_EXIST',
	AREA_IS_NOT_EXIST: 'AREA_IS_NOT_EXIST',
	INDUSTRY_IS_NOT_EXIST: 'INDUSTRY_IS_NOT_EXIST',
	PERSON_IS_NOT_EXIST: 'PERSON_IS_NOT_EXIST',
};
const ROLE = {
	ADMIN: 2,
	USER: 1
}
module.exports = {
	ERROR_MESSAGE,
	ERROR_MAP,
	ROLE
};
