import React, { useState } from 'react';

import { Box, Typography } from '@mui/material';
import { MdKeyboardArrowRight } from 'react-icons/md';

import CategoryContainer from './CategoryContainer';
import { defaultImage } from 'assets/data';

function CategoryItems({ category, shop, setselectedCategory, setOpenCategory, setPage }) {
    const [openSubCategory, setOpenSubCategory] = useState(false);

    const handleClickCategory = (e) => {
        e.stopPropagation();
        setPage(1);
        setselectedCategory(category);
        setOpenCategory(false);
    };
    return (
        <>
            <Box
                onClick={handleClickCategory}
                component="div"
                display="flex"
                alignItems="center"
                marginY={2}
                style={{
                    cursor: 'pointer'
                }}
            >
                <img style={{ width: '45px', height: '38px' }} src={category?.image?.src || defaultImage} alt="category" />
                <div
                    style={{
                        width: '2px',
                        height: '38px',
                        background: '#1890ff'
                    }}
                />
                <Typography
                    style={{
                        background: '#e6f7ff',
                        margin: '8px 0',
                        padding: 8,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0'
                    }}
                >
                    {category?.name}
                    {category?.children_count > 0 && (
                        <MdKeyboardArrowRight
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenSubCategory((prev) => !prev);
                            }}
                            fontSize={22}
                            style={{
                                transform: `rotate(${openSubCategory ? '90deg' : '0deg'})`,
                                transition: 'all 0.3s'
                            }}
                        />
                    )}
                </Typography>
            </Box>
            {category?.children_count > 0 && openSubCategory && (
                <CategoryContainer
                    shop={shop}
                    id={category?.id}
                    setselectedCategory={setselectedCategory}
                    setOpenCategory={setOpenCategory}
                    setPage={setPage}
                />
            )}
        </>
    );
}

export default CategoryItems;
