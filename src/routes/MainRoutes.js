import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AddShop from 'pages/add-shop/index';

import ErrorBoundary from 'error-boundary/index';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page

const Products = Loadable(lazy(() => import('pages/products')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },

        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },

        {
            path: 'shop/:id',
            element: <Products />
        },
        {
            path: 'add-shop',
            element: <AddShop />
        }
    ]
};

export default MainRoutes;
