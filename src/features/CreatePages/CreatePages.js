import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import { Outlet, useNavigate } from "react-router-dom";
import { Divider, MenuItem, Select, Typography } from "@mui/material";

const CreatePages = () => {
  const actions = [
    { icon: <BackupTableIcon />, name: "Table", param: "table" },
    { icon: <DynamicFormIcon />, name: "Form", param: "form" },
    { icon: <SaveIcon />, name: "Save" },
  ];
  const navigate = useNavigate();
  const divRef = React.useRef([]);
  const testRef = React.useRef();
  const handleCreate = (param) => {
    navigate(param);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          transform: "translateZ(0px)",
          flexGrow: 1,
        }}
        style={{ height: "100%", minHeight: "650px" }}
      >
        <Box>
          <Typography>Choose Page</Typography>
          <Box mb={2} mt={2}>
            <Select fullWidth name={"choosePage"}>
              <MenuItem value={"student"}>Student</MenuItem>
              <MenuItem value={"teacher"}>Teacher</MenuItem>
            </Select>
          </Box>
        </Box>
        <Divider />
        <Box mt={2}>
          <Outlet />
        </Box>
        <SpeedDial
          ref={testRef}
          ariaLabel="SpeedDial basic example"
          sx={{ position: "fixed", bottom: 0, right: 16 }}
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
      </Box>
    </React.Fragment>
  );
};

export default CreatePages;
