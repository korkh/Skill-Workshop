import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import {
  Container,
  DropdownButton,
  DropdownContainer,
  DropdownItem,
  DropdownMenu,
  Logo,
  LogoImage,
  NavItem,
  NavLink,
  NavList,
  UserImage,
  UserMenu,
  UserName,
  Wrapper,
} from ".";
import { useState } from "react";

const NavBar = observer(() => {
  const {
    userStore: { user, logout, isLoggedIn },
  } = useStore();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Wrapper>
      <Container>
        <Logo to="/">
          <LogoImage src="../../src/app/assets/login/logo.png" alt="logo" />
          Skill Workshop
        </Logo>
        {isLoggedIn && (
          <NavList>
            <NavItem>
              <NavLink to="/trainings">Trainings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/createTraining">Create Training</NavLink>
            </NavItem>
            <UserMenu>
              <UserImage src={user?.image || "/user.png"} alt="User" />

              <DropdownContainer>
                <DropdownButton
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                  <UserName>{user?.displayName} ⮟</UserName>
                </DropdownButton>
                <DropdownMenu $isOpen={isDropdownOpen}>
                  <DropdownItem>
                    <NavLink to={`/profiles/${user?.userName}`}>
                      My Profile
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem onClick={logout}>Logout</DropdownItem>
                </DropdownMenu>
              </DropdownContainer>
            </UserMenu>
          </NavList>
        )}
      </Container>
    </Wrapper>
  );
});

export default NavBar;
