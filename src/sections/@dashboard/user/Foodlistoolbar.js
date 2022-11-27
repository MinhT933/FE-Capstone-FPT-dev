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
import Box from "@mui/material/Box";
import Iconify from "../../../components/hook-form/Iconify";
import { Controller } from "react-hook-form";
import Controls from "./../../../components/Control/Controls";

import {
  callAPIgetListCategory,
  callAPIgetListFoodByStatus,
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
  optionsCate,
  date,
}) {
  const [id, setID] = useState("");
  const dispatch = useDispatch();
  const [haha, setHaha] = useState("All");
  const handleChange = async (event) => {
    setHaha(event.target.value === "All" ? "" : event.target.value);

    dispatch(
      await callAPIgetListFoodByStatus(
        token,
        event.target.value === "All" ? "" : event.target.value
      )
    );
  };
  React.useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetListCategory(token));
    };
    callAPI();
  }, [dispatch]);

  const category = useSelector((state) => {
    return state.userReducer.listCategory;
  });

  console.log(haha);

  const OptionCate = () => {
    //tạo mảng rỗng để chứa data ở đây là name và id của categoriesFood
    //hình dung nó giống nhà kho vậy á
    // sau này trước khi muốn gọi cái gì đó phải tạo 1 mảng rỗng để bỏ vào
    const item = [];
    // vòng food này để đẩy data từ categoriesFood vào trong items ( vì nó có nhiều object) nên phải làm vậy
    for (var i = 0; i < category.length; i++) {
      item.push({ id: category[i].id, title: category[i].name });
    }

    return item;
    //trả về item đã có data muốn biết thì console.log ra mà xem
  };
  const handleChangeCategory = async (event) => {};
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
            sx={{ marginLeft: "5%", marginTop: "0.1rem" }}
          >
            <Controls.Select
              label="Trạng thái"
              width="10rem"
              // marginRight="25%"
              options={options}
              onChange={handleChange}
              value={haha}
            />
            <Controls.Select
              label="Loại thức ăn"
              width="10rem"
              options={OptionCate()}
              onChange={async (e) => {
                const a = category.find((c) => c.id === e.target.value);
                setID(a.id);
                await dispatch(callAPIgetListFoodfilterCate(token, id, haha));
              }}
              value={id}
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
