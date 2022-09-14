import { useState } from "react";
import {
  Box,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const CardColumn = ({ data, onDelete, position, field, setValue }) => {
  const [cardValue, setCardValue] = useState({
    id: data.id,
    field: "",
    width: 100,
    headerName: "",
  });
  const handleSetValue = (e, name) => {
    const data = { ...cardValue, [name]: e.target.value };
    setCardValue(data);
    setValue(data);
  };
  return (
    <>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          <Box
            sx={{
              border: 1,
              borderColor: "grey.400",
              padding: 2,
              borderRadius: 1,
            }}
          >
            <Box>
              <Box mt={2} mb={2}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <InputLabel>field</InputLabel>
                    <Select
                      fullWidth
                      variant="standard"
                      value={cardValue.field}
                      onChange={(e) => handleSetValue(e, "field")}
                    >
                      {field.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel>width</InputLabel>
                    <Input
                      fullWidth
                      type="number"
                      value={cardValue.width}
                      onChange={(e) => handleSetValue(e, "width")}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel>headerName</InputLabel>
                    <Input
                      value={cardValue.headerName}
                      fullWidth
                      onChange={(e) => handleSetValue(e, "headerName")}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <InputLabel>Column Number : </InputLabel>
                <Input type="number" readOnly value={Number(position)} />
              </Box>
              <Box>
                <Tooltip title="delete" placement="bottom-start">
                  <IconButton color={"error"} onClick={() => onDelete(data.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CardColumn;
