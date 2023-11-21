import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import {
  CloseButton,
  Container,
  DropdownButton,
  DropdownContainer,
  DropdownItem,
  DropdownMenu,
  Hamburger,
  HamburgerMenu,
  Logo,
  LogoImage,
  NavItem,
  NavLink,
  NavList,
  NavbarLinks,
  UserImage,
  UserMenu,
  UserName,
  Wrapper,
} from ".";
import { LOGO } from "../../assets/login/index";
import { useEffect, useRef, useState } from "react";

const NavBar = observer(() => {
  const {
    userStore: { user, logout, isLoggedIn },
  } = useStore();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const hamburgerMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => {
    setDropdownOpen(false);
    setHamburgerOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
      setHamburgerOpen(false);
    }
    if (
      userMenuRef.current &&
      !userMenuRef.current.contains(event.target as Node)
    ) {
      setUserMenuOpen(false);
    }
    if (
      hamburgerMenuRef.current &&
      !hamburgerMenuRef.current.contains(event.target as Node)
    ) {
      setHamburgerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Wrapper>
      <Container>
        <Logo to="/">
          <LogoImage src={LOGO} alt="logo" />
          Skill Workshop
        </Logo>
        {isLoggedIn && (
          <>
            <Hamburger onClick={() => setHamburgerOpen(!isHamburgerOpen)}>
              &#9776;
            </Hamburger>
            <HamburgerMenu $isOpen={isHamburgerOpen} ref={hamburgerMenuRef}>
              <CloseButton onClick={() => setHamburgerOpen(false)}>
                X
              </CloseButton>
              <NavList>
                <NavItem>
                  <NavLink to="/trainings" onClick={closeDropdown}>
                    Trainings
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/createTraining" onClick={closeDropdown}>
                    Create Training
                  </NavLink>
                </NavItem>
                <NavItem>
                  <DropdownContainer ref={userMenuRef}>
                    <UserMenu>
                      <UserImage src={user?.image || "/user.png"} alt="User" />
                      <DropdownButton
                        onClick={() => setUserMenuOpen(!isUserMenuOpen)}
                      >
                        <UserName>{user?.displayName} ⮟</UserName>
                      </DropdownButton>
                      <DropdownMenu $isOpen={isUserMenuOpen}>
                        <DropdownItem>
                          <NavLink
                            to={`/profiles/${user?.userName}`}
                            onClick={closeDropdown}
                          >
                            My Profile
                          </NavLink>
                        </DropdownItem>
                        <DropdownItem onClick={logout}>Logout</DropdownItem>
                      </DropdownMenu>
                    </UserMenu>
                  </DropdownContainer>
                </NavItem>
              </NavList>
            </HamburgerMenu>
            <NavbarLinks>
              <NavList>
                <NavItem>
                  <NavLink to="/trainings">Trainings</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/createTraining">Create Training</NavLink>
                </NavItem>
                <NavItem>
                  <DropdownContainer>
                    <UserMenu>
                      <UserImage src={user?.image || "/user.png"} alt="User" />
                      <DropdownButton
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                      >
                        <UserName>{user?.displayName} ⮟</UserName>
                      </DropdownButton>
                      <DropdownMenu $isOpen={isDropdownOpen}>
                        <DropdownItem>
                          <NavLink
                            to={`/profiles/${user?.userName}`}
                            onClick={closeDropdown}
                          >
                            My Profile
                          </NavLink>
                        </DropdownItem>
                        <DropdownItem onClick={logout}>Logout</DropdownItem>
                      </DropdownMenu>
                    </UserMenu>
                  </DropdownContainer>
                </NavItem>
              </NavList>
            </NavbarLinks>
          </>
        )}
      </Container>
    </Wrapper>
  );
});

export default NavBar;
