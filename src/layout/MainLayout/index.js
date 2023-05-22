import { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Toaster } from 'react-hot-toast';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery, CircularProgress } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from 'menu-items';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

// types
import { openDrawer } from 'store/reducers/menu';
import { auth } from 'firebase.init';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
    const dispatch = useDispatch();

    const { drawerOpen } = useSelector((state) => state.menu);

    const [user, loading] = useAuthState(auth);

    const location = useLocation();

    // drawer toggler
    const [open, setOpen] = useState(drawerOpen);
    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(openDrawer({ drawerOpen: !open }));
    };

    // set media wise responsive drawer
    useEffect(() => {
        setOpen(!matchDownLG);
        dispatch(openDrawer({ drawerOpen: !matchDownLG }));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownLG]);

    useEffect(() => {
        if (open !== drawerOpen) setOpen(drawerOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerOpen]);

    if (loading) {
        return (
            <Box component="div" height="100%" width="100%" minHeight="90vh" display="flex" justifyContent="center" alignItems="center">
                <CircularProgress color="primary" />
            </Box>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Header open={open} handleDrawerToggle={handleDrawerToggle} />
            <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Toolbar />
                <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} />
                <Outlet />
            </Box>
            <Toaster />
        </Box>
    );
};

export default MainLayout;
