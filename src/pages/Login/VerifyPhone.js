import { Container, Button, Grid, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#5dc9bc"),
    backgroundColor: "#ffeb3b",
    "&:hover": {
        backgroundColor: "#5dc9bc"
    },
    display: "center"
}));

export default function VerifyPhone() {
    const [values, setValues] = useState({
        otp: "",
    });

    return (
        <Box
            sx={{ float: "center", width: "100%" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <div>
                <Container maxWidth="sm">
                    <Grid
                        container
                        spacing={2}
                        direction="column"
                        justifyContent="center"
                        style={{ minHeight: "100vh" }}
                    >
                        <Paper elevation={3} sx={{padding: 10, marginBottom: 0.5  }}>
                            <div  style={{ marginBottom: "4%" }}>
                                <h1> Xác thực số điện thoại </h1>
                                <p sx={{ paddingLeft: "1%", paddingBottom: "2%"}}>Nhập mã OTP được gửi đến số điện thoại để xác thực.
                                </p>
                            </div>
                            <form>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <TextField
                                            type="otp"
                                            fullWidth
                                            label="Mã xác thực OTP"
                                            placeholder="Mã OTP"
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item style={{ margin: "7%" }}>
                                    <ColorButton type="submit" fullWidth variant="contained"  sx={{padding: "5%"}} href="/changepassword">
                                        Xác thực
                                    </ColorButton>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Container>
            </div>
        </Box>
    );
}

