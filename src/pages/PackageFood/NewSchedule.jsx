import * as React from "react";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import * as PathAction from "../../redux/PathAction";
import { Box, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import "moment/locale/de";
import { momentLocalizer } from "react-big-calendar";
import vi from "date-fns/locale/vi";
import locale from "date-fns/locale/fr";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ButtonCustomize from "./../../components/Button/ButtonCustomize";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Typography from "@mui/material/Typography";

//----------------------------------------------------------------

dayjs.extend(isBetweenPlugin);

moment.updateLocale("en", {
  week: {
    dow: 1,
  },
});

export const createAction = ({ type, payload }) => {
  return { type, payload };
};

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: "#FFCC33",
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: "#ffee32",
    },
    "&.Mui-selected": { backgroundColor: "#FFCC33" },
    "&.Mui-selected:hover": {
      backgroundColor: "#FFCC33",
    },
    "&.Mui-selected:focus": {
      backgroundColor: "#FFCC33",
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

///================================
if (locale && locale.options) {
  locale.options.weekStartsOn = 3;
}

export default function NewSchedule(props) {
  //=================================================
  // React.useEffect(() => {
  //   moment.locale("vi", { week: { dow: 1 } });
  // }, []);
  const { OpenPopUp, SetOpenPopUp } = props;
  //==================================================

  const localizer = momentLocalizer(moment);

  const handleClose = () => {
    SetOpenPopUp(false);
  };

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [flag, setFlag] = useState(false);

  const [value, setValue] = React.useState(dayjs(new Date()));
  const [checkedList, setCheckedList] = useState([]);
  const [data, setData] = useState([]);
  const start = value.startOf("week");
  const end = value.endOf("week");
  // console.log(start.$d);
  // console.log(end.$d);
  const countDateinWeek = () => {
    let startNum = start.$d;
    let endNum = 7;
    let week = [];
    let date = startNum.getDate();
    for (let index = 0; index < 7; index++) {
      if (index !== 0) {
        let dateofweek = new Date(startNum.setDate(date + index));
        week.push({
          day: dateofweek.toLocaleDateString(),
          lessons: [
            {
              namel: "Sáng",
              value: false,
              id: Math.floor(Math.random() * 99999),
            },
            {
              namel: "Trưa",
              value: false,
              id: Math.floor(Math.random() * 99999),
            },
            {
              namel: "Chiều",
              value: false,
              id: Math.floor(Math.random() * 99999),
            },
          ],
        });
      }
    }
    setData(week);
  };

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const dayIsBetween = date.isBetween(start, end, null, "[]");
    const isFirstDay = date.isSame(start, "day");
    const isLastDay = date.isSame(end, "day");

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  const handleCheckboxClick = (e) => {
    const { value, checked } = e.target;
    const a = [...checkedList];
    a.push(+value);
    const tmp = [...data];
    for (const item of data) {
      for (const i of item.lessons) {
        if (i.id === +value) {
          i.value = checked;
        }
      }
    }
    setData(tmp);
    if (checked) {
      setCheckedList(a);
    } else {
      setCheckedList(checkedList.filter((item) => item !== +value));
    }
  };

  return (
    <Box>
      <Dialog open={OpenPopUp} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          <PageHeader
            title="Tạo khung thời gian"
            subTitle="Chọn ngày và buổi cho gói ăn"
          />
        </DialogTitle>
        <DialogContent>
          {flag === false ? (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs} locale={vi}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  label="Week picker"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderDay={renderWeekPickerDay}
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat="'Week of' MMM d"
                />
              </LocalizationProvider>

              <Box>
                <ButtonCustomize
                  nameButton="Lưu"
                  marginLeft="46%"
                  onClick={() => {
                    const start = value.startOf("week");
                    const end = value.endOf("week");
                    countDateinWeek();
                    dispatch(
                      createAction({
                        type: PathAction.SET_DATE_RANGE,
                        payload: { start, end },
                      })
                    );
                    setFlag(true);
                  }}
                />
              </Box>
            </>
          ) : (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid xs={1.5}>
                <Grid
                  marginTop={3}
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                >
                  <Typography variant="p" gutterBottom>
                    Sáng
                  </Typography>
                  <Typography variant="p" gutterBottom>
                    Trưa
                  </Typography>
                  <Typography variant="p" gutterBottom>
                    Chiều
                  </Typography>
                </Grid>
              </Grid>
              {data.map((itemdate) => {
                return (
                  <Grid xs={1.5}>
                    {itemdate.day}
                    {itemdate.lessons.map((item) => {
                      return (
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          gap={1}
                        >
                          {/* {item.namel} */}
                          <Checkbox
                            key={item}
                            value={item.id}
                            onChange={handleCheckboxClick}
                            checked={checkedList.includes(item.id)}
                            sx={{
                              color: "black",
                              "&.Mui-checked": {
                                color: "#FFCC32",
                              },
                            }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                );
              })}
              <Box>
                <ButtonCustomize
                  nameButton="Lưu"
                  onClick={() => {
                    dispatch(
                      createAction({ type: "SET_PACKAGE_ITEM", payload: data })
                    );
                    SetOpenPopUp(false);
                    setFlag(false);
                  }}
                />
              </Box>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
