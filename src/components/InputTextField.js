import { TextField } from "@mui/material";

const InputTextField = ({ label, type = "text", name, value, onChange, required }) => {
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <>
      <TextField
        label={label}
        id="outlined-size-small"
        defaultValue="Small"
        size="small"
        name={name}
        value={value}
        onChange={handleChange}
        type={type}
        style={{
          margin: "0 0.5em 0.5em 0 ",
        }}
        required={required}
      />
    </>
  );
};

export default InputTextField;
