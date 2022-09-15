import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PreviewTable = () => {
  const { rows, columns, title } = useSelector(
    (state) => state.pages.previewTable
  );
  const navigate = useNavigate();
  return (
    <Box>
      <Box mb={2}>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </Box>
      <Box mb={4} sx={{ textAlign: "center" }}>
        <Typography variant="h4">{title}</Typography>
      </Box>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={7}
          autoHeight={true}
        />
      </div>
    </Box>
  );
};

export default PreviewTable;
