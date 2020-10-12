function OKResponse(req) {
    return {
        meta: {
            status: 200,
            url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
        },
        data: []
    };
}

function ErrorResponse(req) {
    return {
        meta: {
            status: 500,
            url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
        },
        error: {}
    };
}

module.exports = { OK: OKResponse, Error: ErrorResponse }