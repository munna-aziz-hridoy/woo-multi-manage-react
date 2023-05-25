// material-ui
import { Box, Typography, Card, CardHeader } from '@mui/material';

import step1 from 'assets/step1.png';
import step2 from 'assets/step2.png';
import step3 from 'assets/step3.png';

import expand from 'assets/expand.png';
import opencategory from 'assets/opencategory.png';
import refresh from 'assets/refresh.png';
import selectcategory from 'assets/selectcategory.png';

// avatar style

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <Box component="div">
            <Typography variant="h3" style={{ textAlign: 'center' }}>
                Welcome to Woo Multisite product management system
            </Typography>

            <Card style={{ marginTop: '30px', maxHeight: '285px' }}>
                <CardHeader title="Step 1" />
                <Box component="div" padding={2}>
                    <Typography variant="body1">Click on the "Add Shop" button from sidebar to add a new shop</Typography>
                    <img style={{ width: '400px' }} alt="add-shop" src={step1} />
                </Box>
            </Card>
            <Card style={{ marginTop: '30px', maxHeight: '420px' }}>
                <CardHeader title="Step 2" />
                <Box component="div" padding={2}>
                    <Typography variant="body1">
                        Fill the form, here you can see the image indicating the required fields and their value. <br /> <br />
                        Here you will give: <br /> ⇁ Desire name for your shop. <br />
                        ⇁ Your Woo commerce shop Url <br />
                        ⇁ Your Woo commerce "Consumer key" <br />
                        ⇁ Your Woo commerce "Consumer Secret" <br />
                        ⇁ Shop type <br />
                        After filling all the information click on the add shop button and your shop will be added
                    </Typography>
                    <img style={{ width: '600px' }} alt="add-shop" src={step2} />
                </Box>
            </Card>
            <Card style={{ marginTop: '30px', maxHeight: '440px' }}>
                <CardHeader title="Step 3" />
                <Box component="div" padding={2}>
                    <Typography variant="body1">
                        Double click on any field to edit it. <br />
                        After changing any value from the field, you will see an <b>"Update"</b> button at the bottom of the page
                        <br />
                        Click the button to change value
                    </Typography>
                    <img style={{ width: '600px' }} alt="add-shop" src={step3} />
                </Box>
            </Card>

            <Card style={{ marginTop: '30px', maxHeight: '440px' }}>
                <CardHeader title="Refresh" />
                <Box component="div" padding={2}>
                    <Typography variant="body1">
                        Click the <b>"Refresh"</b> button to refresh data.
                    </Typography>
                    <img style={{ width: '600px' }} alt="add-shop" src={refresh} />
                </Box>
            </Card>

            <Card style={{ marginTop: '30px', maxHeight: '440px' }}>
                <CardHeader title="Open Category" />
                <Box component="div" padding={2}>
                    <Typography variant="body1">
                        Click the <b>"Categories"</b> button to open category menu.
                    </Typography>
                    <img style={{ width: '600px' }} alt="add-shop" src={opencategory} />
                </Box>
            </Card>
            <Card style={{ marginTop: '30px', maxHeight: '440px' }}>
                <CardHeader title="Open Sub Category" />
                <Box component="div" padding={2}>
                    <Typography variant="body1">
                        Click the <b>"Arrow Icon"</b> to open sub category.
                    </Typography>
                    <img style={{ width: '600px' }} alt="add-shop" src={expand} />
                </Box>
            </Card>
            <Card style={{ marginTop: '30px', maxHeight: '440px' }}>
                <CardHeader title="Select Category" />
                <Box component="div" padding={2}>
                    <Typography variant="body1">
                        Click on the <b>"Category name"</b> to select a category.
                    </Typography>
                    <img style={{ width: '600px' }} alt="add-shop" src={selectcategory} />
                </Box>
            </Card>
        </Box>
    );
};

export default DashboardDefault;
