import React, { useState } from 'react'
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import './format.css'

import { width } from '@mui/system';
import Login from './login';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const WidthLogin = styled('div')(({ theme }) => ({
    width: '5000 px',
    marginLeft: 20,
}));

const SignInOutContainer = () => {
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //  const paperStyle = { width: '20%', float: 'right' }
    // fixed bug
    return (
        <div style={{ width: '100%' }}>
            {/* <Box sx={{ flexGrow: 2}}> */}
            {/* <Box
                sx={{ display: "flex", flexWrap: "wrap", "& > :not(style)": { m: 1, width: '50%' }, }}> */}
            {/* <Grid container spacing={3}>
                    <Grid item xs={15}>
                        <Item >
                            <img style={{ marginTop: "20%", marginLeft: "25%" }}
                                src="/static/shipper-1-1.png"
                                height={300}
                                width={300}
                            />
                            <h1 style={{ marginTop: "4%", marginLeft: "23%" }} >Meal Subscription Plan</h1>

                        </Item>
                    </Grid>
                    <Grid item xs>
                        <Item>xs</Item>
                    </Grid>
                </Grid>
            </Box> */}

            {/* <Grid container spacing={3}> */}
            <Grid container spacing={1}
                sx={{ display: "flex", }}
            >
                <Grid item xs={8}
                    sx={{ display: "flex", overflowX: "auto", }}>
                    <Paper sx={{ height: "100%", width: '70%', }}>
                        <Box style={{ marginBottom: "25%" }}>
                            <img style={{ marginTop: "20%", marginLeft: "30%" }}
                                src="/static/shipper-1-1.png"
                                height={300}
                                width={300}
                            />
                            <h1 style={{ marginTop: "2%", marginLeft: "28%" }} >Meal Subscription Plan</h1>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={2} >
                    <WidthLogin>
                        <div className='format-login'>
                            {/* <Box style={{ marginBottom: "100%", }}> */}
                                <Login handleChange={handleChange} />
                            {/* </Box> */}
                        </div>
                    </WidthLogin>
                    {/* <Box style={{ marginBottom: "25%", }}>
                        <Login handleChange={handleChange} />
                    </Box> */}
                </Grid>


            </Grid>

            {/* </Grid> */}
        </div>
    )
}

export default SignInOutContainer;


