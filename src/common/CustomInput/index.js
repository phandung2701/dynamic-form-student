import React, { useEffect, useState } from "react";
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
  value,
  setActive,
  required,
  ...rest
}) {
  const [errorInput, setErrorInput] = useState(false);
  const [valueInput, setValueInput] = useState("");
  useEffect(() => {
    if (!!value) {
      setValueInput(value[name]);
      setValue(name, value[name]);
    }
  }, []);

  const handleValueInput = (e) => {
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
    setValueInput(e.target.value);
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
        value={valueInput}
        {...register(name)}
        {...rest}
        onChange={handleValueInput}
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
  value,
  setValue,
  label,
  setActive,
  required,
  ...rest
}) {
  const [valueSelect, setValueSelect] = useState("");
  const handleActiveInput = () => {
    if (!setActive) {
      return;
    }
    setActive(id);
  };
  useEffect(() => {
    const wrap = () => {
      if (!!value) {
        setValueSelect(value[name]);
        setValue(name, value[name]);
      }
    };
    wrap();
  }, [value]);
  const handleValueSelect = (e) => {
    setValueSelect(e.target.value);
    setValue(name, e.target.value);
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
        <Select
          {...register(name, required)}
          {...rest}
          label={label}
          value={valueSelect}
          onChange={handleValueSelect}
        >
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
    console.log(event.target.value, option);
    if (valueChecked.includes(option)) {
      const data = valueChecked.filter((item) => item !== option);
      setValue(name, data);
      setValueChecked(data);
    } else {
      const data = [...valueChecked, option];
      setValue(name, data);
      setValueChecked(data);
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
  value,
  label,
  required,
  ...rest
}) {
  const handleChangeRadio = (e) => {
    setValue(name, e.target.value);
    setValueRadio(e.target.value);
  };
  const [valueRadio, setValueRadio] = useState("");
  useEffect(() => {
    if (!!value) {
      setValueRadio(value[name]);
      setValue(name, value[name]);
    }
  }, []);
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
      <FormGroup {...register(name)}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup value={valueRadio} onChange={handleChangeRadio}>
          {options.map((option) => (
            <FormControlLabel
              control={<Radio />}
              label={option}
              value={option}
              key={option}
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
  value,
  active,
  setActive,
  required,
  ...rest
}) => {
  const [date, setDate] = React.useState(null);
  useEffect(() => {
    if (!!value) {
      setValue(name, new Date(value[name]).toLocaleDateString());
      setDate(new Date(value[name]).toLocaleDateString());
    }
  }, []);

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
          {...register(name)}
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
