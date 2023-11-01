import styled from "styled-components";

const ErrorMessage = styled.div`
  color: #ff0000;
  margin: 5px 0;
`;

interface Props {
  errors: string[];
}

const ValidationErrors = ({ errors }: Props) => {
  console.log(errors);
  return (
    <>
      {errors && errors.length > 0 && (
        <div>
          {errors.map((err: string, index: number) => (
            <ErrorMessage key={index}>{err}</ErrorMessage>
          ))}
        </div>
      )}
    </>
  );
};

export default ValidationErrors;
