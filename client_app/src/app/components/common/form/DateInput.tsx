import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import ErrorLabel from "./ErrorLabel";
import styled from "styled-components";

const DatePickerWrapper = styled(DatePicker)`
  min-width: 50%;
  padding: 5px 0 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const DateInput = (props: Partial<ReactDatePickerProps>) => {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <DatePickerWrapper
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(value) => helpers.setValue(value)}
    >
      {meta.touched && meta.error ? (
        <ErrorLabel styles={{ marginTop: 5 }}>{meta.error}</ErrorLabel>
      ) : null}
    </DatePickerWrapper>
  );
};

export default DateInput;

//Partial makes every single property optional including onChange
//Please note that DatePicker uses Date object but not a string during a date selection (new Date)
