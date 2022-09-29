import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import Iconify from "./../hook-form/Iconify";

const Input = styled("input")({
  display: "none",
});

export default function InputImg() {
  const [input, setInput] = useState([]);


  function _treat(e) {
    const { files } = e.target;
    let images = [];
    const selecteds = [...[...files]];
    selecteds.forEach((i) => images.push(URL.createObjectURL(i)));
    console.log(selecteds);

    setInput(images);
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      justifyContent="center"
    >
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={_treat}
        />
        <Button
          variant="contained"
          component="span"
          sx={{
            marginLeft: "20%",
          }}
        >
          Tải lên...
        </Button>
        {/* css button input img */}
        <Box
          sx={{
            height: 165,
            width: 165,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
            marginTop: "10%",
            boxShadow: 8,
          }}
        >
          {/* hiển thị hình lên  */}
          {input.map((i) => (
            <img key={i} src={i} />
          ))}
        </Box>
      </label>
    </Stack>
  );
}
