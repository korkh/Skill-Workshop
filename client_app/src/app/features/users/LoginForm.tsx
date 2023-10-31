import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { FormErrorLabel, FormWrapper, FormHeader, FormButton } from ".";
import LoginInput from "../../components/common/form/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const LoginForm = observer(() => {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch(() => setErrors({ error: "Invalid email or password" }))
      }
    >
      {({ handleSubmit, isSubmitting, errors, dirty, isValid }) => (
        <FormWrapper>
          <FormHeader>Login to Skill Workshop</FormHeader>
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
                <div
                  style={{
                    marginBottom: "10px",
                    textAlign: "left",
                  }}
                >
                  <FormErrorLabel>
                    <FontAwesomeIcon icon={faTriangleExclamation} color="red" />{" "}
                    {errors.error}
                  </FormErrorLabel>
                </div>
              )}
            />
            <br />
            <FormButton
              disabled={isSubmitting || !dirty || !isValid}
              type="submit"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </FormButton>
          </Form>
        </FormWrapper>
      )}
    </Formik>
  );
});

export default LoginForm;
