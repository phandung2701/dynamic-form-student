import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  Button,
  Divider,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../api/pageRequest";
import { Grid } from "@material-ui/core";
import { Stack } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import models from "../../data.json";

const CreatePages = () => {
  const actions = [
    { icon: <BackupTableIcon />, name: "Table", param: "table" },
    { icon: <DynamicFormIcon />, name: "Form", param: "form" },
  ];
  const page = useSelector((state) => state.pages.page);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [choosePage, setChoosePage] = React.useState("");
  const [showCreatePage, setShowCreatePage] = React.useState(false);
  const [namePage, setNamePage] = React.useState("");
  const [error, setError] = React.useState(false);
  const [model, setModel] = React.useState("");
  const { search } = useLocation();
  React.useEffect(() => {
    if (!!search) {
      setChoosePage(search.split("=")[1]);

      const filter = page.filter((item) => item.id === search.split("=")[1])[0];
      if (!filter.form) {
        setModel(" ");
        return;
      }
      setModel(models.filter((item) => item.name === filter.form.model)[0].id);
    }
  }, []);
  const handleCreate = (param) => {
    if (model.trim() === "") {
      toast.warning("you need to select the model first", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      navigate(param);
    }
  };

  const handleChangePage = (e) => {
    setChoosePage(e.target.value);

    const filter = page.filter((item) => item.id === e.target.value)[0];
    if (!filter.form) {
      setModel(" ");
      return;
    }
    setModel(models.filter((item) => item.name === filter.form.model)[0].id);
  };
  const handleNamePage = (e) => {
    setError(false);
    setNamePage(e.target.value);
  };
  const handleCreatePage = async () => {
    try {
      if (namePage.trim() === "") {
        setError(true);
        return;
      }

      await createPage({ name: namePage }, dispatch);

      setChoosePage(namePage);
      setShowCreatePage(false);

      toast.success("Created !", {
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

  const handelShowCreatePage = () => {
    navigate("/createPage");
    setShowCreatePage(true);
  };
  return (
    <React.Fragment>
      <ToastContainer />
      <Box
        sx={{
          transform: "translateZ(0px)",
          flexGrow: 1,
        }}
        style={{ height: "100%", minHeight: "650px" }}
      >
        <Box>
          <Box mb={2} mt={2}>
            {showCreatePage ? (
              <Box mt={2}>
                <FormGroup>
                  <TextField
                    name="namePage"
                    label="Name"
                    error={error}
                    value={namePage}
                    variant="filled"
                    helperText={error && "Incorrect entry."}
                    onChange={handleNamePage}
                  />
                </FormGroup>
                <Box mt={2}>
                  <Stack spacing={2} mt={5} direction="row">
                    <Button onClick={handleCreatePage} variant="contained">
                      Create
                    </Button>
                    <Button
                      onClick={() => setShowCreatePage(false)}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              </Box>
            ) : (
              <Box mb={2}>
                <Box mb={2}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={5}>
                      <FormGroup fullWidth>
                        <InputLabel>Choose Page</InputLabel>
                        <Select
                          name={"choosePage"}
                          onChange={handleChangePage}
                          value={choosePage}
                        >
                          {page.map((page) => (
                            <MenuItem value={page.id} key={page.id}>
                              {page.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={4}>
                      <FormGroup fullWidth>
                        <InputLabel>Choose Model</InputLabel>
                        <Select
                          name={"chooseModel"}
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                        >
                          {models.map((model) => (
                            <MenuItem value={model.id} key={model.id}>
                              {model.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={3}>
                      <Button onClick={handelShowCreatePage}>Create</Button>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box mt={2}>
                  {model.trim() === "" ? null : (
                    <Outlet
                      context={{
                        page: page.filter((item) => item.id === choosePage)[0],
                        model: models.filter((item) => item.id === model)[0],
                      }}
                    />
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {!showCreatePage && (
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "fixed", bottom: 40, right: 100 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleCreate(action.param)}
            />
          ))}
        </SpeedDial>
      )}
    </React.Fragment>
  );
};

export default CreatePages;
