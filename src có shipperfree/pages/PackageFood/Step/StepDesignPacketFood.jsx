import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import NewPackage from "./../newPackage";
import StepButton from "@mui/material/StepButton";
// import NewPackageItem from "../NewPacketItem";

import { styled } from "@mui/material/styles";
import ConfirmInfo from "../ConfirmInfo";

function getSteps() {
  return ["Thông tin cơ bản", "Chọn Khung thời gian", "Xác nhận thông tin"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <NewPackage />;
    case 1:
    // return <NewPackageItem />;
    case 2:
      return <ConfirmInfo />;
      break;
    default:
      return "Unknown step";
  }
}

const useStyles = styled((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
  },
}));

export default function StepDesignPacketFood() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [completed, setCompleted] = React.useState({});

  const steps = getSteps();

  const classes = useStyles();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          getSteps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (steps) => () => {
    setActiveStep(steps);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className={classes.root}>
      <Box sx={{ width: "100%" }}>
        <Stepper
          center
          nonLinear
          activeStep={activeStep}
          sx={{
            width: "100%",
            ".MuiStepConnector-root": {
              top: 2,
            },
            ".MuiStepConnector-root span": {
              borderColor: "transparent",
            },
            ".MuiStepConnector-root span::before": {
              display: "flex",
              justifyContent: "center",
              content: '"❯"',
            },
            ".MuiSvgIcon-root": {
              borderRadius: "50%",
              border: "1px solid #1976d2",
            },
            ".MuiSvgIcon-root:not(.Mui-completed)": {
              color: "#fff",
            },
            ".MuiStepIcon-text": {
              fill: "#1976d2",
              fontWeight: "90%",
            },
            ".MuiSvgIcon-root.Mui-active": {
              color: "#FFCC32",
              padding: "3px",
              borderRadius: "50%",
              border: "1px solid #ffee32",
              marginY: "-3px",
            },
            ".Mui-active .MuiStepIcon-text": {
              fill: "white",
            },
            ".MuiStepIcon-root.Mui-completed": {
              color: "#FFCC32",
              border: "1px solid #ffee32",
            },
          }}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="red" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              {/* <Box sx={{ display: "flex", flexDirection: "row" }}>
                <ColorButton
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Lùi lại
                </ColorButton>
                <Box sx={{ flex: "1 1 auto" }} />
                <ColorButton
                  sx={{
                    mr: 1,
                  }}
                >
                  Đi tới
                </ColorButton>
                {activeStep !== getSteps.length &&
                  (completed[activeStep] ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "inline-block" }}
                    >
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <ColorButton onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? "Hoàn tất"
                        : "Xác nhận"}
                    </ColorButton>
                  ))}
              </Box> */}
            </React.Fragment>
          )}
        </div>
      </Box>
    </div>
  );
}
