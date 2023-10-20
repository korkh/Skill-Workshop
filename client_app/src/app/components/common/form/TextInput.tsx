import { useField } from "formik";
import ErrorLabel from "./ErrorLabel";
import { CSSProperties } from "react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  type?: string;
  style?: CSSProperties;
}

const inputStyle = {
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "5px",
  outline: "none",
  margin: "10px 0",
};

// Style for the focused (onBlur) state
const focusStyle = {
  borderColor: "teal",
};

const TextInput = (props: Props) => {
  const [field, meta] = useField(props.name);

  return (
    <>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input
        id={props.name}
        name={props.name}
        type={props.type || "text"}
        placeholder={props.placeholder}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        style={{ ...inputStyle, ...(meta.touched ? focusStyle : {}), ...props.style }}
      />
      {meta.touched && meta.error ? (
        <ErrorLabel>{meta.error}</ErrorLabel>
      ) : null}
    </>
  );
};

export default TextInput;

// meta.touched is checking that filed was touched
// !!meta.error checks if error object exists (!!makes object to boolean) because error can be a string (exists) or undefined
//so we simply checking
