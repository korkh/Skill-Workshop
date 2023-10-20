import styled from "styled-components";

const LoginFormWrapper = styled.div`
  max-width: 500px;
  min-width: 400px;
  min-height: 350px;
  border-radius: 4px;

  justify-items: center;
  line-height: 1.35em;
  /* Frosted Glass Effect */
  background-color: rgba(0, 0, 0, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(15px);
  backdrop-filter: brightness(1.2);
  position: relative;
`;

const LoginHeader = styled.h2`
  font-size: 24px;
  color: teal;
  margin-bottom: 20px;
  text-align: center;
`;

const LoginButton = styled.button`
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

const LoginErrorLabel = styled.label`
  margin-bottom: 10px;
  font-size: large;
  color: red;
`;

export { LoginFormWrapper, LoginHeader, LoginButton, LoginErrorLabel };
