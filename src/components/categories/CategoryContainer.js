import React from 'react';

import { Box, CircularProgress } from '@mui/material';

import useGetCategories from 'hooks/useGetCategories';

import CategoryItems from './CategoryItems';

function CategoryContainer({ shop, id = 0, setselectedCategory }) {
    const { categories, loading } = useGetCategories(shop, id);

    return (
        <>
            {loading ? (
                <Box component="div" display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                <Box component="div" marginX={2}>
                    {categories?.map((category, i) => (
                        <CategoryItems key={i} category={category} shop={shop} setselectedCategory={setselectedCategory} />
                    ))}
                </Box>
            )}
        </>
    );
}

export default CategoryContainer;
