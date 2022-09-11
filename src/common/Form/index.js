import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@material-ui/core";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import {
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ModalSetting from "../Modal/ModalSetting";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createStudent } from "../../api/studentRequest";

const Form = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(new Date());
  const inputType = (data, formik) => {
    switch (data.typeInput) {
      case "Input": {
        return (
          <Box mb={2}>
            <TextField
              fullWidth
              id={data.name}
              name={data.name}
              label={data.label}
              value={formik.values[data.name]}
              onChange={formik.handleChange}
              error={
                formik.touched[data.name] && Boolean(formik.errors[data.name])
              }
              helperText={formik.touched[data.name] && formik.errors[data.name]}
            />
          </Box>
        );
      }
      case "Datepicker": {
        return (
          <Box mb={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="birthDay"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        );
      }
      case "Select": {
        return (
          <Box mt={2}>
            <FormControl fullWidth>
              <InputLabel id={data.name}>Class</InputLabel>
              <Select
                labelId={data.name}
                id={data.name}
                label={data.label}
                name={data.name}
                onChange={formik.handleChange}
              >
                {data.option.map((item) => (
                  <MenuItem value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
      }
      case "Radio": {
        return (
          <Box mt={2}>
            <FormControl fullWidth>
              <FormLabel id={data.name}>{data.label}</FormLabel>
              <RadioGroup
                aria-labelledby={data.name}
                defaultValue={data.option[0].label}
                name={data.name}
                onChange={formik.handleChange}
              >
                {data.option.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        );
      }
    }
  };
  const form = useSelector((state) => state.pages.form);
  const validationSchema = yup.object({
    firstName: yup
      .string("Enter your firstName")
      .required("firstName is required"),
    lastName: yup
      .string("Enter your LastName")
      .required("LastName is required"),
  });
  const initialState = form.input.reduce((acc, cur) => {
    return { ...acc, [cur.name]: "s" };
  }, {});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        ...values,
        birthDay: new Date(value).toLocaleString(),
        idPage: form.id,
      };
      const submit = async () => {
        await createStudent(data, dispatch, form.id);
        navigate("/student");
      };
      submit();
    },
  });
  return (
    <div>
      <ModalSetting open={open} setOpen={setOpen} data={form.input} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "10px 0 20px 0",
        }}
      >
        <h2>Create</h2>
        <Grid>
          <Tooltip title={"Setting"}>
            <IconButton onClick={() => setOpen(true)}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Reset setting"}>
            <IconButton>
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {form.input.map((input) => inputType(input, formik))}

        <Box mt={3}>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Form;
