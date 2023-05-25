import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography } from '@mui/material';

// project import

import config from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
        <Typography variant="h5" style={{ fontWeight: '700', fontSize: '1.2rem', color: '#1890ff' }}>
            WMPS
        </Typography>
    </ButtonBase>
);

LogoSection.propTypes = {
    sx: PropTypes.object,
    to: PropTypes.string
};

export default LogoSection;
