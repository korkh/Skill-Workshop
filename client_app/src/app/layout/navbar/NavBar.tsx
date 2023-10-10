import { Link, NavLink } from "react-router-dom";
import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

const NavBar = () => {
  const {
    userStore: { user, logout, isLoggedIn },
  } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <img
            src="../../src/app/assets/login/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Skill Workshop
        </Menu.Item>
        {isLoggedIn && (
          <>
            <Menu.Item as={NavLink} to="/trainings" name="Trainings" />
            <Menu.Item as={NavLink} to="/errors" name="Errors" />
            <Menu.Item>
              <Button
                as={NavLink}
                to="/createTraining"
                positive
                content="Create Training"
              />
            </Menu.Item>
            <Menu.Item position="right">
              <Image
                src={user?.image || "assets/user.png"}
                avatar
                spaced="right"
              />
              <Dropdown pointing="top left" text={user?.displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/profiles/${user?.userName}`}
                    text="My Profile"
                    icon="user"
                  />
                  <Dropdown.Item onClick={logout} text="Logout" icon="power" />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar); //we need to know if user was updated in store
