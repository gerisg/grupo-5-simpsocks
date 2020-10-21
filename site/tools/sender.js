function OK(req, res, results, pagination) {
    let meta = {};
    meta.status = 200;
    if(results.count) {
        meta.count = results.count;
        if(pagination) {
            meta.page = {};
            meta.url = {};
            meta.page.current = `${pagination.curr}`;
            meta.url.current = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
            if(pagination.prev) {
                meta.url.prev = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}?page=${pagination.prev}`;
                meta.page.prev = `${pagination.prev}`;
            }
            if(pagination.next && pagination.curr * pagination.limit < results.count) {
                meta.url.next = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}?page=${pagination.next}`;
                meta.page.next = `${pagination.next}`;
            }
        }
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