import { toast } from "react-toastify";
import agent from "../../../api/agent";
import useQuery from "../../hooks/hooks";
import { observer } from "mobx-react-lite";
import { Header, IconLabel, StyledSegment, SubmitButton } from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const RegistrationSuccess = observer(() => {
  const email = useQuery().get("email") as string;

  function handleConfirmEmailResend() {
    agent.Account.resendEmailConfirm(email)
      .then(() => {
        toast.success("Verification email resend - please check your email");
      })
      .catch((error) => console.log(error));
  }

  return (
    <StyledSegment>
      <Header>
        <FontAwesomeIcon icon={faCheck} size="2xl" color="green" />
        <IconLabel>Successfully registered!</IconLabel>
      </Header>
      <p>
        Please check your email (including junk email) for the verification
        email
      </p>
      {email && (
        <>
          <p>Didn't receive the email? Click the below button to resend</p>
          <SubmitButton $primary onClick={handleConfirmEmailResend}>
            Resend email
          </SubmitButton>
        </>
      )}
    </StyledSegment>
  );
});

export default RegistrationSuccess;
