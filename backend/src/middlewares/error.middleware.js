

async function errorHandle(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    
    return;
}

module.exports = {
    errorHandle
}