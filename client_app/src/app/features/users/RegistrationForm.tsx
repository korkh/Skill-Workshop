import { Formik, ErrorMessage, Form } from "formik";
import { useStore } from "../../stores/store";
import ValidationErrors from "../errors/ValidationErrors";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { FormHeader, FormWrapper, FormButton } from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import TextInput from "../../components/common/form/TextInput";

const RegistrationForm = observer(() => {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        userName: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) => {
        userStore
          .register(values)
          .catch((error) => setErrors({ error: error }));
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required("Required"),
        userName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Required"),
      })}
    >
      {({ handleSubmit, isSubmitting, isValid, dirty, errors }) => (
        <FormWrapper>
          <FormHeader>Signup for Skill Workshop</FormHeader>
          <Form onSubmit={handleSubmit} autoComplete="off">
            <TextInput
              placeholder="Display Name"
              name="displayName"
              style={{ width: "100%" }}
            />
            <TextInput
              placeholder="Username"
              name="userName"
              style={{ width: "100%" }}
            />
            <TextInput
              placeholder="Email"
              name="email"
              style={{ width: "100%" }}
            />
            <TextInput
              placeholder="Password"
              name="password"
              type="password"
              style={{ width: "100%" }}
            />
            <ErrorMessage
              name="error"
              render={() => (
                <div style={{ color: "red" }}>
                  <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                  <ValidationErrors errors={[errors.error!]} />
                </div>
              )}
            />
            <FormButton
              disabled={isSubmitting || !dirty || !isValid}
              type="submit"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </FormButton>
          </Form>
        </FormWrapper>
      )}
    </Formik>
  );
});

export default RegistrationForm;
