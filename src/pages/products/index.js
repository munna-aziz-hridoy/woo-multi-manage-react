import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Divider, Box, CircularProgress, Button } from '@mui/material';
import { BsArrowLeftShort, BsX } from 'react-icons/bs';

import MainCard from 'components/MainCard';
import Table from 'components/product-page/table';
import CategoryContainer from 'components/categories/CategoryContainer';
import { Context } from 'context/index';
import useGetProducts from 'hooks/useGetProducts';
import useGetCategories from 'hooks/useGetCategories';

function Products() {
    const [selectedShop, setSelectedShop] = useState(null);
    const [selectedCategory, setselectedCategory] = useState(null);

    const [openCategory, setOpenCategory] = useState(false);

    const { shops } = useContext(Context);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const selected = shops?.find((shop) => shop?.id === parseInt(params?.id));

        setSelectedShop(selected);
    }, [params?.id]);

    const { products, loading, refetch } = useGetProducts(selectedShop, selectedCategory);
    const { categories } = useGetCategories(selectedShop);

    if (shops?.length === 0) {
        navigate('/');
        return null;
    }

    console.log(categories, 'categories');

    return (
        <MainCard title="Products">
            <Box
                style={{
                    width: '100%'
                }}
            >
                <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Button onClick={() => refetch((prev) => !prev)}>Refresh</Button>
                    <Button onClick={() => setOpenCategory(true)}>
                        <BsArrowLeftShort fontSize={24} /> Categories
                    </Button>
                </Box>
                <Divider />
                {loading ? (
                    <Box component="div" height="100%" width="100%" display="flex" justifyContent="center" alignItems="center" padding={3}>
                        <CircularProgress color="primary" />
                    </Box>
                ) : (
                    <Table data={products} shop={selectedShop} refetch={refetch} />
                )}

                <Box
                    component="div"
                    style={{
                        position: 'fixed',
                        height: '100vh',
                        width: '400px',
                        background: '#fff',
                        zIndex: 10000,
                        top: 0,
                        right: openCategory ? 0 : -2000,
                        boxShadow: '-4px 0 8px #0000001f',
                        transition: 'all 0.4s'
                    }}
                >
                    <Box component="div" style={{ position: 'relative' }}>
                        <BsX
                            onClick={() => setOpenCategory(false)}
                            fontSize={26}
                            style={{
                                background: '#ff00004d',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '-46px',
                                left: '8px',
                                cursor: 'pointer'
                            }}
                        />

                        <Box component="div" marginTop={8}>
                            <CategoryContainer shop={selectedShop} setselectedCategory={setselectedCategory} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </MainCard>
    );
}

export default Products;
