import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const bulkUpdateProducts = (data, shop, refetch, setProducts) => {
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
            console.log(res?.data);
            refetch((prev) => !prev);
            setProducts([]);
        })
        .catch((err) => {
            console.log(err);
        });
};

export { bulkUpdateProducts };
