import {
  Grid,
  IconButton,
  Typography,
  Tooltip,
  Stack,
  Button,
  FormGroup,
  InputLabel,
  Input,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CardColumn from "./CardColumn";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { setPreviewTable } from "../../../../redux/reducers/pageSlice";

import { updateTablePage } from "../../../../api/pageRequest";
import { toast } from "react-toastify";

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
  const { page, model } = useOutletContext();
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
    dispatch(setPreviewTable({ columns: columnArr, rows: [], title: title }));
    navigate("/createPage/previewTable");
  };
  const [rows, setRows] = useState(model.name);
  const [title, setTitle] = useState("");

  const handleChangeTitleTable = (e) => {
    setTitle(e.target.value);
  };
  const handleSaveTable = async () => {
    try {
      const update = await updateTablePage(page.id, {
        table: { title: title, columns: columnArr, rows: `/${rows}` },
      });
      toast.success("saved !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (!page.table) {
      setColumnArr([]);
      setTitle("");

      return;
    }
    setColumnArr(page.table?.columns);
    !page.table.title ? setTitle("") : setTitle(page.table?.title);
  }, [page]);
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
          <Box mt={2}>
            <FormGroup fullWidth>
              <Box mb={2}>
                <InputLabel>Title</InputLabel>
                <Input
                  name="title"
                  onChange={handleChangeTitleTable}
                  value={title}
                />
              </Box>
            </FormGroup>
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
                field={model.attribute}
                setValue={handleValueColumn}
              />
            </Box>
          ))}
          {columnArr.length > 0 && (
            <Box>
              <Stack spacing={2} mt={5} direction="row">
                <Button variant="contained" onClick={handleSaveTable}>
                  save
                </Button>
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
