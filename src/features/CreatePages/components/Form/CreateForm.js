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
  Select,
  Stack,
  Switch,
  Tab,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { setPreviewForm } from "../../../../redux/reducers/pageSlice";

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
  const [value, setValue] = React.useState("1");
  const [active, setActive] = React.useState("");
  const [inputActive, setInputActive] = React.useState([]);
  const [data, setData] = React.useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    if (data.length > 0) {
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
  const handleChangeInputApi = (event, type) => {
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
  const handleChangeTypeInput = (e) => {
    const newData = data.map((item) => {
      if (item.id === inputActive.id) {
        return { ...item, ["type"]: e.target.value };
      }
      return item;
    });
    setData(newData);
    setTypeInput(e.target.value);
  };

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
    dispatch(setPreviewForm(data));
    navigate("/createPage/previewForm");
  };
  return (
    <Box>
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
            <NewForm>
              {data.map((input) =>
                convertInputToData(input, setActive, active)
              )}
            </NewForm>
            {data.length > 0 && (
              <Box>
                <Stack spacing={2} mt={5} direction="row">
                  <Button variant="contained">save</Button>
                  <Button variant="outlined" onClick={handlePreview}>
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
                    onChange={(e) => handleChangeInputApi(e, "label")}
                  />
                </Box>

                <Divider />
                <Box mt={2}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          onChange={(e) => handleChangeInputApi(e, "required")}
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
                    onChange={(e) => handleChangeInputApi(e, "width")}
                    value={general.width}
                  />
                </Box>
                <Divider />
                <Box mt={2} mb={2}>
                  <Typography>name</Typography>
                  <Input
                    type="text"
                    value={general.name}
                    onChange={(e) => handleChangeInputApi(e, "name")}
                  />
                </Box>
                <Divider />

                {inputActive.component === "NewInput" && (
                  <Box mt={2}>
                    <FormControl fullWidth>
                      <InputLabel id="type-input">Type</InputLabel>
                      <Select
                        id="type-input"
                        onChange={handleChangeTypeInput}
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

export default CreateForm;
