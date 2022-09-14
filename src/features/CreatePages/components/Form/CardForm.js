import { Box } from "@mui/system";
import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Grid, Input, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import EventIcon from "@mui/icons-material/Event";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import NewForm from "../../../../common/Form/NewForm";
import {
  NewCheckBox,
  NewDateSpicker,
  NewInput,
  NewRadio,
  NewSelect,
} from "../../../../common/CustomInput";

const item = [
  { icon: <CheckBoxIcon />, name: "Checkbox" },
  { icon: <RadioButtonCheckedIcon />, name: "Radio", param: "form" },
  { icon: <TextFieldsIcon />, name: "Text" },
  { icon: <TextSnippetIcon />, name: "Text Area" },
  { icon: <EventIcon />, name: "Date" },
  { icon: <QueryBuilderIcon />, name: "Date Time" },
  { icon: <ArrowDropDownIcon />, name: "Select" },
];

const CardForm = () => {
  const [arrInput, setArrInput] = useState([]);

  const convertComponent = (data) => {
    switch (data.component) {
      case "newInput":
        return <NewInput name={data.name} {...data} />;
    }
  };
  const onSubmit = (data) => console.log(data);
  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <Box
          sx={{
            padding: 2,
            borderRadius: 1,
            borderColor: "grey.400",
            minHeight: 100,
          }}
        >
          <Box sx={{ marginTop: "20px" }}></Box>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <Tooltip title="Delete" placement="right-start">
            <IconButton color={"error"}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CardForm;
