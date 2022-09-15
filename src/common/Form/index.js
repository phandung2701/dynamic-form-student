import React from "react";

import { Button } from "@material-ui/core";

import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import NewForm from "./NewForm";
import { convertInputToData } from "../../helper/FormBuilder";

const Form = () => {
  const { form } = useSelector((state) => state.pages.form);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => console.log(values);
  console.log(form);
  return (
    <div>
      {!form ? (
        <>no Form</>
      ) : (
        <Box>
          <Box>
            <Typography variant="h5">{form.title}</Typography>
          </Box>
          <NewForm onSubmit={onSubmit}>
            {form.inputField.map((input) => convertInputToData(input))}
            <Box mt={3}>
              <Button color="primary" variant="contained" type="submit">
                Create
              </Button>
            </Box>
          </NewForm>
        </Box>
      )}
    </div>
  );
};

export default Form;
