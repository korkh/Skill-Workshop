import { StyledButton, StyledHeader, StyledIcon, StyledSegment } from ".";

const NotFoundPage = () => {
  return (
    <StyledSegment>
      <StyledHeader>
        <StyledIcon className="search icon" />
        Oops - we've looked everywhere but could not find what you are looking
        for!
      </StyledHeader>
      <StyledButton to="/trainings">Return to main page</StyledButton>
    </StyledSegment>
  );
};

export default NotFoundPage;
