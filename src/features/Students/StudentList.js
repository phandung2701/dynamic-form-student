import React, { useState } from "react";
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
  const [openModalSettingTable, setOpentSettingTable] = useState(false);
  const [valueTab, setValueTab] = React.useState(1);
  const [studentList, setStudentList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const page = useSelector((state) => state.student.page);
  const handleColumnData = async (data) => {
    let newColumns;
    if (valueTab === "addTab" || data.isAdd) {
      newColumns = [...page.columns, { ...data, isAdd: true }];
    } else {
      newColumns = [...page.columns];
      newColumns[valueTab - 1] = data;
    }
    await updateColumnPage(
      { idPage: page.id, data: { columns: newColumns } },
      dispatch
    );
    await getPageStudent(page.id, dispatch);
    setOpentSettingTable(false);
  };
  const option = page.columns.map((item) => {
    return { value: item.field, label: item.field };
  });
  const handleCreate = () => {
    dispatch(setForm({ input: page.inputField, id: page.id }));
    navigate(`create`);
  };

  const handleDeleteStudent = async () => {
    await axiosClient.delete("/student/delete", { data: studentList });
    await updatePageStudent(page.id, dispatch);
  };
  const handleCloseSettingTable = () => {
    setOpentSettingTable(false);
  };
  const handleOpenSettingTable = (callback) => {
    setOpentSettingTable(callback);
  };

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            padding: "30px 0 30px 0",
            marginRight: "5px",
          }}
        >
          Danh sách sinh viên
        </h2>
        <Tooltip title="Thêm Sinh Viên">
          <IconButton>
            <ControlPointIcon
              style={{
                color: "blue",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={handleCreate}
            />
          </IconButton>
        </Tooltip>
      </div>
      <Table
        rows={page.rows}
        columns={page.columns}
        setList={setStudentList}
        list={studentList}
        name={page.name}
        form={page.inputField}
        id={page.id}
        onSetting={handleOpenSettingTable}
        deleteItem={handleDeleteStudent}
      />
      <div>
        <Modal
          style={{
            overflow: "scroll",
          }}
          open={openModalSettingTable}
          onClose={handleCloseSettingTable}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Setting
            </Typography>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={valueTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange}>
                    {page.columns.map((tab, index) => (
                      <Tab
                        icon={tab.isAdd && <ControlPointIcon />}
                        label={`Column ${index + 1}`}
                        value={index + 1}
                        key={index}
                      />
                    ))}
                    <Tab value={"addTab"} icon={<ControlPointIcon />}></Tab>
                  </TabList>
                </Box>
                {page.columns.map((tab, index) => (
                  <TabPanel value={index + 1} key={index}>
                    <ColumnForm
                      data={tab}
                      option={option}
                      setColumn={handleColumnData}
                      selectField={page.selectField}
                    />
                  </TabPanel>
                ))}
                <TabPanel value={"addTab"}>
                  <ColumnForm
                    data={{ field: "", headerName: "", width: "" }}
                    option={option}
                    setColumn={handleColumnData}
                    selectField={page.selectField}
                  />
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

const ColumnForm = ({ data, option, setColumn, selectField }) => {
  const phoneRegExp = /^[0-9\b]+$/;
  const validationSchema = yup.object().shape({
    // field: yup.string("Enter your field").required("field is required"),
    width: yup
      .string("Enter your width")
      .matches(phoneRegExp, "width can only be number")
      .required("width is required"),
    headerName: yup
      .string("Enter your headerName")
      .required("headerName is required"),
  });
  const formik = useFormik({
    initialValues: data,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setColumn(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {Object.keys(data).map((input) =>
        input === "field" ? (
          <Box
            mt={2}
            mb={2}
            key={input}
            style={{ display: "flex", alignItems: "center" }}
          >
            <InputLabel
              id={input}
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
                minWidth: "100px",
              }}
            >
              {input}
            </InputLabel>
            <Select
              fullWidth
              labelId={input}
              id={input}
              name={input}
              value={formik.values[input]}
              onChange={formik.handleChange}
            >
              {selectField.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ) : input === "isAdd" ? null : (
          <Box
            mb={2}
            style={{ display: "flex", alignItems: "center" }}
            key={input}
          >
            <InputLabel
              id={input}
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
                minWidth: "100px",
              }}
            >
              {input}
            </InputLabel>
            <TextField
              fullWidth
              id={input}
              name={input}
              type={input}
              variant="standard"
              value={formik.values[input]}
              onChange={formik.handleChange}
              error={formik.touched[input] && Boolean(formik.errors[input])}
              helperText={formik.touched[input] && formik.errors[input]}
            />
          </Box>
        )
      )}

      <Box mt={3}>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          style={{ marginRight: "10px" }}
        >
          Save
        </Button>
        <Button variant="outlined">cancel</Button>
      </Box>
    </form>
  );
};
export default StudentList;
