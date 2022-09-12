import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";

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
        <Button variant="contained" component="span" sx={
          {
            marginLeft:"23%"
          }
        }>
          Tải lên...
        </Button>
        <Box
          sx={{
            height: 165,
            width: 165,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
            marginTop: "10%",
          }}
        >
          {input.map((i) => (
            <img key={i} src={i} alt="" />
          ))}
        </Box>
      </label>
    </Stack>
  );
}
