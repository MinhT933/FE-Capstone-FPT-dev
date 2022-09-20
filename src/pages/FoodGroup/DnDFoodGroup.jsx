import React from "react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import FOODLIST from "../../_mock/foodsample";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import Controls from "../../components/Control/Controls";
import Box from "@mui/material/Box";
import * as UpdateService from "../../utils/UpdateService/UpdateService";
import UseCreateForm from "../../components/PopUp/useForm";
import { classNames } from "clsx";
import { selectName } from "./../../utils/UpdateService/UpdateService";
import Button from "@mui/material/Button";

const stateName = {
  id: 0,
  name: "",
};

export default function DnDFoodGroup() {
  const columnsFromBackend = {
    [uuidv4()]: {
      name: "Danh sách thức ăn",
      items: FOODLIST,
    },
    ///dòng này tạo tên bảng với items cho drag and drop
    // xuống dưới tao cho .map để render
    [uuidv4()]: {
      name: "hihi",
      items: [],
    },
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#FFCC32"),
    backgroundColor: "#FFCC32",
    "&:hover": {
      backgroundColor: "#ffee32",
    },
    display: "center",
  }));

  const [columns, setColumns] = useState(columnsFromBackend);
  const { values, setValue, handleInputChange } = UseCreateForm(stateName);
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      console.log(source.droppableId);
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      console.log({ sourceColumn });

      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <Box>
      <Box sx={{ marginLeft: "20%", marginBottom: "5%", marginTop: "5%" }}>
        {/* ô slect tao viết ở đây */}
        <Controls.Select
          name="mục gói ăn"
          label="Chọn nhóm thức ăn"
          value={values.departmentId}
          onChange={handleInputChange}
          options={UpdateService.selectName()}
        />
      </Box>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <Typography>{column.name}</Typography>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#ffee32"
                              : "#ffff",
                            padding: 4,
                            width: "15.625rem",
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#FFCC32" // click vào lên màu
                                          : "#EDEFF1", // màu mặc định của tấm thẻ
                                        color: "back",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <Grid
                                        container
                                        rowSpacing={1}
                                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                      >
                                        <Grid item xs={12}>
                                          <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={2}
                                          >
                                            <img
                                              src={item.avatarUrl}
                                              height="12%"
                                              width="12%"
                                            />
                                            <Typography
                                              variant="subtitle2"
                                              noWrap
                                            >
                                              {item.name}
                                            </Typography>
                                          </Stack>
                                        </Grid>
                                      </Grid>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
      <ColorButton sx={{ marginLeft: "36%", width: "30%", marginBottom: "4%" }}>
        Save
      </ColorButton>
    </Box>
  );
}
