function OK(req, res, results) {
    let meta = { status: 200, url: `${req.protocol}://${req.get('host')}${req.originalUrl}` };
    if(results.count) {
        meta.count = results.count;
    }
    if(results.countByCategory) {
        meta.count_by_category = results.countByCategory.sort((cat1,cat2) => cat1.count > cat2.count ? -1 : cat1.count < cat2.count ? 1 : 0);
    }
    // Send
    res.json({
        meta: meta,
        data: results.rows ? results.rows : results
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