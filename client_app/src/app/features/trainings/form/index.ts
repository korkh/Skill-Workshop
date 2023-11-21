import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormHeader = styled.label`
  margin: 10px 0;
  font-weight: bold;
  color: teal;
  text-transform: capitalize;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const CancelButton = styled(Link)`
  padding: 10px 20px;
  background-color: lightgray;
  text-decoration: none;
  color: black;
  border-radius: 8px;
  cursor: pointer;
`;

export {
  Wrapper,
  FormContainer,
  FormHeader,
  ButtonContainer,
  SubmitButton,
  CancelButton,
};
