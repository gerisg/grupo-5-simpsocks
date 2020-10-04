const combine = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));

const padWithZeroes = (data, length) => {
    while (data.length < length)
        data = '0' + data;
    return data;
}

module.exports = {
    parseImages: files => {
        return files ? files.map(file => { return { name: file.filename }}) : null
    },
    parseCategories: categoryParams => {
        if (!categoryParams)
            return [];
        if (categoryParams && typeof(categoryParams) == 'string')
            return [parseInt(categoryParams)];
        return categoryParams.map(category => parseInt(category));
    },
    parseVariants: variantParams => {
        let skus;
        let variantsMap = new Map();
        variantParams.forEach(param => {
            // Nomenclature defined in views>products>create-form>variants (checkbox)
            let splitted = param.split('-');
            let variant = parseInt(splitted[0]);
            let variantValue = parseInt(splitted[1]);
            variantsMap.has(variant) ? variantsMap.get(variant).push(variantValue) : variantsMap.set(variant, [ variantValue ]);
        });
        const values  = [ ...variantsMap.values() ]; 
        if (values.length) {
            let cartesian = values[0];
            for (let i = 1; i < values.length; i++)
                cartesian = combine(cartesian, values[i]);
            skus = cartesian.map(
                properties => { 
                    let sku = padWithZeroes(properties.reduce((previous, current) => previous.concat(current), ""),8);
                    return { sku, properties }
                }
            );
        }
        return { skus, variants: [ ...variantsMap.keys() ]};
    },
    parseAddresses: addressesBody => {
        let addresses = [];
        if(addressesBody)
            addressesBody.forEach(param => { 
                addresses.push({
                    street: param.street,
                    number: param.number,
                    city: param.city,
                    type: param.type
                });
            });
        return addresses;
    }
}