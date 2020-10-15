function OK(req, res, results) {
    let meta = { status: 200, url: `${req.protocol}://${req.get('host')}${req.originalUrl}` };
    if(results.count) {
        if(typeof(results.count) == 'number') {
            meta.count = results.count;
        } else {
            meta.count = results.count.reduce((sum, current) => sum + current.count, 0);
            meta.count_by_category = results.count.map(group => ({ [group.name]: group.count })).reduce(
                (obj, item) => {
                    let name = Object.keys(item)[0];
                    obj[name] = item[name];
                    return obj;
                }, {}
            );
        }   
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