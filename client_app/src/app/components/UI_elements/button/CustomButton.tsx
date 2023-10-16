import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface ButtonProps {
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  to?: string;
  content?: string;
  children?: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) => props.color || "green"};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  outline: none;
  min-width: 10vw;
  min-height: 5vh;
  transition: background-color 0.3s;

  &:hover {
    background-color: light;
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const CustomButton: React.FC<ButtonProps> = ({
  color,
  onClick,
  disabled,
  loading,
  to,
  children,
  content,
}) => {
  if (to) {
    return (
      <Link to={to}>
        <StyledButton color={color} disabled={disabled || loading}>
          {loading && disabled ? content : loading ? children : content}
        </StyledButton>
      </Link>
    );
  } else {
    return (
      <StyledButton
        color={color}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {loading && disabled ? content : loading ? children : content}
      </StyledButton>
    );
  }
};

export default observer(CustomButton);
