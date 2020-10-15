function OK(req, res, result) {
    res.json({
        meta: {
            status: 200,
            url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
            count: result.count ? result.count : 1
        },
        data: result
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