import styled from "styled-components";

const FormWrapper = styled.div`
  max-width: 500px;
  min-width: 400px;
  min-height: 350px;
  border-radius: 4px;

  justify-items: center;
  line-height: 1.35em;
  /* Frosted Glass Effect */
  background-color: rgba(241, 248, 250);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(15px);
  backdrop-filter: brightness(1.2);
  position: relative;
`;

const FormHeader = styled.h2`
  font-size: 24px;
  color: teal;
  margin-bottom: 20px;
  text-align: center;
`;

const FormButton = styled.button`
  background: teal;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 30px;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Header = styled.div`
  font-size: 24px;
  color: #333;
  margin-bottom: 50px;
  & h1 {
    color: green;
  }
`;

const IconLabel = styled.h1<{ $success?: boolean }>`
  color: ${($success) => ($success ? "green" : "grey")};
`;

const SubmitButton = styled.button<{ $primary: boolean }>`
  background-color: ${($primary) => ($primary ? "teal" : "grey")};
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
`;

const FormErrorLabel = styled.label`
  margin-bottom: 10px;
  font-size: large;
  color: red;
`;

const StyledSegment = styled.div`
  border-radius: 5px;
  text-align: center;
  padding: 50px;
  margin: 20px;
  max-width: 80%;
  margin: 0 auto;
`;

export {
  FormWrapper,
  FormHeader,
  FormButton,
  FormErrorLabel,
  Header,
  IconLabel,
  SubmitButton,
  StyledSegment,
};
