import { useField } from "formik";
import ErrorLabel from "./ErrorLabel";

interface Props {
  placeholder: string;
  name: string;
  rows: number;
  label?: string;
}

const TextArea = (props: Props) => {
  const [field, meta] = useField(props.name);

  return (
    <>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <textarea
        id={props.name}
        name={props.name}
        rows={props.rows}
        placeholder={props.placeholder}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
      ></textarea>
      {meta.touched && meta.error ? (
        <ErrorLabel styles={{marginTop: 5}} >{meta.error}</ErrorLabel>
      ) : null}
    </>
  );
};

export default TextArea;

// meta.touched is checking that filed was touched
// !!meta.error checks if error object exists (!!makes object to boolean) because error can be a string (exists) or undefined
//so we simply checking
