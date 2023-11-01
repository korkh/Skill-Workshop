import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Code, ErrorContainer, ErrorHeader, StackTraceSegment, SubHeader } from ".";

const ServerError = observer(() => {
  const { commonStore } = useStore();

  return (
    <ErrorContainer>
      <ErrorHeader>Server Error</ErrorHeader>
      <SubHeader>{commonStore.error?.message}</SubHeader>
      {commonStore.error?.details && (
        <StackTraceSegment>
          <h4>Stack trace</h4>
          <Code>{commonStore.error.details}</Code>
        </StackTraceSegment>
      )}
    </ErrorContainer>
  );
});

export default ServerError;
