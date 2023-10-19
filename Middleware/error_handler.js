const errorHandler = (err, req, resp, next) => {
    const statuCode = resp.statuCode ? statuCode : 500;
    switch (statuCode) {
        case 400:
            resp.json({
                title: "Validation failed",
                massage: err.massage,
                stacktTrace: err.stack
            })
            break;

        case 401:
            resp.json({
                title: "UNAUTHORIZED",
                massage: err.massage,
                stacktTrace: err.stack
            })
            break;
        case 403:
            resp.json({
                title: "FORBIDDEN",
                massage: err.massage,
                stacktTrace: err.stack
            })
            break;
        case 404:
            resp.json({
                title: "Not Found",
                massage: err.massage,
                stacktTrace: err.stack
            })
            break;

        case 500:
            resp.json({
                title: "Server Error",
                massage: err.massage,
                stacktTrace: err.stack
            })
            break;
        default:
            console.log('All ok')
            break;
    }
}

module.exports = errorHandler;