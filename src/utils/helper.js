const wooProductToFormatedProduct = (product, type) => {
    if (type === 'Catelog') {
        const getMetaValue = (field) => {
            const metaField = product?.meta_data?.find((meta) => meta?.key === field);

            return metaField?.value || 'N/A';
        };

        const newPrice = getMetaValue('_price_field_1');
        const usedPrice = getMetaValue('_price_field_2');
        const priceSourceNew = getMetaValue('source-name');
        const priceSourceNewLink = getMetaValue('source-link');
        const noteNew = getMetaValue('source-note');
        const priceSourceUsed = getMetaValue('sourceNameUsed');
        const priceSourceUsedLink = getMetaValue('sourceLinkUsed');
        const noteUsed = getMetaValue('sourceNoteUsed');
        const newRemarks = getMetaValue('new-remarks');
        const usedRemarks = getMetaValue('used-remarks');

        return {
            id: product?.id,
            image: product?.images?.[0]?.src || 'https://adlog.narmadeayurvedam.com/dtup/default-product.png',
            name: product?.name || 'N/A',
            jancode: product?.sku || 'N/A',
            category: product?.categories[0]?.name || 'N/A',
            newPrice,
            usedPrice,
            priceSourceNew,
            priceSourceNewLink,
            noteNew,
            priceSourceUsed,
            priceSourceUsedLink,
            noteUsed,
            newRemarks,
            usedRemarks,
            meta_data: product?.meta_data
        };
    } else {
        return {
            id: product?.id,
            image: product?.images?.[0]?.src || 'https://adlog.narmadeayurvedam.com/dtup/default-product.png',
            name: product?.name,
            jancode: product?.sku || 'N/A',
            category: product?.categories[0]?.name || 'N/A',
            price: product?.price || 'N/A',
            sellPrice: product?.sell_price || 'N/A',
            stockStatus: product?.stock_status || 'N/A',
            weight: product?.weight || 'N/A',
            totalSale: product?.total_sales || 'N/A',
            onSale: product?.onSale ? 'Yes' : 'No'
        };
    }
};

const catelogProductFormating = (products, data) => {
    const arrProducts = products?.map((item) => {
        const { id, name, jancode, category, ...rest } = item;

        const meta = Object.keys(rest).map((k) => {
            let key;

            if (k === 'newPrice') {
                key = '_price_field_1';
            } else if (k === 'newRemarks') {
                key = 'new_remarks';
            } else if (k === 'noteNew') {
                key = 'source-note';
            } else if (k === 'noteUsed') {
                key = 'sourceNoteUsed';
            } else if (k === 'priceSourceNew') {
                key = 'source-name';
            } else if (k === 'priceSourceUsed') {
                key = 'sourceNameUsed';
            } else if (k === 'usedPrice') {
                key = '_price_field_2';
            } else if (k === 'usedRemarks') {
                key = 'used-remarks';
            }

            return { key: key, value: item[k] };
        });

        const prevMeta = data?.find((pp) => pp.id === id)?.meta_data;

        const mergedMeta = prevMeta?.map((met) => {
            const matchedItem = meta?.find((elm) => elm.key === met.key);

            return { ...met, ...matchedItem };
        });

        return { meta_data: mergedMeta, id, name, sku: jancode };
    });

    return arrProducts;
};

export { wooProductToFormatedProduct, catelogProductFormating };
