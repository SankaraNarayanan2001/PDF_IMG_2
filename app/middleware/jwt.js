const jwt = require('jsonwebtoken');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const appError = require('../utils/appError');



module.exports = asyncErrorHandler(async (req, res, next) => {
    const token = req.header('token')
    // CHECK IF WE EVEN HAVE A TOKEN
    if (!token) {
        throw new appError(404, "invalid Token");
    }
    const user = jwt.verify(token, "secretkey")

    if (user.id !== 1) {
        throw new appError(403, "Access Forbidden");
    }
    req.id = user.id;
    next();

});
