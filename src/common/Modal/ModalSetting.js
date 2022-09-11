import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Divider,
  MenuList,
  MenuItem,
  ListItemText,
  Grid,
  ListItemIcon,
  TextField,
} from "@mui/material";
import { FormGroup, InputLabel, FormControl, Select } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Tooltip from "@mui/material/Tooltip";
import { useFormik } from "formik";
import * as yup from "yup";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

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

const ModalSetting = ({ open, setOpen, data }) => {
  const handleClose = () => setOpen(false);
  const [checkbox, setCheckBox] = React.useState([{ label: "", checked: "" }]);
  const [selectOption, setSelectOption] = React.useState([
    { value: "", label: "" },
  ]);
  const [radioOption, setRadioOption] = React.useState([
    { label: "", checked: "" },
  ]);
  const validationSchema = yup.object({
    label: yup.string("Enter your label").required("Label is required"),
  });

  const handleOption = (e, index) => {
    const data = [...checkbox];
    data[index] = e.target.value;
    setCheckBox(data);
  };
  const handleSelectOption = (e, index) => {
    const data = [...selectOption];
    data[index][e.target.name] = e.target.value;
    setSelectOption(data);
  };

  const handleAddOption = (type) => {
    switch (type) {
      case "Checkbox": {
        setCheckBox([...checkbox, { label: "", checked: "" }]);
        break;
      }
      case "Select": {
        setSelectOption([...selectOption, { value: "", label: "" }]);
        break;
      }
      case "Radio": {
        setRadioOption([...radioOption, { checked: "", label: "" }]);
        break;
      }
      default:
        return;
    }
  };

  const handleDeleteSelectOption = (index) => {
    setSelectOption(selectOption.filter((item, i) => i !== index));
  };
  const handleDeleteCheckboxOption = (index) => {
    setCheckBox(checkbox.filter((item, i) => i !== index));
  };
  const handleDeleteRadioOption = (index) => {
    setRadioOption(radioOption.filter((item, i) => i !== index));
  };
  const formik = useFormik({
    initialValues: {
      label: "",
      Checkbox: [],
      Radio: "",
      selectOption: [],
      typeInput: "Input",
      typeData: "Short text",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.Checkbox = checkbox;
      values.selectOption = selectOption;
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <Modal
        style={{
          overflow: "scroll",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Setting
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <MenuList>
                {data.map((item) => (
                  <Box key={item.name}>
                    <Divider />
                    <MenuItem style={{ width: "100%", padding: "10px" }}>
                      <ListItemText>{item.label}</ListItemText>
                    </MenuItem>
                  </Box>
                ))}

                <Divider />
                <MenuItem style={{ width: "100%", padding: "10px" }}>
                  <ListItemIcon>
                    <ControlPointIcon />
                  </ListItemIcon>
                  <ListItemText>add field</ListItemText>
                </MenuItem>
              </MenuList>
            </Grid>
            <Grid item xs={9}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        id="label"
                        name="label"
                        label="Label"
                        variant="standard"
                        value={formik.values["label"]}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.label && Boolean(formik.errors.label)
                        }
                        helperText={formik.touched.label && formik.errors.label}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={5}>
                    <Box mb={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          TypeData
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Type"
                          name="typeData"
                          value={formik.values.typeData}
                          onChange={formik.handleChange}
                        >
                          <MenuItem value={"Number"}>Number</MenuItem>
                          <MenuItem value={"Short text"}>Short text</MenuItem>
                          <MenuItem value={"Text"}>Text</MenuItem>
                          <MenuItem value={"Email"}>Email</MenuItem>
                          <MenuItem value={"Password"}>Password</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
                <Box mb={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Type Input
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Type"
                      name="typeInput"
                      value={formik.values.typeInput}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value={"Input"}>Input</MenuItem>
                      <MenuItem value={"Checkbox"}>Checkbox</MenuItem>
                      <MenuItem value={"Radio"}>Radio</MenuItem>
                      <MenuItem value={"Datepicker"}>Datepicker</MenuItem>
                      <MenuItem value={"Select"}>Select</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {formik.values.typeInput === "Checkbox" && (
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormGroup>
                        <Typography mb={2}>Option</Typography>
                        {checkbox.map((item, index) => (
                          <Grid container spacing={2}>
                            <Grid item xs={11}>
                              <Box mb={2} key={item}>
                                <TextField
                                  fullWidth
                                  id="label"
                                  label="value"
                                  value={checkbox[index].label ?? ""}
                                  variant="standard"
                                  onChange={(e) => handleOption(e, index)}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={1}>
                              {checkbox.length > 1 && (
                                <Tooltip title={"Delete"}>
                                  <IconButton
                                    onClick={() =>
                                      handleDeleteCheckboxOption(index)
                                    }
                                  >
                                    <RemoveCircleOutlineIcon color="primary" />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </Grid>
                          </Grid>
                        ))}
                      </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                      <Box mt={5} ml={4}>
                        <Tooltip title={"add field"}>
                          <IconButton
                            onClick={() => handleAddOption("Checkbox")}
                          >
                            <ControlPointIcon
                              fontSize="large"
                              color="primary"
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Grid>
                  </Grid>
                )}
                {formik.values.typeInput === "Radio" && (
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormGroup>
                        <Typography mb={2}>Option</Typography>
                        {radioOption.map((item, index) => (
                          <Grid container spacing={2}>
                            <Grid item xs={11}>
                              <Box mb={2} key={item}>
                                <TextField
                                  fullWidth
                                  id="label"
                                  label="value"
                                  value={radioOption[index].label ?? ""}
                                  variant="standard"
                                  onChange={(e) => handleOption(e, index)}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={1}>
                              {radioOption.length > 1 && (
                                <Tooltip title={"Delete"}>
                                  <IconButton
                                    onClick={() =>
                                      handleDeleteRadioOption(index)
                                    }
                                  >
                                    <RemoveCircleOutlineIcon color="primary" />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </Grid>
                          </Grid>
                        ))}
                      </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                      <Box mt={5} ml={4}>
                        <Tooltip title={"add field"}>
                          <IconButton onClick={() => handleAddOption("Radio")}>
                            <ControlPointIcon
                              fontSize="large"
                              color="primary"
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Grid>
                  </Grid>
                )}
                {formik.values.typeInput === "Select" && (
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <FormGroup>
                        <Typography mb={2}>Option</Typography>
                        {selectOption.map((input, index) => (
                          <Grid container spacing={2} key={index}>
                            <Grid item xs={6}>
                              <Box mb={2}>
                                <TextField
                                  fullWidth
                                  label="value"
                                  name="value"
                                  value={input.value ?? ""}
                                  variant="standard"
                                  onChange={(e) => handleSelectOption(e, index)}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={5}>
                              <Box mb={2}>
                                <TextField
                                  fullWidth
                                  label="label"
                                  name="label"
                                  value={input.label ?? ""}
                                  variant="standard"
                                  onChange={(e) => handleSelectOption(e, index)}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={1}>
                              {selectOption.length > 1 && (
                                <Tooltip title={"Delete"}>
                                  <IconButton
                                    onClick={() =>
                                      handleDeleteSelectOption(index)
                                    }
                                  >
                                    <RemoveCircleOutlineIcon color="primary" />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </Grid>
                          </Grid>
                        ))}
                      </FormGroup>
                    </Grid>
                    <Grid item xs={3}>
                      <Box mt={5} ml={4}>
                        <Tooltip title={"add field"}>
                          <IconButton onClick={() => handleAddOption("Select")}>
                            <ControlPointIcon
                              fontSize="large"
                              color="primary"
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Grid>
                  </Grid>
                )}
                <Button
                  style={{ marginTop: "10px" }}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Save
                </Button>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalSetting;
