import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewForm from "../../../../common/Form/NewForm";
import { convertInputToData } from "../../../../helper/FormBuilder";

const PreviewForm = () => {
  const form = useSelector((state) => state.pages.previewForm);
  const { title, data, page } = form;
  const onSubmit = (value) => console.log(value);
  const navigate = useNavigate();
  const handelSaveForm = () => {
    console.log("save");
  };
  return (
    <Box>
      <Box>
        <Stack spacing={2} mt={2} direction="row">
          <Button onClick={() => navigate(-1)}>Back</Button>
          <Button variant="contained" onClick={handelSaveForm}>
            Save
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          width: 1000,
          margin: "0 auto",
          boxShadow: 1,
          padding: 2,
          paddingLeft: 5,
        }}
      >
        <Box mb={2} ml={1}>
          <Typography variant="h5">{title}</Typography>
        </Box>
        <NewForm onSubmit={onSubmit}>
          {data.map((input) => convertInputToData(input))}
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </NewForm>
      </Box>
    </Box>
  );
};

export default PreviewForm;
