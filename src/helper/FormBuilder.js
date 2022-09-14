import {
  NewDateSpicker,
  NewRadio,
  NewCheckBox,
  NewSelect,
  NewInput,
} from "../common/CustomInput/index";

export const convertInputToData = (data, setActive, active) => {
  switch (data.component) {
    case "NewInput": {
      return (
        <NewInput
          name={data.name}
          setActive={setActive}
          active={active}
          {...data}
        />
      );
    }
    case "NewCheckBox": {
      return (
        <NewCheckBox
          name={data.name}
          options={data.options}
          setActive={setActive}
          active={active}
          {...data}
        />
      );
    }
    case "NewRadio": {
      return (
        <NewRadio
          name={data.name}
          options={data.options}
          setActive={setActive}
          active={active}
          {...data}
        />
      );
    }
    case "NewSelect": {
      return (
        <NewSelect
          name={data.name}
          options={data.options}
          setActive={setActive}
          active={active}
          {...data}
        />
      );
    }
    case "NewDateSpicker": {
      return (
        <NewDateSpicker
          name={data.name}
          setActive={setActive}
          active={active}
          {...data}
        />
      );
    }

    default:
      return "";
  }
};
