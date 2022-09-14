import { Box, Input } from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const Text = ({ register, name, required, ...rest }) => {
  return (
    <Box>
      <TextField
        sx={{ width: 500 }}
        label="Label"
        {...register(name, required)}
        {...rest}
      />
      <small style={{ display: "block", marginTop: "5px" }}>sub label</small>
    </Box>
  );
};

export default Text;
