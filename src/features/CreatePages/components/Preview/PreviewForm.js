import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewForm from "../../../../common/Form/NewForm";
import { convertInputToData } from "../../../../helper/FormBuilder";

const PreviewForm = () => {
  const form = useSelector((state) => state.pages.previewForm);
  const onSubmit = (value) => console.log(value);
  const navigate = useNavigate();
  return (
    <Box>
      <Box>
        <Stack spacing={2} mt={2} direction="row">
          <Button onClick={() => navigate(-1)}>Back</Button>
          <Button variant="contained">Save</Button>
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
        <NewForm onSubmit={onSubmit}>
          {form.map((input) => convertInputToData(input))}

          <Button type="submit">Submit</Button>
        </NewForm>
      </Box>
    </Box>
  );
};

export default PreviewForm;
