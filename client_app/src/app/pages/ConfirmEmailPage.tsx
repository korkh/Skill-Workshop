import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import useQuery from "../hooks/hooks";
import { useStore } from "../stores/store";
import LoginForm from "../features/users/LoginForm";
import { Header, IconLabel, StyledSegment, SubmitButton } from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ConfirmEmailPage = () => {
  const { modalStore } = useStore();
  const email = useQuery().get("email") as string;
  const token = useQuery().get("token") as string;

  const Status = {
    Verifying: "Verifying",
    Failed: "Failed",
    Success: "Success",
  };

  const [status, setStatus] = useState(Status.Verifying);

  function handleConfirmEmailResend() {
    agent.Account.resendEmailConfirm(email)
      .then(() => {
        toast.success("Verification email resend - please check your email");
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    agent.Account.verifyEmail(token, email)
      .then(() => {
        setStatus(Status.Success);
      })
      .catch(() => {
        setStatus(Status.Failed);
      });
  }, [Status.Failed, Status.Success, email, token]);

  function getBody() {
    switch (status) {
      case Status.Verifying:
        return <p>Verifying...</p>;
      case Status.Failed:
        return (
          <div>
            <p>Verification failed. Try to resend verification email!</p>
            <SubmitButton $primary onClick={handleConfirmEmailResend}>
              Resend email
            </SubmitButton>
          </div>
        );
      case Status.Success:
        return (
          <div>
            <p>Email has been verified - you can login now</p>
            <SubmitButton
              $primary
              onClick={() => modalStore.openModal(<LoginForm />)}
            >
              Login
            </SubmitButton>
          </div>
        );
    }
  }

  return (
    <StyledSegment>
      <Header>
        <FontAwesomeIcon
          icon={faEnvelope}
          beatFade
          size="2xl"
          color={Status.Success ? "green" : "grey"}
        />
        <IconLabel>Email verification</IconLabel>
        {getBody()}
      </Header>
    </StyledSegment>
  );
};

export default ConfirmEmailPage;
