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
import Iconify from "../../../components/hook-form/Iconify";

import * as React from "react";
import { Grid } from "@mui/material";

import ButtonBootrap from "../../../components/Button/ButtonBootrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callAPIgetTripByStatus } from "../../../redux/action/acction";

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

ListdeliveryTriptoolBar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function ListdeliveryTriptoolBar({
  numSelected,
  filterName,
  onFilterName,
}) {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  if (token === null) {
    Navigate("/");
  }
  // React.useEffect(() => {
  //   const callAPI = async () => {
  //     dispatch(await callAPIgetTripByStatus(token, "delivery"));
  //     dispatch(await callAPIgetTripByStatus(token, "waiting"));
  //     dispatch(await callAPIgetTripByStatus(token, "arrived"));
  //     dispatch(await callAPIgetTripByStatus(token, "reject"));
  //   };
  //   callAPI();
  // }, [dispatch, token]);
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
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="VD: 2022-12-31"
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}
      <Grid
        container
        spacing={2}
        sx={{ marginLeft: "2%", marginTop: "0.1rem" }}
      >
        <ButtonBootrap
          status="waiting"
          nameButton="Đang chờ"
          onClick={() => {
            dispatch(callAPIgetTripByStatus(token, "waiting"));
          }}
        />
        <ButtonBootrap
          status="delivery"
          nameButton="Đang giao"
          onClick={() => {
            dispatch(callAPIgetTripByStatus(token, "delivery"));
          }}
        />
        <ButtonBootrap
          status="arrived"
          nameButton="Đã giao"
          onClick={() => {
            dispatch(callAPIgetTripByStatus(token, "arrived"));
          }}
        />
        <ButtonBootrap
          status="reject"
          nameButton="Từ chối"
          onClick={() => {
            dispatch(callAPIgetTripByStatus(token, "reject"));
          }}
        />
      </Grid>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        // <Tooltip title="Filter list">
        //     <IconButton>
        //         <Iconify icon="ic:round-filter-list" />
        //     </IconButton>
        // </Tooltip>

        <></>
      )}
    </RootStyle>
  );
}
