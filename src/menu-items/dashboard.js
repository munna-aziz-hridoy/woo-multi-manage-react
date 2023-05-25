// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Overview',
            type: 'item',
            url: '/overview',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
