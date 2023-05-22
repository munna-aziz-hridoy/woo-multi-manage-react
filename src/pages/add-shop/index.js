import React, { useContext, useState } from 'react';

import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

import toast from 'react-hot-toast';

import { FormControl, OutlinedInput, InputAdornment, Grid, Select, MenuItem, Button, Box, CircularProgress } from '@mui/material';
import { ShopFilled } from '@ant-design/icons';
import { MdLabelImportant } from 'react-icons/md';
import { AiOutlineLink } from 'react-icons/ai';
import { BsFillKeyFill } from 'react-icons/bs';

import { v4 as uuid } from 'uuid';

import MainCard from 'components/MainCard';
import { Context } from 'context/index';
import { firestore } from 'firebase.init';

function AddShop() {
    const [shopName, setShopName] = useState('');
    const [shopUrl, setShopUrl] = useState('');
    const [ck, setCk] = useState('');
    const [cs, setCs] = useState('');
    const [type, setType] = useState('General');

    const { userDbId, userLoading, userRefetch, userSites, shopLoading, shopRefetch } = useContext(Context);

    const handleAddShop = () => {
        const hex_id = parseInt(uuid().replace(/-/g, '').substr(0, 6), 16);

        addDoc(collection(firestore, 'sites'), {
            shop_name: shopName,
            product_type: type,
            domain: shopUrl,
            ck,
            cs,
            user_id: userDbId,
            id: hex_id
        }).then((data) => {
            const shop_id = data?.id;
            const docRef = doc(firestore, 'users', userDbId);

            updateDoc(docRef, { sites: [...userSites, shop_id] }).then((data) => {
                userRefetch((prev) => !prev);
                setShopName('');
                setType('General');
                setShopUrl('');
                setCk('');
                setCs('');
                toast.success('Shop Created');
                shopRefetch((prev) => !prev);
            });
        });
    };

    return (
        <MainCard title="Add Shop">
            {userLoading || shopLoading ? (
                <Box component="div" display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress color="primary" />
                </Box>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl sx={{ width: { xs: '100%' } }}>
                            <OutlinedInput
                                required
                                onChange={(e) => setShopName(e.target.value)}
                                size="small"
                                id="header-search"
                                startAdornment={
                                    <InputAdornment position="start" sx={{ mr: -0.5 }}>
                                        <ShopFilled />
                                    </InputAdornment>
                                }
                                aria-describedby="header-search-text"
                                inputProps={{
                                    'aria-label': 'weight'
                                }}
                                placeholder="Shop Name"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl sx={{ width: { xs: '100%' } }}>
                            <OutlinedInput
                                required
                                onChange={(e) => setShopUrl(e.target.value)}
                                size="small"
                                id="header-search"
                                startAdornment={
                                    <InputAdornment position="start" sx={{ mr: -0.5 }}>
                                        <AiOutlineLink />
                                    </InputAdornment>
                                }
                                aria-describedby="header-search-text"
                                inputProps={{
                                    'aria-label': 'weight'
                                }}
                                placeholder="Url"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl sx={{ width: { xs: '100%' } }}>
                            <OutlinedInput
                                required
                                onChange={(e) => setCk(e.target.value)}
                                size="small"
                                id="header-search"
                                startAdornment={
                                    <InputAdornment position="start" sx={{ mr: -0.5 }}>
                                        <BsFillKeyFill />
                                    </InputAdornment>
                                }
                                aria-describedby="header-search-text"
                                inputProps={{
                                    'aria-label': 'weight'
                                }}
                                placeholder="Consumer Key"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl sx={{ width: { xs: '100%' } }}>
                            <OutlinedInput
                                required
                                onChange={(e) => setCs(e.target.value)}
                                size="small"
                                id="header-search"
                                startAdornment={
                                    <InputAdornment position="start" sx={{ mr: -0.5 }}>
                                        <MdLabelImportant />
                                    </InputAdornment>
                                }
                                aria-describedby="header-search-text"
                                inputProps={{
                                    'aria-label': 'weight'
                                }}
                                placeholder="Consumer Secret"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl sx={{ width: { xs: '100%' } }}>
                            <Select
                                required
                                onChange={(e) => setType(e.target.value)}
                                variant="outlined"
                                size="small"
                                Value={type}
                                defaultValue="General"
                                placeholder="Choose Shop Type"
                            >
                                {['General', 'Catelog'].map((item) => (
                                    <MenuItem value={item} key={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleAddShop} size="small" variant="contained" fullWidth>
                            Add Shop
                        </Button>
                    </Grid>
                </Grid>
            )}
        </MainCard>
    );
}

export default AddShop;
