import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Header,
  Icon,
  Segment,
  SegmentInline,
} from "semantic-ui-react";
import agent from "../../api/agent";
import useQuery from "../hooks/hooks";
import { useStore } from "../stores/store";
import LoginForm from "../features/users/LoginForm";

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
            <Button
              primary
              onClick={handleConfirmEmailResend}
              size="huge"
              content="Resend email"
            />
          </div>
        );
      case Status.Success:
        return (
          <div>
            <p>Email has been verified - you can login now</p>
            <Button
              primary
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              content="Login"
            />
          </div>
        );
    }
  }

  return (
    <Segment placeholder textAlign="center">
      <Header icon>
        <Icon
          name="envelope"
          content="Email verification"
          color={Status.Success ? "green" : "grey"}
        />
        <SegmentInline>{getBody()}</SegmentInline>
      </Header>
    </Segment>
  );
};

export default ConfirmEmailPage;
