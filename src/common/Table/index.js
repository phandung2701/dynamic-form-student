import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import { Stack } from "@mui/system";
import { Popover } from "@material-ui/core";
import { Box, Button, Typography } from "@mui/material";
import { DeleteSchema, getPageShema } from "../../api/pageRequest";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";

const Table = (props) => {
  const { rows, columns, setValueInput, open, setIsCreate, model, idPage } =
    props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openChor = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const dispatch = useDispatch();
  const handleDelete = async (value) => {
    try {
      await DeleteSchema(`${model}/${value.id}`);
      await getPageShema(idPage, dispatch);
      handleClose();
      toast.success("deleted !", {
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
    setValueInput(value.row);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUpdate = (value) => {
    setValueInput(value.row);
    open(true);
    setIsCreate(false);
  };
  const newColumn = [
    ...columns,
    {
      headerName: "Actions",
      type: "actions",
      renderCell: (params) => (
        <Stack spacing={2} direction={"row"}>
          <IconButton color="primary" onClick={() => handleUpdate(params)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={handleClick}>
            <DeleteIcon />
          </IconButton>
          <Popover
            id={id}
            open={openChor}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
          >
            <Box sx={{ p: 1 }}>
              <Typography>Are you sure you want to delete?</Typography>
              <Stack spacing={2} direction="row">
                <Button onClick={() => handleDelete(params)}>Delete</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </Stack>
            </Box>
          </Popover>
        </Stack>
      ),
    },
  ];
  const [pageSize, setPageSize] = React.useState(5);
  const [newRows, setNewRows] = React.useState(rows);
  useEffect(() => {
    setNewRows(rows);
  }, [rows]);

  const onFilterChange = React.useCallback(async (filterModel) => {
    const column = filterModel.items[0];
    const config = {
      contains: {
        [column.columnField]: {
          [column.operatorValue]: column.value,
        },
      },
      equals: {
        [column.columnField]: column.value,
      },
      startsWith: {
        [column.columnField]: {
          [column.operatorValue]: column.value,
        },
      },
      endsWith: {
        [column.columnField]: {
          [column.operatorValue]: column.value,
        },
      },
    };
    const param = config[column.operatorValue];
    const row = await axiosClient.get(
      `${model}?where=${JSON.stringify(param)}`
    );
    setNewRows(row);
  }, []);

  return (
    <div>
      <div style={{ position: "relative" }}>
        <div style={{ height: 500, width: "100%" }}>
          {columns && (
            <DataGrid
              rows={newRows}
              columns={newColumn}
              autoHeight={true}
              filterMode="server"
              onFilterModelChange={onFilterChange}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
