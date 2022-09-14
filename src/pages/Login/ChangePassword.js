
import {
    Container,
    Button,
    Grid,
    Paper,
    TextField,
    IconButton,
    InputAdornment
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";


export default function ChangePassword() {
    const [values, setValues] = useState({
        newPass: "",
        confirmPass: "",
        showPass: false
    });

    const handlePassVisibilty = () => {
        setValues({
            ...values,
            showPass: !values.showPass
        });
    };

    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText("#5dc9bc"),
        backgroundColor: "#ffeb3b",
        "&:hover": {
            backgroundColor: "#5dc9bc"
        },
        display: "center"
    }));


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
                        <Paper elevation={3} sx={{ padding: 10, marginBottom: 0.5 }}>
                            <div style={{ marginBottom: "4%" }}>
                                <h1> Tạo mật khẩu mới </h1>
                                <p sx={{ paddingLeft: "1%", paddingBottom: "2%"}}>
                                    Tạo mật khẩu mới có tối thiểu 6 ký tự. Mật khẩu mạnh là mật
                                    khẩu được kết hợp từ các ký tự, số và dấu câu.
                                </p>
                            </div>
                            <form>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <TextField
                                            type={values.showPass ? "text" : "newPass"}
                                            fullWidth
                                            label="Nhập mật khẩu mới"
                                            placeholder="Mật khẩu"
                                            variant="outlined"
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handlePassVisibilty}
                                                            aria-label="toggle password"
                                                            edge="end"
                                                        >
                                                            {values.showPass ? (
                                                                <VisibilityOffIcon />
                                                            ) : (
                                                                <VisibilityIcon />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <TextField
                                            type={values.showPass ? "text" : "confirmPass"}
                                            fullWidth
                                            label="Nhập lại mật khẩu"
                                            placeholder="Mật khẩu"
                                            variant="outlined"
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handlePassVisibilty}
                                                            aria-label="toggle password"
                                                            edge="end"
                                                        >
                                                            {values.showPass ? (
                                                                <VisibilityOffIcon />
                                                            ) : (
                                                                <VisibilityIcon />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>
                                    <Grid container columnSpacing={2}>
                                        <Grid item sx={2}>
                                            <div>
                                                <Checkbox {...label} />
                                                <label>Nhớ mật khẩu</label>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <ColorButton type="submit" fullWidth variant="contained" sx={{padding: "3.5%"}} href="/Login">
                                            Đổi mật khẩu
                                        </ColorButton>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Container>
            </div>
        </Box>
    );
}
