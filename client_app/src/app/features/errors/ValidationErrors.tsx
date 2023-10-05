import { Message } from "semantic-ui-react";

interface Props {
  errors: string[];
}

const ValidationErrors = ({ errors }: Props) => {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err: string | undefined, index: number) => (
            <Message.Item key={index}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
};

export default ValidationErrors;
