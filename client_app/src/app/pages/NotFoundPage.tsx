import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

const NotFoundPage = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - we've looked everywhere but could not find what you are looking
        for!
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/trainings">
          Return to main page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFoundPage;
