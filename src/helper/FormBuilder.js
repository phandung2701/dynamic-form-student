import {
  NewDateSpicker,
  NewRadio,
  NewCheckBox,
  NewSelect,
  NewInput,
} from "../common/CustomInput/index";

// export const convertInputToData = (data, setActive, active) => {
//   switch (data.component) {
//     case "NewInput": {
//       return (
//         <NewInput
//           name={data.name}
//           setActive={setActive}
//           active={active}
//           {...data}
//         />
//       );
//     }
//     case "NewCheckBox": {
//       return (
//         <NewCheckBox
//           name={data.name}
//           options={data.options}
//           setActive={setActive}
//           active={active}
//           {...data}
//         />
//       );
//     }
//     case "NewRadio": {
//       return (
//         <NewRadio
//           name={data.name}
//           options={data.options}
//           setActive={setActive}
//           active={active}
//           {...data}
//         />
//       );
//     }
//     case "NewSelect": {
//       return (
//         <NewSelect
//           name={data.name}
//           options={data.options}
//           setActive={setActive}
//           active={active}
//           {...data}
//         />
//       );
//     }
//     case "NewDateSpicker": {
//       return (
//         <NewDateSpicker
//           name={data.name}
//           setActive={setActive}
//           active={active}
//           {...data}
//         />
//       );
//     }

//     default:
//       return "";
//   }
// };

export const convertInputToData = {
  NewInput: (data, value, setActive, active) => (
    <NewInput
      name={data.name}
      setActive={setActive}
      active={active}
      value={value}
      {...data}
    />
  ),
  NewCheckBox: (data, value, setActive, active) => (
    <NewCheckBox
      name={data.name}
      options={data.options}
      setActive={setActive}
      active={active}
      value={value}
      {...data}
    />
  ),
  NewRadio: (data, value, setActive, active) => (
    <NewRadio
      name={data.name}
      options={data.options}
      setActive={setActive}
      active={active}
      value={value}
      {...data}
    />
  ),
  NewSelect: (data, value, setActive, active) => (
    <NewSelect
      name={data.name}
      options={data.options}
      setActive={setActive}
      active={active}
      value={value}
      {...data}
    />
  ),
  NewDateSpicker: (data, value, setActive, active) => (
    <NewDateSpicker
      name={data.name}
      setActive={setActive}
      active={active}
      value={value}
      {...data}
    />
  ),
};
