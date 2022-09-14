import {
  Divider,
  Grid,
  MenuItem,
  Select,
  IconButton,
  Typography,
  Tooltip,
  Stack,
  Button,
} from "@mui/material";
import { borderLeft, Box } from "@mui/system";
import React, { useState } from "react";
import CardColumn from "./CardColumn";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPreviewTable } from "../../../../redux/reducers/pageSlice";

const CreateTable = () => {
  const [columnArr, setColumnArr] = useState([]);
  const handleAddColumn = () => {
    const data = {
      id: uuidv4(),
      field: "",
      width: 0,
      headerName: "",
    };
    setColumnArr([...columnArr, data]);
  };
  const handleDeleteColumn = (id) => {
    const data = columnArr.filter((item) => item.id !== id);
    setColumnArr(data);
  };
  const handleValueColumn = (value) => {
    const data = columnArr.map((item) => {
      if (item.id === value.id) {
        return value;
      }
      return item;
    });
    setColumnArr(data);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePreview = () => {
    dispatch(setPreviewTable({ columns: columnArr, rows: [] }));
    navigate("/createPage/previewTable");
  };
  const field = ["id", "firstname", "lastname", "class", "birthday"];
  return (
    <div>
      <Typography>Table</Typography>
      <Box mt={2} mb={2}></Box>

      <Grid spacing={3} container>
        <Grid
          item
          xs={2}
          sx={{
            borderRight: 1,
            padding: 2,
            borderColor: "grey.400",
            minHeight: 400,
          }}
        >
          <Typography>Rows</Typography>
          <Box mt={2}>
            <Select fullWidth name="selectRow">
              <MenuItem value="student">student</MenuItem>
            </Select>
          </Box>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            borderRight: 1,
            padding: 2,
            borderColor: "grey.400",
            minHeight: 400,
          }}
        >
          <Typography>Column</Typography>
          {columnArr.map((element, index) => (
            <Box key={element?.id}>
              <CardColumn
                onDelete={handleDeleteColumn}
                data={element}
                position={index + 1}
                field={field}
                setValue={handleValueColumn}
              />
            </Box>
          ))}
          {columnArr.length > 0 && (
            <Box>
              <Stack spacing={2} mt={5} direction="row">
                <Button variant="contained">save</Button>
                <Button variant="outlined" onClick={handlePreview}>
                  preview
                </Button>
              </Stack>
            </Box>
          )}
        </Grid>
        <Grid item xs={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
            }}
          >
            <Tooltip title="add" placement="right-start">
              <IconButton color="primary" onClick={handleAddColumn}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateTable;
