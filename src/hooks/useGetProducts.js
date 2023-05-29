import { useEffect, useState } from 'react';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { wooProductToFormatedProduct } from 'utils/helper';

const useGetProducts = (shop, selectedCategory = null, page = 1, setPage, searchValue = '') => {
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
                page,
                per_page: 20,
                category: selectedCategory,
                search: searchValue
            })
                .then((response) => {
                    setLoading(false);
                    if (response?.data) {
                        console.log(response?.data);

                        setProducts((prev) => {
                            const newData = response?.data?.filter((item) => !prev.some((preItem) => preItem.id === item.id));

                            const formatedProducts = newData?.map((product) => wooProductToFormatedProduct(product, shop?.product_type));

                            return [...prev, ...formatedProducts];
                        });
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    setProducts([]);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [shop, refetch, page]);

    useEffect(() => {
        setProducts([]);
        setPage(1);

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
                page: 1,
                per_page: 20,
                category: selectedCategory
            })
                .then((response) => {
                    setLoading(false);
                    if (response?.data) {
                        // const formatedProducts = response?.data?.map((product) => wooProductToFormatedProduct(product, shop?.product_type));

                        setProducts((prev) => {
                            const newData = response?.data?.filter((item) => !prev.some((preItem) => preItem.id === item.id));

                            const formatedProducts = newData?.map((product) => wooProductToFormatedProduct(product, shop?.product_type));

                            //    return [...prev, ...formatedProducts];

                            return formatedProducts;
                        });
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    setProducts([]);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [selectedCategory]);

    return { products, loading, refetch: setRefetch, setProducts };
};

export default useGetProducts;
