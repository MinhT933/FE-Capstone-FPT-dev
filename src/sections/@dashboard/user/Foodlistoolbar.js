import PropTypes from "prop-types";
import * as React from "react";
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
import Controls from "./../../../components/Control/Controls";

import {
  callAPIgetListCategory,
  callAPIgetListFoodfilterCate,
} from "../../../redux/action/acction";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

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

Foodlistoolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

const token = localStorage.getItem("token");
if (token === "null") {
}

export default function Foodlistoolbar({
  numSelected,
  filterName,
  onFilterName,
  options,
}) {
  const [id, setID] = useState("");
  const dispatch = useDispatch();
  const [status, setStatus] = useState("All");

  const handleChange = async (event) => {
    setStatus(event.target.value === "All" ? "" : event.target.value);

    await dispatch(
      callAPIgetListFoodfilterCate(
        token,
        id,
        event.target.value === "All" ? "" : event.target.value
      )
    );
  };
  React.useEffect(() => {
    const callAPI = async () => {
      dispatch(await callAPIgetListCategory(token));
    };
    callAPI();
  }, [dispatch]);

  const category = useSelector((state) => {
    return state.userReducer.listCategory;
  });

  const OptionCate = () => {
    const item = [];
    for (var i = 0; i < category.length; i++) {
      item.push({ id: category[i].id, title: category[i].name });
    }
    return item;
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

          <Grid
            container
            spacing={2}
            sx={{ marginLeft: "2%", marginTop: "0.1rem" }}
          >
            <Controls.Select
              label="Trạng thái"
              width="10rem"
              options={options}
              onChange={handleChange}
              value={status}
            />
            <Controls.Select
              label="Loại thức ăn"
              width="10rem"
              options={OptionCate()}
              value={id}
              onChange={async (e) => {
                const a = category.find((c) => c.id === e.target.value);
                setID(a.id);
                dispatch(
                  await callAPIgetListFoodfilterCate(token, a.id, status)
                );
              }}
            />
          </Grid>
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
