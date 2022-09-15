import React, { useEffect, useState } from "react";
import Table from "../../common/Table";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../api/axiosClient";
import { getPageStudent, updatePageStudent } from "../../api/studentRequest";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { setForm } from "../../redux/reducers/pageSlice";
import { Modal } from "@material-ui/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { updateColumnPage } from "../../api/pageRequest";
import NewForm from "../../common/Form/NewForm";
import { convertInputToData } from "../../helper/FormBuilder";

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
  const [studentList, setStudentList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const page = useSelector((state) => state.student.page);
  console.log(page);

  const handleCreate = () => {
    dispatch(setForm({ form: page.form, id: page.id }));
    navigate(`create`);
  };
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
  }, []);
  const handleDeleteStudent = async () => {
    await axiosClient.delete("/student/delete", { data: studentList });
    await updatePageStudent(page.id, dispatch);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSubmit = (value) => console.log(value);
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
              <Button variant="contained" color="success" onClick={handleOpen}>
                create
              </Button>
            </Box>
          </Box>

          {Object.keys(page.table).length > 0 && (
            <Box>
              <Table
                rows={rows}
                columns={page?.table?.columns}
                setList={setStudentList}
                list={studentList}
                name={page?.name}
                form={page?.form}
                id={page.id}
                deleteItem={handleDeleteStudent}
              />
              <ModalCreate
                open={open}
                handleClose={handleClose}
                data={page?.form?.inputField ?? []}
                title={page?.form?.title ?? ""}
                onSubmit={onSubmit}
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
const ModalCreate = ({ open, handleClose, data, title, onSubmit }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box mb={2} ml={1}>
          <Typography variant="h5">{title}</Typography>
        </Box>
        {data.length > 0 && (
          <NewForm onSubmit={onSubmit}>
            {data.map((input) => convertInputToData(input))}
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </NewForm>
        )}
      </Box>
    </Modal>
  );
};

export default StudentList;
