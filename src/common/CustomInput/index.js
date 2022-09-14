import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function NewInput({
  register,
  setValue,
  name,
  errors,
  setError,
  active,
  id,
  setActive,
  required,
  ...rest
}) {
  const [errorInput, setErrorInput] = useState(false);

  const handleChangeValueInput = (e) => {
    if (e.target.value.trim() === "" && required) {
      setError(name, {
        type: "manual",
        message: "Error message",
      });

      setErrorInput(true);
    } else {
      setValue(name, e.target.value, { shouldValidate: true });
      setErrorInput(false);
    }
  };
  const handleActiveInput = () => {
    if (!setActive) {
      return;
    }
    setActive(id);
  };
  return (
    <Box
      mt={2}
      style={
        id === active
          ? { border: "2px solid blue", padding: "20px", borderRadius: "5px" }
          : null
      }
      mb={2}
      onClick={handleActiveInput}
    >
      <TextField
        error={errorInput}
        sx={{ width: 500 }}
        label="Label"
        {...register(name, { required: true })}
        {...rest}
        onChange={handleChangeValueInput}
        helperText={errors[name] && errors[name].message}
      />
    </Box>
  );
}

export function NewSelect({
  register,
  options,
  name,
  active,
  id,
  label,
  setActive,
  required,
  ...rest
}) {
  const handleActiveInput = () => {
    if (!setActive) {
      return;
    }
    setActive(id);
  };
  return (
    <Box
      mt={2}
      mb={2}
      onClick={handleActiveInput}
      style={
        id === active
          ? { border: "2px solid blue", padding: "20px", borderRadius: "5px" }
          : null
      }
    >
      <FormControl sx={{ width: 500 }}>
        <InputLabel id={id}>{label}</InputLabel>
        <Select {...register(name, required)} {...rest} label={label}>
          {options.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export function NewCheckBox({
  register,
  options,
  setValue,
  name,
  active,
  setActive,
  id,
  label,
  required,
  ...rest
}) {
  const [valueChecked, setValueChecked] = useState([]);
  const handleChangeCheckBox = (event, option) => {
    if (valueChecked.includes(event.target.value)) {
      const data = valueChecked.filter((item) => item !== event.target.value);
      setValueChecked(data);
      setValue(name, data);
    } else {
      const data = [...valueChecked, event.target.value];
      setValueChecked(data);
      setValue(name, data);
    }
  };
  const handleActiveInput = () => {
    if (!setActive) {
      return;
    }
    setActive(id);
  };
  return (
    <Box
      mt={2}
      mb={2}
      onClick={handleActiveInput}
      style={
        id === active
          ? { border: "2px solid blue", padding: "20px", borderRadius: "5px" }
          : null
      }
    >
      <FormGroup {...register(name, required)}>
        <FormLabel>{label}</FormLabel>
        {options.map((value) => (
          <FormControlLabel
            control={<Checkbox checked={valueChecked.includes(value)} />}
            onChange={(e) => handleChangeCheckBox(e, value)}
            label={value}
            value={value}
            key={value}
            {...rest}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
export function NewRadio({
  register,
  options,
  setValue,
  active,
  setActive,
  name,
  id,
  label,
  required,
  ...rest
}) {
  const handleChangeRadio = (e) => {
    setValue(name, e.target.value);
  };
  const handleActiveInput = () => {
    if (!setActive) {
      return;
    }
    setActive(id);
  };
  return (
    <Box
      mt={2}
      mb={2}
      onClick={handleActiveInput}
      style={
        id === active
          ? { border: "2px solid blue", padding: "20px", borderRadius: "5px" }
          : null
      }
    >
      <FormGroup {...register(name, required)}>
        <FormLabel id={"radio-buttons-group"}>{label}</FormLabel>

        <RadioGroup name="radio-buttons-group">
          {options.map((value) => (
            <FormControlLabel
              control={<Radio />}
              label={value}
              value={value}
              key={value}
              onChange={handleChangeRadio}
              {...rest}
            />
          ))}
        </RadioGroup>
      </FormGroup>
    </Box>
  );
}

export const NewDateSpicker = ({
  register,
  setValue,
  name,
  id,
  label,
  active,
  setActive,
  required,
  ...rest
}) => {
  const [date, setDate] = React.useState(null);
  const handleDate = (value) => {
    setDate(new Date(value).toLocaleDateString());
    setValue(name, new Date(value).toLocaleDateString());
  };
  const handleActiveInput = () => {
    if (!setActive) {
      return;
    }
    setActive(id);
  };
  return (
    <Box
      mt={2}
      mb={2}
      onClick={handleActiveInput}
      style={
        id === active
          ? { border: "2px solid blue", padding: "20px", borderRadius: "5px" }
          : null
      }
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          {...register(name, required)}
          {...rest}
          label={label}
          value={date}
          onChange={handleDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
};
