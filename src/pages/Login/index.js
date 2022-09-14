import React, { useState } from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { width } from '@mui/system';
import Login from './login';

const SignInOutContainer = () => {
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //  const paperStyle = { width: '20%', float: 'right' }
// fixed bug
    return (
        <div style={{ width: '100%' }}>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    "& > :not(style)": {
                        m: 1,
                        width: 350,
                       
                    },
                    // height: "100%",
                    //     overflowX: "auto"
                }}
            >
                <Paper>
                    <Box style={{ marginBottom: "10%" }}>
                        <img style={{ marginTop: "40%", marginLeft: "5%" }}
                            src="/static/shipper-1-1.png"
                            height={300}
                            width={300}
                        />
                        <h1 style={{ marginTop: "4%", marginLeft: "2%" }} >Meal Subscription Plan</h1>
                    </Box>

                </Paper>
                <Login handleChange={handleChange} />
            </Box>



        </div>


    )
}

export default SignInOutContainer;


