import { Link } from "react-router-dom";
import { Image, Segment, List, Item, Label } from "semantic-ui-react";
import { ITraining } from "../../../models/training";

interface Props {
  training: ITraining;
}

const TrainingDetailedSidebar = ({ training: { attendees, host } }: Props) => {
  if (!attendees) return null;
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length} {attendees.length === 1 ? "Person" : "People"} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map((attendee) => (
            <Item style={{ position: "relative" }} key={attendee.userName}>
              {attendee.userName === host?.userName && (
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >
                  Host
                </Label>
              )}
              <Image size="tiny" src={attendee.image || "/assets/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`/profiles/${attendee.userName}`}>
                    {attendee.displayName}
                  </Link>
                </Item.Header>
                {attendee.following && (
                  <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
                )}
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  );
};

export default TrainingDetailedSidebar;