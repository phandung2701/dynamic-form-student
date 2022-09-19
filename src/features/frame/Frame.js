import React, { useEffect, useState } from "react";
import Table from "../../common/Table";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../api/axiosClient";
import { Modal } from "@material-ui/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NewForm from "../../common/Form/NewForm";
import { convertInputToData } from "../../helper/FormBuilder";
import {
  createSchema,
  getPageShema,
  updateSchema,
} from "../../api/pageRequest";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  width: 1100,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StudentList = () => {
  const dispatch = useDispatch();
  const [valueInput, setValueInput] = useState(null);

  const page = useSelector((state) => state.student.page);

  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (Object.keys(page).length <= 0 && !page.table) {
      return;
    } else {
      const fetchData = async () => {
        const row = await axiosClient.get(page?.table?.rows);
        setRows(row);
      };
      fetchData();
    }
  }, [page]);

  const [open, setOpen] = React.useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCreate = () => {
    handleOpen();
    setValueInput(null);
    setIsCreate(true);
  };
  const onSubmit = async (value) => {
    try {
      if (isCreate) {
        await createSchema(`/${page.form.model}`, value);
        toast.success("created !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        await updateSchema(`/${page.form.model}/${valueInput.id}`, value);
        toast.success("updated !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      await getPageShema(page.id, dispatch);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box>
      {Object.keys(page).length > 0 && !!page.table ? (
        <div>
          <Box>
            <Box>
              <Typography variant="h5" align="center">
                {page.table.title}
              </Typography>
            </Box>

            <Box mb={2}>
              <Button
                variant="contained"
                color="success"
                onClick={handleCreate}
              >
                create
              </Button>
            </Box>
          </Box>

          {Object.keys(page.table).length > 0 && (
            <Box>
              <Table
                rows={rows}
                columns={page?.table?.columns}
                name={page?.name}
                form={page?.form}
                idPage={page.id}
                setValueInput={setValueInput}
                open={setOpen}
                setIsCreate={setIsCreate}
                model={page?.table?.rows}
              />
              <ModalCreate
                open={open}
                handleClose={handleClose}
                data={page?.form?.inputField ?? []}
                title={isCreate ? page?.form?.title ?? "" : "update"}
                onSubmit={onSubmit}
                value={valueInput}
                isCreate={isCreate}
              />
            </Box>
          )}
        </div>
      ) : (
        <Box>
          <Typography>chưa có dữ liệu</Typography>
        </Box>
      )}
    </Box>
  );
};
const ModalCreate = ({
  open,
  handleClose,
  data,
  title,
  onSubmit,
  value,
  isCreate,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box mb={2} ml={1}>
          <Typography variant="h5">{title}</Typography>
        </Box>
        {data.length > 0 && (
          <NewForm onSubmit={onSubmit}>
            {data.map((input) =>
              convertInputToData[input.component](input, value)
            )}

            <Button type="submit" variant="contained">
              {isCreate ? "Create" : "Update"}
            </Button>
          </NewForm>
        )}
      </Box>
    </Modal>
  );
};

export default StudentList;
