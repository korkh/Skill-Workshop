import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Header,
  Image,
  Segment,
} from "semantic-ui-react";
import { useStore } from "../stores/store";
// import FacebookLogin from "@greatsumini/react-facebook-login";
// import { useState } from "react";

const HomePage = () => {
  const { userStore, modalStore } = useStore();
  // const [msg, setMsg] = useState<string | null>(null);

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          ActiviGo
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Welcome to ActiviGo" />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to Activities!
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size="huge"
              inverted
            >
              Register
            </Button>
            <Divider horizontal inverted>
              Or
            </Divider>
            {/* <Button
              as={FacebookLogin}
              appId="3672678906279655"
              size="huge"
              inverted
              color="facebook"
              content="Login with Facebook"
              loading={userStore.fbLoading}
              onSuccess={(response: unknown) => {
                // userStore.facebookLogin(response.accessToken);
                console.log("Login success", response);
              }}
              onFail={(response: unknown) => {
                setMsg(
                  "Ooops... Access denied by Facebook.. Developers are informed!"
                );
                console.log("Login failed", response);
                console.log(msg);
              }}
            /> */}
          </>
        )}
      </Container>
    </Segment>
  );
};

export default observer(HomePage);
