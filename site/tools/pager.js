module.exports = {
    getPagination: (page, limit = 10) => {
        if(page && page > 0) {
            page = Number(page);
            let offset = limit * (page - 1);
            let prev = page >= 2 ? page - 1 : undefined;
            let next = page + 1;
            return { limit, offset, curr: page, prev, next }
        }
        return { limit, offset: 0, curr: 1, next: 2 }
    }
}