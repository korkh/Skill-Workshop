import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { format } from "date-fns";
import { ITraining } from "../../../models/training";
import TrainingListItemAttendee from "./TrainingListItemAttendee";

interface Props {
  training: ITraining;
}

export default function TrainingListItem({ training }: Props) {
  return (
    <Segment.Group>
      <Segment>
        {training.isCancelled && (
          <Label
            attached="top"
            color="red"
            content="Cancelled"
            style={{ textAlign: "center" }}
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 5 }}
              size="tiny"
              circular
              src={training.host?.image || "/assets/user.png"}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/trainings/${training.id}`}>
                {training.title}
              </Item.Header>
              <Item.Description>
                Hosted by{" "}
                <Link to={`/profiles/${training.hostUsername}`}>
                  {" "}
                  {training.host?.displayName}
                </Link>
              </Item.Description>
              {training.isHost && (
                <Item.Description>
                  <Label basic color="orange">
                    You are hosting this training
                  </Label>
                </Item.Description>
              )}

              {training.isGoing && !training.isHost && (
                <Item.Description>
                  <Label basic color="green">
                    You are going to this training
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(training.date!, "dd MMM yyyy h:mm aa")}
          <Icon name="marker" /> {training.venue}
        </span>
      </Segment>
      <Segment secondary>
        <TrainingListItemAttendee attendees={training.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{training.description}</span>
        <Button
          as={Link}
          to={`/trainings/${training.id}`}
          color="teal"
          floated="right"
          content="view"
        />
      </Segment>
    </Segment.Group>
  );
}
