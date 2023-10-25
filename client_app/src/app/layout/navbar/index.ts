import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #333;
  color: #fff;
  padding: 0;
  margin: 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: white;
  &:hover {
    color: orange;
  }
`;

const LogoImage = styled.img`
  max-height: 30px;
  margin-right: 10px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;

  &:hover {
    text-decoration: underline;
    color: orange;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  max-height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid grey;
`;

const UserName = styled.div`
  font-weight: 700;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
  padding: 0;
`;

const DropdownMenu = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  width: 100px;
  top: 200%;
  text-align: center;
  right: 0;
  background: #333;
  border: 1px solid #555;
  list-style: none;
  padding: 0;
  margin: 0;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 10px solid #555;
    border-right: 10px solid #333;
    border-top: 10px solid transparent;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const DropdownItem = styled.div`
  padding: 10px;
  text-decoration: none;
  color: orange;
  cursor: pointer;
`;

export {
  Wrapper,
  Container,
  Logo,
  LogoImage,
  NavList,
  NavItem,
  NavLink,
  UserMenu,
  UserImage,
  UserName,
  DropdownContainer,
  DropdownMenu,
  DropdownItem,
  DropdownButton,
};
