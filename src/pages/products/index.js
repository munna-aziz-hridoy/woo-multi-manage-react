import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Divider, Box, CircularProgress, Button, Typography } from '@mui/material';
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

    const [breadcrumbs, setBreadcrumbs] = useState('');

    const [openCategory, setOpenCategory] = useState(false);

    const [page, setPage] = useState(1);

    const { shops, searchValue } = useContext(Context);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const selected = shops?.find((shop) => shop?.id === parseInt(params?.id));

        setSelectedShop(selected);
    }, [params?.id]);

    const { products, loading, refetch, setProducts } = useGetProducts(selectedShop, selectedCategory?.id, page, setPage, searchValue);

    useEffect(() => {
        setselectedCategory(null);
        setBreadcrumbs('');
        setProducts([]);
        setPage(1);

        refetch((prev) => !prev);
    }, [searchValue]);

    const { categories } = useGetCategories(selectedShop);

    useEffect(() => {
        if (selectedCategory) {
            if (selectedCategory?.parent !== 0) {
                const parent = categories?.find((category) => category?.id === selectedCategory?.parent);

                setBreadcrumbs(`${parent?.name} ➤ ${selectedCategory?.name}`);
            } else {
                setBreadcrumbs(selectedCategory?.name);
            }
        }
    }, [selectedCategory, categories]);

    if (shops?.length === 0) {
        navigate('/');
        return null;
    }

    return (
        <MainCard>
            <Box
                style={{
                    width: '100%'
                }}
            >
                <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Button
                        onClick={() => {
                            setProducts([]);
                            setPage(1);
                            refetch((prev) => !prev);
                        }}
                    >
                        Refresh
                    </Button>

                    <Typography variant="body1" component="p" style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                        {breadcrumbs}
                    </Typography>

                    <Button onClick={() => setOpenCategory(true)}>
                        <BsArrowLeftShort fontSize={24} /> Categories
                    </Button>
                </Box>
                <Divider />

                {products?.length === 0 && loading && (
                    <Box component="div" width="100%" display="flex" justifyContent="center" alignItems="center" padding={3}>
                        <CircularProgress color="primary" />
                    </Box>
                )}

                <Table
                    data={products}
                    shop={selectedShop}
                    refetch={refetch}
                    setPage={setPage}
                    loading={loading}
                    setProducts={setProducts}
                />

                <Box component="div" height="100px" width="100%" display="flex" justifyContent="center" alignItems="center" padding={3}>
                    {loading && <CircularProgress color="primary" />}
                </Box>

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
                        transition: 'all 0.4s',
                        overflow: 'auto'
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
                            <CategoryContainer
                                setOpenCategory={setOpenCategory}
                                shop={selectedShop}
                                setselectedCategory={setselectedCategory}
                                setPage={setPage}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </MainCard>
    );
}

export default Products;
