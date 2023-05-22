// import { useEffect, useState } from 'react';
import { ShopOutlined } from '@ant-design/icons';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { firestore } from 'firebase.init';

const useGetShops = (userId) => {
    const [shops, setShops] = useState([]);

    const [refetch, setRefetch] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userId) {
            setLoading(true);
            const q = query(collection(firestore, 'sites'), where('user_id', '==', userId));

            getDocs(q).then((data) => {
                const sites = data.docs.map((item) => item.data());

                const shops = sites?.map((item) => {
                    return {
                        ...item,
                        icon: ShopOutlined,
                        title: item?.shop_name,
                        type: 'item',
                        url: `/shop/${item?.id}`
                    };
                });

                setShops(shops);
                setLoading(false);
            });
        }
    }, [userId, refetch]);

    return { shops, loading, refetch: setRefetch };
};

export default useGetShops;
