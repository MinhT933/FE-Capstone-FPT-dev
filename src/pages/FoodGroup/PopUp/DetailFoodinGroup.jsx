import React from "react";
import Card from "@mui/material/Card";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import PageHeader from "../../../components/PageHeader";
import Iconify from "../../../components/hook-form/Iconify";
import Box from "@mui/material/Box";
import { Dialog, DialogContent, DialogTitle, Grid, Paper } from "@mui/material";
import { callAPIgetFoodbyGroupFoodId } from "../../../redux/action/acction";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ButtonCustomize from "./../../../components/Button/ButtonCustomize";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

export default function DetailFoodinGroup(props) {
  const { OpenPopUpDetail, SetOpenPopUpDetail, id } = props;
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClose = () => {
    SetOpenPopUpDetail(false);
  };
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    const getfoodByFoodGroupId = async () => {
      await dispatch(callAPIgetFoodbyGroupFoodId(id, token));
    };
    getfoodByFoodGroupId();
  }, [dispatch, id, token]);

  const listfood = useSelector((state) => {
    return state.userReducer.listFoodByGroupFoodID;
  });

  const getIcon = (name) => <Iconify icon={name} width={26} height={26} />;
  return (
    <Paper>
      <Dialog open={OpenPopUpDetail} onClose={handleClose}>
        <DialogTitle>
          <PageHeader
            title="Xem chi tiết món ăn trong nhóm"
            subTitle={`Món có trong gói ${listfood.name}`}
            icon={getIcon("fluent:apps-list-detail-20-filled")}
          />
        </DialogTitle>
        <DialogContent>
          <Box>
            {listfood.foods?.map((items, index) => (
              <Card
                sx={{
                  height: "7rem",
                  width: "27.5rem",
                  backgroundColor: "#FFCC30",
                  marginBottom: "1rem",
                  display: "flex",
                }}
                key={index}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      src={items.image}
                      sx={{ height: "5rem", width: "5rem" }}
                    />
                  }
                  title={items.name}
                  subheader={`Giá: ${items.price}đ`}
                  sx={{ mb: 2 }}
                />
              </Card>
            ))}
          </Box>
          <ButtonCustomize
            nameButton="Thêm món"
            marginTop="1.5rem"
            marginLeft="8rem"
            width="12rem"
            component={RouterLink}
            to={`${location.pathname}/updatefood/${id}`}
          />
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
