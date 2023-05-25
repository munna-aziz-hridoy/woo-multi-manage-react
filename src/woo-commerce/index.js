import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const bulkUpdateProducts = (data, shop, refetch, setSelectedProducts, setProducts) => {
    const { ck, cs, domain } = shop;

    const api = new WooCommerceRestApi({
        url: domain,
        consumerKey: ck,
        consumerSecret: cs,
        version: 'wc/v3'
    });

    api.post('products/batch', {
        update: data
    })
        .then((res) => {
            refetch((prev) => {
                setProducts([]);

                return !prev;
            });
            setSelectedProducts([]);
        })
        .catch((err) => {});
};

export { bulkUpdateProducts };
