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
  Modal,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CardColumn from "./CardColumn";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

import { updateTablePage } from "../../../../api/pageRequest";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";

const style = {
  position: "fixed",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  width: 1100,
  borderRadius: "5px",
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateTable = () => {
  const [columnArr, setColumnArr] = useState([]);
  const handleAddColumn = () => {
    const data = {
      id: uuidv4(),
      field: "",
      width: 100,
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

  const [rows, setRows] = useState(model.name);
  const [title, setTitle] = useState("");

  const handleChangeTitleTable = (e) => {
    setTitle(e.target.value);
  };
  const handleSaveTable = async () => {
    try {
      await updateTablePage(page.id, {
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <ModalPreviewTable
        open={open}
        handleClose={handleClose}
        handleSaveTable={handleSaveTable}
        rows={[]}
        columns={columnArr}
        title={title}
      />
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
                <Button variant="outlined" onClick={handleOpen}>
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

const ModalPreviewTable = ({
  rows,
  columns,
  handleSaveTable,
  open,
  handleClose,
  title,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box mb={2}>
          <Button onClick={() => handleSaveTable()}>save</Button>
        </Box>
        <Box mb={4} sx={{ textAlign: "center" }}>
          <Typography variant="h4">{title}</Typography>
        </Box>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            autoHeight={true}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default CreateTable;
