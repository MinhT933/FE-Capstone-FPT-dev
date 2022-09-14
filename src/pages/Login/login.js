import {
  Container,
  Button,
  Grid,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    pass: "",
    showPass: false,
  });

  const handlePassVisibilty = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#5dc9bc"),
    backgroundColor: "#ffeb3b",
    "&:hover": {
      backgroundColor: "#5dc9bc",
    },
    display: "center",
  }));

  return (
    <Box
      sx={{ float: "right", width: "70%", flexGrow: 1 }}
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
              <div style={{ marginBottom: "8%" }}>
                <h1> Đăng Nhập </h1>
              </div>
              <form>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      type="email"
                      fullWidth
                      label="Tài khoản"
                      placeholder="Tài khoản"
                      variant="outlined"
                      required
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      type={values.showPass ? "text" : "password"}
                      fullWidth
                      label="Mật khẩu"
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
                        ),
                      }}
                    />
                  </Grid>
                  <Grid container columnSpacing={2}>
                    <Grid item sx={2}>
                      <div>
                        <Checkbox {...label} />
                        <label>Nhớ thông tin đăng nhập</label>
                      </div>
                    </Grid>

                    <Grid item sx={3}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "right",
                          typography: "body1",
                          "& > :not(style) + :not(style)": {
                            ml: 2,
                          },
                        }}
                        onClick={preventDefault}
                      >
                        <Link
                          to="/findaccount"
                          underline="hover"
                          style={{ marginBlock: "7%" }}
                        >
                          {"Quên mật khẩu?"}
                        </Link>
                      </Box>
                    </Grid>
                    <div></div>
                  </Grid>
                  <Grid item>
                    <ColorButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ padding: "4.5%" }}
                    >
                      Đăng nhập
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
};

export default Login;
