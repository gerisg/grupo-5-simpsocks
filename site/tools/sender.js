function OK(req, res, data) {
    res.json({
        meta: {
            status: 200,
            url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
            count: data.length
        },
        data: data
    });
}

function Error(req, res, error) {
    res.status(500).json({
        meta: {
            status: 500,
            url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
        },
        error: error
    });
}

module.exports = { OK, Error }