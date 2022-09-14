export const required = (text, name) => {
  if (text === "") {
    return `${name} is required`;
  }
  return;
};
