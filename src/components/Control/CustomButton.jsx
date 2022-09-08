
import Button from "@mui/material/Button";
import React from "react";

  import React from 'react'
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#FFCC33'),
    backgroundColor: '#FFCC33',
    "&:hover": {
      backgroundColor: "#5dc9bc",
    },
    display: "center",
  }));

  
  export default function CustomButton() {
    return (
        <Stack spacing={2} direction="row" width="200px">
              <ColorButton variant="contained" to=''>Create </ColorButton>
            </Stack>
    )
  }
  