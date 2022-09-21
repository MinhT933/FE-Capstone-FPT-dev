import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import { Icon } from "@iconify/react";
import Iconify from "./../hook-form/Iconify";

const Input = styled("input")({
  display: "none",
});

export default function InputImg() {
  const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
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
        <Button
          variant="contained"
          component="span"
          sx={{
            marginLeft: "20%",
          }}
        >
          Tải lên...
        </Button>
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
          {input.map((i) => (
            <img
              key={i}
              src={i}
              onerror="https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg"
            />
          ))}
        </Box>
      </label>
    </Stack>
  );
}
