import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Stack } from "@mui/system";
import { deletePage } from "../../api/pageRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const style = {
  position: "fixed",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  width: 800,
  borderRadius: "5px",
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PageList = () => {
  const page = useSelector((state) => state.pages.page);
  const [idPage, setIdPage] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDeletePage = async () => {
    try {
      await deletePage(idPage, dispatch);
      toast.success("deleted !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };
  const navigate = useNavigate();
  const handleSetIdPage = (page) => {
    handleOpen();
    setIdPage(page.id);
  };
  const handleUpdatePage = (row) => {
    navigate(`/createPage?id=${row.id}`);
  };
  return (
    <Box>
      <ModalDelete
        open={open}
        handleClose={handleClose}
        handleDeletePage={handleDeletePage}
      />
      <Box mb={2} mt={1}>
        <Typography variant="h5" align="center">
          Danh sach page
        </Typography>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">CreatedAt</TableCell>
                <TableCell align="center">action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {page.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="right">
                    <Stack
                      spacing={2}
                      direction="row"
                      justifyContent={"center"}
                    >
                      <EditIcon
                        color="primary"
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleUpdatePage(row)}
                      />
                      <DeleteIcon
                        color="error"
                        onClick={() => handleSetIdPage(row)}
                        sx={{ cursor: "pointer" }}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
const ModalDelete = ({ open, handleClose, handleDeletePage }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography>Are you sure you want to delete the page?</Typography>
        <Box>
          <Stack spacing={2} direction="row">
            <Button onClick={() => handleDeletePage()}>Delete</Button>
            <Button onClick={() => handleClose()}>Cancel</Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default PageList;
