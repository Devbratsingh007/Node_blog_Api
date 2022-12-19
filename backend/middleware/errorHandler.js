const errorHandler = (err, req, resp, next )=> {
    const statusCosde = resp.statusCosde ? resp.statusCosde : 500
    resp.status(statusCosde)
    resp.json({
        message: err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack

    })
}

module.exports = {
    errorHandler
}