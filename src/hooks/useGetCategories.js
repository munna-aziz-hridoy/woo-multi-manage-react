import { useEffect, useState } from 'react';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const useGetCategories = (shop, parent = 0) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        if (shop) {
            setLoading(true);
            const { ck, cs, domain } = shop;

            const api = new WooCommerceRestApi({
                url: domain,
                consumerKey: ck,
                consumerSecret: cs,
                version: 'wc/v3'
            });

            api.get(`products/categories?parent=${parent}`, { page: 1, per_page: 100, orderby: 'id', order: 'asc' })
                .then((response) => {
                    setLoading(false);

                    setCategories(response?.data);
                })
                .catch((err) => {
                    setLoading(false);
                    setCategories([]);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [shop, refetch]);

    return { categories, loading, refetch: setRefetch };
};

export default useGetCategories;
