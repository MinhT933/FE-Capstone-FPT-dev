import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { Drawer } from "@mui/material";

const Input = styled("input")({
  display: "none",
});

export default function InputImg() {
  const [imgFile, setImgFile] = useState();

  const uploadImg = (selectorFiles) => {
    if (selectorFiles) {
      setImgFile(selectorFiles[0]);
    }
  };
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
        />
        <Button variant="contained" component="span">
          Tải lên...
        </Button>
      </label>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={(e) => uploadImg(e.target.files)}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
          <Drawer />
          {imgFile && <img src={URL.createObjectURL(imgFile)} />}
        
        
          {/* <img  src = "https://img5.thuthuatphanmem.vn/uploads/2021/11/12/hinh-anh-anime-don-gian-hinh-nen-anime-don-gian-ma-dep_092443354.png"/> */}
        </IconButton>
      </label>
    </Stack>
  );
}
