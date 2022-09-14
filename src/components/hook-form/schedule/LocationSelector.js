import React from "react";
import { styled } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";
import classes from "./class";
import Button from "@mui/material/Button";
import classNames from "clsx";

const LOCATIONS = ["Món Chay", "món mặn"];
const LOCATIONS_SHORT = [1, 2, 3];

const StyledButtonGroup = styled(ButtonGroup)(
  ({ theme: { spacing, palette } }) => ({
    [`&.${classes.locationSelector}`]: {
      marginLeft: spacing(1),
      height: spacing(4.875),
    },
    [`& .${classes.longButtonText}`]: {
      "@media (max-width: 800px)": {
        display: "none",
      },
    },
    [`& .${classes.shortButtonText}`]: {
      "@media (min-width: 800px)": {
        display: "none",
      },
    },
    [`& .${classes.button}`]: {
      paddingLeft: spacing(1),
      paddingRight: spacing(1),
      width: spacing(10),
      "@media (max-width: 800px)": {
        width: spacing(2),
        fontSize: "0.75rem",
      },
    },
    [`& .${classes.selectedButton}`]: {
      background: palette.primary[400],
      color: palette.primary[50],
      "&:hover": {
        backgroundColor: palette.primary[500],
      },
      border: `1px solid ${palette.primary[400]}!important`,
      borderLeft: `1px solid ${palette.primary[50]}!important`,
      "&:first-of-type": {
        borderLeft: `1px solid ${palette.primary[50]}!important`,
      },
    },
  })
);
const handleButtonClick = (locationName, locations) => {
  if (locations.indexOf(locationName) > -1) {
    return locations.filter(location => location !== locationName);
  }
  const nextLocations = [...locations];
  nextLocations.push(locationName);
  return nextLocations;
};
const getButtonClass = (locations, location) =>
  locations.indexOf(location) > -1 && classes.selectedButton;
const LocationSelector = ({ onLocationsChange, locations }) => (
  <StyledButtonGroup className={classes.locationSelector}>
    {LOCATIONS.map((location, index) => (
      <Button
        className={classNames(
          classes.button,
          getButtonClass(locations, location)
        )}
        onClick={() =>
          onLocationsChange(handleButtonClick(location, locations))
        }
        key={location}
      >
        <React.Fragment>
          <span className={classes.shortButtonText}>
            {LOCATIONS_SHORT[index]}
          </span>
          <span className={classes.longButtonText}>{location}</span>
        </React.Fragment>
      </Button>
    ))}
  </StyledButtonGroup>
);

export default LocationSelector;
