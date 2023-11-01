import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ErrorHeader = styled.h1`
  font-size: 24px;
  color: red;
  margin-bottom: 10px;
`;

const SubHeader = styled.h5`
  color: red;
`;

const StackTraceSegment = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 5px;
`;

const Code = styled.code`
  color: teal;
  font-family: monospace;
`;

export { ErrorContainer, ErrorHeader, SubHeader, StackTraceSegment, Code };
