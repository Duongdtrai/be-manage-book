/**
 * Response Manager
 */

const status = require('./response-status');
const _ = require('lodash');
const { ERROR_MESSAGE, ERROR_MAP } = require('./errorMap');

/**
 * Response to client with successful status. Response Http status is 200.
 * @param {*} res
 * @param {*} data
 * @param {*} resStatus
 */
const apiSuccess = (res, data = [], resStatus = status[200]) => {
	return res.status(200).json({
		code: resStatus.code,
		message: resStatus.message,
		data: data
	});
};

/**
 * Response to client with error status. Response Http status is 200.
 * @param {*} res
 * @param {*} resStatus
 */
const apiError = (res, resStatus = status[400], data = []) => {
	return res.status(400).json({
		code: resStatus.code,
		message: resStatus.message,
		data
	});
};


/**
 * Response error from system
 * @param {*} res
 * @param {*} resStatus
 */
const systemError = (res, error = null, resStatus = status[500]) => {
	if (error) {
		console.error(error);
	}
	return res.status(resStatus.code).json({
		error: {
			code: resStatus.code,
			message: resStatus.message
		}
	});
};

/**
 * Modify response status object with options
 * Example:
 *   const status = {
 *       code: 202,
 *       message: 'Say %s to %s'
 *   }
 *   const newStatus202 = appman.response.updateStatus(status, { paramsOfMessage: ['HELLO', 'You!']});
 *
 * @param {object} status
 * @param {object} options  An options: { paramsOfMessage: Array<string> }
 */
const updateStatus = (status, options) => {
	return {
		code: status.code,
		message: status.message,
		paramsOfMessage: options.paramsOfMessage
	};
};

/**
 * Response to client with successful status and contain multi message.
 * @param {*} res
 * @param {*} data
 * @param {*} resStatus
 */
const apiSuccessMultiMessage = (res, data = [], resStatus = status[200]) => {
	// Declare variable store message response
	let message = '';

	// Make sure messages response status always is array type
	resStatus.messages = _.isArray(resStatus.messages) ? resStatus.messages : [resStatus.messages];

	// Get message response to result
	resStatus.messages.forEach(el => {
		message = message.concat(el.paramsOfMessage ? res.__(el.content, ...el.paramsOfMessage) : res.__(el.content), '.\n ');
	});

	return res.status(200).json({
		code: resStatus.code,
		message: message,
		data: data
	});
};

/**
 * Response to client with error status. Response Http status is 200.
 * @param {*} res
 * @param {*} resStatus
 */
const resApiError = (res, httpResStatus = 400, resStatus = status[400], data = []) => {
	return res.status(httpResStatus).json({
		code: resStatus.code,
		message: resStatus.message,
		data
	});
};

const getError = (errorKeyMap, res) => {
	if (typeof errorKeyMap === 'string') {
		const errorObj = ERROR_MESSAGE[errorKeyMap];
		if (errorObj) {
		  return res.status(400).json({
			code: errorObj.code,
			message: errorObj.message,
		  });
		}
	}
	const errMsg = errorKeyMap?.message;
	if (typeof errMsg === 'string') {
		const errorObj = ERROR_MESSAGE[errMsg];
		if (errorObj) {
		  return res.status(400).json({
			code: errorObj.code,
			message: errorObj.message,
		  });
		}
	  }
	  return res.status(400).json({
		code: ERROR_MESSAGE[ERROR_MAP.UNKNOWN_ERROR].code,
		message: ERROR_MESSAGE[ERROR_MAP.UNKNOWN_ERROR].message,
	  });
}
module.exports = {
	apiSuccess,
	apiError,
	systemError,
	status,
	updateStatus,
	apiSuccessMultiMessage,
	resApiError,
	getError,
};
