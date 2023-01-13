import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { callAPIgetGroupFood } from "../../redux/action/acction";
import { useSelector } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



export default function InputTagCheckBox(props) {
  const [groupfoodOption, setgroupfoodOption] = React.useState([]);

  const [group, setGroup] = React.useState([]);

  const dispatch = useDispatch();

  const { label, name } = props;

  React.useEffect(() => {
    const getListGroupFood = async () => {
      await dispatch(callAPIgetGroupFood());
    };
    getListGroupFood();
  }, [dispatch]);

  React.useEffect(() => {
    if (groupfoodOption.length > 0) {
      hanleID();
    }
  }, [groupfoodOption]);

  const groupFood = useSelector((state) => {
    return state.userReducer.listGroupFood;
  });

  // const handleGetObjectGroup = () => {
  //   const arr = [];
  //   for (var i = 1; i < groupFood.length; i++) {
  //     arr.push({ id: groupFood[i].id, name: groupFood[i].name });
  //   }
  //   return arr;
  // };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setgroupfoodOption(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // hanleID();
  };

  const hanleID = () => {
    const IDValue = [];
    for (const item of groupFood) {
      for (const i of groupfoodOption) {
        if (item.name === i) {
          IDValue.push(item.id);
        }
      }
    }
    setGroup(IDValue);
  };

  return (
    <div>
      <FormControl sx={{ width: "98%" }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          name={name}
          value={groupfoodOption}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          
        >
          {groupFood.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              <Checkbox checked={groupfoodOption.indexOf(item.name) > -1} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
