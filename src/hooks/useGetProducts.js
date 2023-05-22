import { useEffect, useState } from 'react';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { wooProductToFormatedProduct } from 'utils/helper';

const useGetProducts = (shop, selectedCategory = null) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        if (shop) {
            setLoading(true);
            const { ck, cs, domain } = shop;

            let endPoint = 'products';

            const api = new WooCommerceRestApi({
                url: domain,
                consumerKey: ck,
                consumerSecret: cs,
                version: 'wc/v3'
            });

            api.get(endPoint, {
                per_page: 20,
                category: selectedCategory
            })
                .then((response) => {
                    setLoading(false);
                    if (response?.data) {
                        const formatedProducts = response?.data?.map((product) => wooProductToFormatedProduct(product, shop?.product_type));

                        setProducts(formatedProducts);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    setProducts([]);
                    console.log(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [shop, refetch, selectedCategory]);

    return { products, loading, refetch: setRefetch };
};

export default useGetProducts;
