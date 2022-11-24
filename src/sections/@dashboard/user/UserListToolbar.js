import PropTypes from "prop-types";
// material
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
// component
import Box from "@mui/material/Box";
import Iconify from "../../../components/hook-form/Iconify";
import { Controller } from "react-hook-form";
import Controls from "./../../../components/Control/Controls";


import {
  callAPIgetAccountAdminByStatus,
  callAPIgetAccountCustomerByStatus,
  callAPIgetAccountKitchenByStatus,
  callAPIgetAccountManagerByStatus,
  callAPIgetAccountShipperByStatus,
  callAPIgetGroupFoodByStatus,
  callAPIgetListFoodByStatus,
  callAPIGetListOderByDay,
  callAPIGetListPack,
  callAPIgetListReqByStatus,
  callAPIgetListStationByStatus,
  callAPIgetShipperOfKitchen,
} from "../../../redux/action/acction";


import { useDispatch } from "react-redux";
import { useState } from "react";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

const token = localStorage.getItem("token");
if (token === "null") {
}

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
  options,
  date,
}) {
  const dispatch = useDispatch();

  const [haha, setHaha] = useState("All");
  const handleChange = async (event) => {
    console.log(event.target.value)
    setHaha(event.target.value === "All" ? "" : event.target.value);

    dispatch(
      await callAPIGetListPack(
        token,
        event.target.value === "All"
          ? ""
          : event.target.value === "All"
            ? ""
            : event.target.value === "All"
              ? ""
              : event.target.value
      )
    );
    dispatch(
      await callAPIgetListFoodByStatus(
        token,
        event.target.value === "All" ? "" : event.target.value
      )
    );
    dispatch(
      await callAPIgetGroupFoodByStatus(
        token,
        event.target.value === "All" ? "" : event.target.value
      )
    );
    dispatch(
      await callAPIgetListReqByStatus(
        token,
        event.target.value === "All"
          ? ""
          : event.target.value === "All"
            ? ""
            : event.target.value === "All"
              ? ""
              : event.target.value
      )
    );

    dispatch(
      await callAPIgetListStationByStatus(
        token,
        event.target.value === "All" ? "" : event.target.value
      )
    );

    dispatch(
      await callAPIgetAccountManagerByStatus(
        token,
        event.target.value === "All" ? "" : event.target.value
      )
    );
    dispatch(
      await callAPIgetAccountAdminByStatus(
        token,
        event.target.value === "All" ? "" : event.target.value
      )
    );
    dispatch(
      await callAPIgetAccountShipperByStatus(
        token,
        event.target.value === "All" ? "" : event.target.value
      )
    );
    dispatch(
      await callAPIgetAccountKitchenByStatus(
        token,
        event.target.value === "All" ? "" : event.target.value
      )
    );
    dispatch(
      await callAPIgetAccountCustomerByStatus(
        token,
        event.target.value === "All" ? "" : event.target.value
      )
    );

    dispatch(
      await callAPIgetShipperOfKitchen(
        token,
        event.target.value === "All" ? "" : event.target.value
      )
    );
 

    if (date) {
      dispatch(
        await callAPIGetListOderByDay(
          token,
          date,
          event.target.value === "All" ? "" : event.target.value
        )
      );
    }



  };
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} Đã chọn
        </Typography>
      ) : (
        <>
          <SearchStyle
            value={filterName}
            onChange={onFilterName}
            placeholder="Tìm kiếm..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
          <Controls.Select
            label="Trạng thái"
            width="10rem"
            marginRight="50%  "
            options={options}
            onChange={handleChange}
            value={haha}
          />
        </>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        // <Tooltip title="Filter list">
        //   <IconButton>
        //     <Iconify icon="ic:round-filter-list" />
        //   </IconButton>
        // </Tooltip>

        <></>
      )}
    </RootStyle>
  );
}
