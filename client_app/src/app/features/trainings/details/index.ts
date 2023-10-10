import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface ButtonProps {
  isCancelled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const TrainingImage = styled.img`
  width: 100%;
  filter: brightness(30%);
`;

const CancelledLabel = styled.div`
  position: absolute;
  z-index: 1000;
  left: -14px;
  top: 20px;
  background-color: red;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
`;

const TrainingImageContainer = styled.div`
  position: relative;
`;

const TrainingImageText = styled.div`
  position: absolute;
  bottom: 5%;
  left: 5%;
  width: 100%;
  height: auto;
  color: white;
`;

const Title = styled.h1`
  color: white;
`;

const Button = styled.button<ButtonProps>`
  && {
    background-color: ${(props) => (props.isCancelled ? "green" : "red")};
  }
  color: white;
  padding: 8px 16px;
  border: none;
  position: relative;
  cursor: pointer;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LinkButton = styled(Link)`
  background-color: orange;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border: none;
  border-radius: 6px;
  left: 0;
  cursor: pointer;
`;

const ButtonMainStyles: CSSProperties = {
  color: "white",
  padding: "8px 16px",
  border: "none",
  position: "relative",
  borderRadius: "6px",
  cursor: "pointer",
};

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  background-color: #fff;
`;

const InfoSegment = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const IconContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyIcon = styled.i`
  font-size: 24px;
  color: teal;
`;

const InfoDescription = styled.div`
  flex: 6;
  padding-left: 10px;
`;

export {
  TrainingImage,
  CancelledLabel,
  TrainingImageContainer,
  TrainingImageText,
  Title,
  Button,
  LoaderWrapper,
  LinkButton,
  ButtonMainStyles,
  InfoContainer,
  InfoSegment,
  IconContainer,
  MyIcon,
  InfoDescription,
};
