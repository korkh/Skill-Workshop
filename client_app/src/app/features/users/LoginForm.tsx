import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { LoginButton, LoginErrorLabel, LoginFormWrapper, LoginHeader } from ".";
import LoginInput from "../../components/common/form/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch((error) => setErrors({ error: error.response.data }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <LoginFormWrapper>
          <LoginHeader>Login to Skill Workshop</LoginHeader>
          <Form onSubmit={handleSubmit} autoComplete="off">
            <LoginInput
              placeholder="Email"
              name="email"
              style={{ width: "100%" }}
            />
            <br />
            <LoginInput
              placeholder="Password"
              name="password"
              type="password"
              style={{ width: "100%" }}
            />
            <br />
            <ErrorMessage
              name="error"
              render={() => (
                <div style={{ marginBottom: "10px", textAlign: "left" }}>
                  <LoginErrorLabel>
                    <FontAwesomeIcon icon={faTriangleExclamation} color="red" />{" "}
                    {errors.error}
                  </LoginErrorLabel>
                </div>
              )}
            />
            <br />
            <LoginButton disabled={isSubmitting} type="submit">
              {isSubmitting ? "Logging in..." : "Login"}
            </LoginButton>
          </Form>
        </LoginFormWrapper>
      )}
    </Formik>
  );
}

export default observer(LoginForm);
