import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import ErrorLabel from "./ErrorLabel";

const DateInput = (props: Partial<ReactDatePickerProps>) => {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => helpers.setValue(value)}
      />
      {meta.touched && meta.error ? (
        <ErrorLabel styles={{marginTop: 5}} >{meta.error}</ErrorLabel>
      ) : null}
    </>
  );
};

export default DateInput;

//Partial makes every single property optional including onChange
//Please note that DatePicker uses Date object but not a string during a date selection (new Date)
