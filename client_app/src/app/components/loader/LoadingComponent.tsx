import styled, { keyframes } from "styled-components";

const rotation = keyframes`
  0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
`;

const LoaderWrapperMobile = styled.div`
  position: absolute;
  bottom: 0;
  left: 50vw;
  transform: translate(-50%, -50%);
`;

interface LoaderProps {
  $zoom?: number;
  $bottom?: boolean;
}

const LoaderComponent = styled.div<LoaderProps>`
  width: ${(props) =>
    props.$zoom ? `calc(var(--index) * ${props.$zoom})` : "calc(var(--index))"};
  height: ${(props) =>
    props.$zoom ? `calc(var(--index) * ${props.$zoom})` : "calc(var(--index))"};
  border: 4px solid #ccc;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

const Loader = (props: LoaderProps) =>
  props.$bottom ? (
    <LoaderWrapperMobile>
      <LoaderComponent {...props} />
    </LoaderWrapperMobile>
  ) : (
    <LoaderWrapper>
      <LoaderComponent {...props} />
    </LoaderWrapper>
  );

export default Loader;
