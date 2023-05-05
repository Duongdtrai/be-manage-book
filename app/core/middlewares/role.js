const jwt =  require('jsonwebtoken');

/**
 * @param {*} role 
 * @returns {Next || SystemError}
 */
const checkIsInRole = (role) => (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.SECRET_OR_KEY);
    if (user.role !== role) {
        return appman.response.systemError(res, {message: "Quyền không đúng"});
    }
    return next();
};
module.exports = checkIsInRole;
