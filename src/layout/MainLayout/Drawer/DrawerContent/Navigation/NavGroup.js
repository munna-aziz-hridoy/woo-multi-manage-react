import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// material-ui
import { List, CircularProgress, Box } from '@mui/material';
import { PlusCircleOutlined } from '@ant-design/icons';

// project import
import NavItem from './NavItem';

import { useContext } from 'react';
import { Context } from 'context/index';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
    const menu = useSelector((state) => state.menu);
    const { drawerOpen } = menu;

    const { shops, shopLoading } = useContext(Context);

    const navCollapse = [
        ...item?.children,
        ...shops,
        {
            id: 'add-shop',
            icon: PlusCircleOutlined,
            title: 'Add Shop',
            type: 'item',
            url: '/add-shop'
        }
    ].map((item, i) => {
        return <NavItem key={i} item={item} level={1} />;
    });

    return shopLoading ? (
        <Box component="div" display="flex" justifyContent="center" alignItems="center">
            <CircularProgress color="primary" />
        </Box>
    ) : (
        <List sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}>{navCollapse}</List>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
