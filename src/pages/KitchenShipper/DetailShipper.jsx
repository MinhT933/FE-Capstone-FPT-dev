import React from "react";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import PageHeader from "../../components/PageHeader";
import { DialogContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callAPIgetShipperByID } from "../../redux/action/acction";
import { useSelector } from "react-redux";
import Controls from "../../components/Control/Controls";
import { useState } from "react";
import Box from "@mui/material/Box";

function DetailShipper(props) {
  const { OpenDetail, setOpenDetail, id } = props;

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (token === null) {
    Navigate("/");
  }
  const handleClose = () => {
    setOpenDetail(false);
  };
  React.useEffect(() => {
    const getShipper = async () => {
      dispatch(await callAPIgetShipperByID(token, id));
    };
    getShipper();
  }, [dispatch, token, id]);

  const shipper = useSelector((state) => {
    return state.userReducer.shipPerByID;
  });

  console.log(shipper);
  //   console.log(shipper.account.profile.fullName);
  const [arrShipper, setArrShipper] = useState([]);
  const handleNullObject = () => {
    if (shipper !== null) {
      setArrShipper(shipper);
    } else {
      console.log("rỗng");
    }
  };

  return (
    <Paper>
      <Dialog open={OpenDetail} onClose={handleClose}>
        <DialogTitle>
          <PageHeader
            title="Thông tin chi tiết shipper"
            subTitle={`Thông tin của ${shipper.account?.profile?.fullName}`}
            icon={
              <img
                src={shipper.account?.profile?.avatar}
                // src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/302151129_1489511498168314_1583038780045397465_n.jpg?stp=cp6_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=0debeb&_nc_ohc=UpuyQoUrdj0AX_gtH04&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfDvOaE8gy5IsKAM8nBv7JpnmskNJEMQ260vqnBGx_ZeiA&oe=636C46EC"
                alt={shipper.account?.profile?.fullName}
                height={90}
                width={120}
              />
            }
          />
        </DialogTitle>
        <DialogContent>
          {JSON.stringify(shipper) !== "{}" && (
            <Box sx={{ marginLeft: "5rem", marginTop: "1rem", height: '18rem', width: '8rem' }}>
              <Grid
                // container
                // rowSpacing={1}

                container spacing={4}

              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={9}>
                  <Controls.Input
                    variant="outlined"
                    name="fullName"
                    width="18rem"
                    label="Họ tên"
                    disabled
                    value={shipper.account?.profile?.fullName}
                  />
                </Grid>

                <Grid item xs={9}>
                  <Controls.Input
                    variant="outlined"
                    name="phone"
                    width="18rem"
                    label="Điện thoại"
                    disabled
                    value={shipper.account?.phone}
                  />
                </Grid>
                <Grid item xs={9}>
                  <Controls.Input
                    variant="outlined"
                    name="email"
                    width="18rem"
                    label="Email"
                    disabled
                    value={shipper.account?.profile?.email}
                  />
                </Grid>
                {/* <Grid item xs={9}>
                  <Controls.Input
                    variant="outlined"
                    name="totalFood"
                    width="18rem"
                    label="Name"
                    disabled
                    value={shipper.account?.profile?.fullName}
                  />
                </Grid> */}
              </Grid>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Paper>
  );
}

export default DetailShipper;
