import PropTypes from "prop-types";
// material
import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Grid,
} from "@mui/material";
// component

import Iconify from "../../../components/hook-form/Iconify";

import Controls from "./../../../components/Control/Controls";

import {
  callAPIgetListFeedback,
  callAPIgetListFeedbackByIDPac,
  callAPIGetListPackage,
  createAction,
} from "../../../redux/action/acction";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

// ----------------------------------------------------------------------

Feedbacktoolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function Feedbacktoolbar({
  numSelected,
  filterName,
  onFilterName,
}) {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (token === "null") {
  }

  const getOptionsRate = () => [
    // { id: "0", title: "0" },
    {
      id: "1",
      title: <Iconify icon="fluent-emoji-flat:star" width={18} height={18} />,
    },
    {
      id: "2",
      title: (
        <>
          <Iconify icon="fluent-emoji-flat:star" width={18} height={18} />
          <Iconify icon="fluent-emoji-flat:star" width={18} height={18} />
        </>
      ),
    },
    {
      id: "3",
      title: (
        <>
          <Iconify icon="fluent-emoji-flat:star" width={18} height={18} />
          <Iconify icon="fluent-emoji-flat:star" width={18} height={18} />
          <Iconify icon="fluent-emoji-flat:star" width={18} height={18} />
        </>
      ),
    },
    {
      id: "4",
      title: (
        <>
          <Iconify icon="fluent-emoji-flat:star" width={18} height={18} />
          <Iconify icon="fluent-emoji-flat:star" width={18} height={18} />
          <Iconify icon="fluent-emoji-flat:star" width={18} height={18} />
          <Iconify icon="fluent-emoji-flat:star" width={18} height={18} />
        </>
      ),
    },
    {
      id: "5",
      title: (
        <>
          <Iconify icon="fluent-emoji-flat:star" width={18} height={18} />
          <Iconify icon="fluent-emoji-flat:star" width={18} height={18} />
          <Iconify icon="fluent-emoji-flat:star" width={18} height={18} />
          <Iconify icon="fluent-emoji-flat:star" width={18} height={18} />
          <Iconify icon="fluent-emoji-flat:star" width={18} height={18} />
        </>
      ),
    },
  ];
  const getIcon = (name) => <Iconify icon={name} width={18} height={18} />;
  React.useEffect(() => {
    const getlistCateFood = async () => {
      await dispatch(callAPIGetListPackage(token));
      await dispatch(callAPIgetListFeedback(token));
    };
    getlistCateFood();
  }, [dispatch]);

  const PackageFood = useSelector((state) => {
    return state.userReducer.listFoodPackage;
  });
  const getOptions = () => {
    const item = [];
    item.push({ id: "all", title: "Tất cả" });
    for (var i = 0; i < PackageFood.length; i++) {
      item.push({ id: PackageFood[i].id, title: PackageFood[i].name });
    }

    return item;
  };

  const feedback = useSelector((state) => {
    return state.userReducer.feedback;
  });

  const handlefilterRate = (e) => {
    dispatch(
      createAction({
        type: "FILLTER_FLAG",
        payload: e.target.value,
      })
    );
  };
  const [value, setValue] = useState("");

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
          <Grid
            container
            spacing={1}
            sx={{ marginLeft: "2%", marginTop: "0.1rem" }}
          >
            <Grid xs={3}>
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
            </Grid>
            <Grid xs={2}>
              <Controls.Select
                label="Gói ăn"
                width="10rem"
                marginRight="50%  "
                options={getOptions()}
                onChange={async (e) => {
                  const a = PackageFood.find((c) => c.id === e.target.value);

                  if (a.id === "all") {
                    await dispatch(callAPIgetListFeedback(token));
                    setValue(a.id);
                  } else {
                    await dispatch(callAPIgetListFeedbackByIDPac(token, a.id));
                    setValue(a.id);
                  }
                }}
                value={value}
              />
            </Grid>
            <Grid xs={1}>
              <Controls.Select
                label="Đánh giá gói ăn"
                width="10rem"
                marginRight="50%  "
                options={getOptionsRate()}
                onChange={(e) => {
                  handlefilterRate(e);
                }}
              />
            </Grid>
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
