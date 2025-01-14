import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Switch,
  Tab,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TitleIcon from "@mui/icons-material/Title";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import EventIcon from "@mui/icons-material/Event";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import NewForm from "../../../../common/Form/NewForm";
import { convertInputToData } from "../../../../helper/FormBuilder";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { setPreviewForm } from "../../../../redux/reducers/pageSlice";
import { updateTablePage } from "../../../../api/pageRequest";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  width: 1100,
  bgcolor: "#fff",
  borderRadius: "5px",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateForm = () => {
  const item = [
    {
      icon: <CheckBoxIcon />,
      name: "Checkbox",
      color: "primary",
      addInput: {
        id: uuidv4(),
        name: "Checkbox",
        component: "NewCheckBox",
        options: ["option1", "option2", "option3"],
        label: "CheckBox",
      },
    },
    {
      icon: <RadioButtonCheckedIcon />,
      name: "Radio",
      color: "secondary",
      addInput: {
        id: "12346s",
        name: "Radio",
        component: "NewRadio",
        options: ["option1", "option2", "option3"],
        label: "Radio",
      },
    },
    {
      icon: <TextFieldsIcon />,
      name: "Text",
      color: "success",
      addInput: {
        id: uuidv4(),
        name: "Text",
        component: "NewInput",
        type: "text",
        label: "label",
      },
    },
    {
      icon: <TextSnippetIcon />,
      name: "Text Area",
      color: "info",
      addInput: {
        id: uuidv4(),
        name: "Text",
        component: "NewInput",
        type: "text",
        label: "label",
      },
    },
    {
      icon: <EventIcon />,
      name: "Date",
      color: "warning",
      addInput: {
        id: uuidv4(),
        name: "Date",
        component: "NewDateSpicker",
        type: "text",
        label: "label",
      },
    },
    { icon: <QueryBuilderIcon />, name: "Date Time", color: "primary" },
    {
      icon: <ArrowDropDownIcon />,
      name: "Select",
      color: "primary",
      addInput: {
        id: uuidv4(),
        name: "demo5",
        component: "NewSelect",
        options: ["option1", "option2", "option3"],
      },
    },
    {
      icon: <DeleteIcon />,
      name: "Delete",
      color: "error",
    },
  ];
  const { page, model } = useOutletContext();

  const [value, setValue] = React.useState("1");
  const [active, setActive] = React.useState("");
  const [inputActive, setInputActive] = React.useState([]);
  const [data, setData] = React.useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (!page.form) {
      setData([]);
      return;
    }
    setData(page.form?.inputField);
    setNameForm(page.form?.title);
  }, [page]);

  const [typeInput, setTypeInput] = React.useState("text");
  const [general, setGeneral] = React.useState({
    label: "",
    name: "",
    required: false,
    type: "",
    width: 0,
  });
  const [textArea, setTextArea] = React.useState("");
  useEffect(() => {
    console.log(data);
    if (data.length > 0 && !!active) {
      const input = data.filter((item) => item.id === active);

      const general = {
        label: input[0].label,
        name: input[0].name,
      };
      setGeneral(general);
      setInputActive(input[0]);
      setTypeInput(input[0].type);
      if (!["NewInput", "NewDateSpicker"].includes(input[0].component)) {
        setTextArea(input[0].options.join("\n"));
      }
    }
  }, [active]);

  const handleAddInput = (option) => {
    if (option.name === "Delete") {
      const newData = data.filter((item) => item.id !== inputActive.id);
      setData(newData);
      return;
    }
    setData([...data, option.addInput]);
  };
  const handleInputApi = (event, type) => {
    const newData = data.map((item) => {
      if (item.id === inputActive.id) {
        if (type === "required") {
          return { ...item, [type]: event.target.checked };
        }
        return { ...item, [type]: event.target.value };
      }

      return item;
    });
    setData(newData);
    type === "required"
      ? setGeneral({ ...general, [type]: event.target.checked })
      : setGeneral({ ...general, [type]: event.target.value });
  };
  const handleTypeInput = (e) => {
    const newData = data.map((item) => {
      if (item.id === inputActive.id) {
        return { ...item, ["type"]: e.target.value };
      }
      return item;
    });
    setData(newData);
    setTypeInput(e.target.value);
  };
  const [nameForm, setNameForm] = useState("");
  const handelOption = (e) => {
    const newData = data.map((item) => {
      if (item.id === inputActive.id) {
        return { ...item, options: e.target.value.split("\n") };
      }
      return item;
    });
    setData(newData);
    setTextArea(e.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePreview = () => {
    dispatch(setPreviewForm({ title: nameForm, data: data, page: page }));
    navigate("/createPage/previewForm");
  };
  const handleNameForm = (e) => {
    setNameForm(e.target.value);
  };

  const handleSaveForm = async () => {
    try {
      const update = await updateTablePage(page.id, {
        form: { title: nameForm, inputField: data, model: model.name },
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <ModalPreviewForm
        open={open}
        handleClose={handleClose}
        data={data}
        title={nameForm}
        handelSaveForm={handleSaveForm}
      />
      <Typography>Create form</Typography>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={1} sx={{ borderRight: 1, borderColor: "grey.400" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
              borderRadius: 1,
              margin: "0 auto",
              boxShadow: 1,
            }}
          >
            <Tooltip title="thêm tiêu đề" placement="left-start">
              <IconButton>
                <TitleIcon />
              </IconButton>
            </Tooltip>
            {item.map((option) => (
              <Tooltip
                title={option.name}
                placement="left-start"
                key={option.name}
              >
                <IconButton
                  color={option.color}
                  onClick={() => handleAddInput(option)}
                >
                  {option.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{ borderRight: 1, padding: 2, borderColor: "grey.400" }}
        >
          <Box>
            <Box>
              <FormGroup>
                <InputLabel>Name Form</InputLabel>
                <Input onChange={handleNameForm} value={nameForm} />
              </FormGroup>
            </Box>
            <NewForm>
              {data.map((input) =>
                convertInputToData[input.component](
                  input,
                  null,
                  setActive,
                  active
                )
              )}
            </NewForm>
            {data.length > 0 && (
              <Box>
                <Stack spacing={2} mt={5} direction="row">
                  <Button variant="contained" onClick={handleSaveForm}>
                    save
                  </Button>
                  <Button variant="outlined" onClick={handleOpen}>
                    preview
                  </Button>
                </Stack>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="General" value="1" />
                  <Tab label="Options" value="2" />
                  <Tab label="Advanced" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box mb={2}>
                  <Typography>Label</Typography>
                  <Input
                    placeholder="enter your label"
                    value={general.label}
                    onChange={(e) => handleInputApi(e, "label")}
                  />
                </Box>

                <Divider />
                <Box mt={2}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          onChange={(e) => handleInputApi(e, "required")}
                          checked={
                            general?.required ? general?.required : false
                          }
                        />
                      }
                      label="Required"
                    />
                  </FormGroup>
                </Box>
                <Divider />
                <Box mt={2} mb={2}>
                  <Typography>width</Typography>
                  <Input
                    type="number"
                    onChange={(e) => handleInputApi(e, "width")}
                    value={general.width}
                  />
                </Box>
                <Divider />
                <Box mt={2} mb={2}>
                  <FormGroup fullWidth>
                    <InputLabel id="name-input">Name</InputLabel>
                    <Select
                      id="name-input"
                      value={general.name}
                      onChange={(e) => handleInputApi(e, "name")}
                    >
                      {model.attribute.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormGroup>
                </Box>
                <Divider />

                {inputActive.component === "NewInput" && (
                  <Box mt={2}>
                    <FormControl fullWidth>
                      <InputLabel id="type-input">Type</InputLabel>
                      <Select
                        id="type-input"
                        onChange={handleTypeInput}
                        label="text"
                        value={typeInput}
                      >
                        <MenuItem value="text">Text</MenuItem>
                        <MenuItem value="number">Number</MenuItem>

                        <MenuItem value="password">Password</MenuItem>

                        <MenuItem value="email">Email</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                )}
              </TabPanel>
              <TabPanel value="2">
                <Box mb={2}>
                  <Typography>Sub Label</Typography>
                  <Input fullWidth />
                  <small style={{ display: "block", marginTop: "5px" }}>
                    Add a small description below the input field
                  </small>
                </Box>
                <Divider />
                {!["NewInput", "NewDateSpicker"].includes(
                  inputActive.component
                ) && (
                  <Box mt={2}>
                    <InputLabel id="textarea">options</InputLabel>
                    <FormControl fullWidth>
                      <TextareaAutosize
                        id="textarea"
                        label="test"
                        minRows={4}
                        style={{
                          width: 280,
                          marginTop: "10px",
                          padding: "5px",
                        }}
                        onChange={handelOption}
                        value={textArea}
                      />
                    </FormControl>
                  </Box>
                )}
              </TabPanel>
              <TabPanel value="3">
                <FormGroup>
                  <FormControlLabel control={<Switch />} label="Read-only" />
                  <FormControlLabel control={<Switch />} label="Hide field" />
                  <FormControlLabel control={<Switch />} label="Shrink" />
                </FormGroup>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const ModalPreviewForm = ({
  handelSaveForm,
  title,
  data,
  open,
  handleClose,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box>
          <Box mb={2} ml={1}>
            <Typography variant="h5">{title}</Typography>
          </Box>
          <NewForm>
            {data.map((input) => convertInputToData[input.component](input))}
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </NewForm>
        </Box>
        <Box>
          <Stack spacing={2} mt={2} direction="row">
            <Button variant="outlined" onClick={() => handelSaveForm()}>
              Save
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};
export default CreateForm;
