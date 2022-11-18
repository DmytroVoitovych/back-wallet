
const funcErrorCatch = (error,data,next) => {
    error.code === 11000 ? error.status = 409 : error.status = 400;
    next();
};

module.exports = funcErrorCatch;