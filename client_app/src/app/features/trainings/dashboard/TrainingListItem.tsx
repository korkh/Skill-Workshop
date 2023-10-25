import { format } from "date-fns";
import { ITraining } from "../../../models/training";
import TrainingListItemAttendee from "./TrainingListItemAttendee";
import {
  ButtonContainer,
  ButtonLink,
  ItemContent,
  ItemDescription,
  Label,
  PlaceholderContainer,
  Segment,
  SegmentGroup,
} from ".";
import { CancelledLabel } from "../details";
import { Icon } from "semantic-ui-react";
import TrainingDetailedImage from "../details/TrainingDetailedImage";
import { observer } from "mobx-react-lite";

interface Props {
  training: ITraining;
}

const TrainingListItem = observer(({ training }: Props) => {
  return (
    <>
      <TrainingDetailedImage training={training} titleAsLink image>
        {training.isCancelled && <CancelledLabel>Cancelled</CancelledLabel>}
        <PlaceholderContainer>
          <SegmentGroup>
            <Segment>
              <ItemContent>
                <span>
                  <Icon name="clock" />{" "}
                  {format(training.date!, "dd MMM yyyy h:mm aa")}
                </span>
                <span>
                  <Icon name="marker" /> {training.venue}
                </span>
                <span style={{margin: "20px 0"}}>{training.description}</span>
                {training.isHost && (
                  <ItemDescription>
                    <Label $bgcolor="orange">
                      You are hosting this training
                    </Label>
                  </ItemDescription>
                )}
                {training.isGoing && !training.isHost && (
                  <ItemDescription>
                    <Label $bgcolor="green">
                      You are going to this training
                    </Label>
                  </ItemDescription>
                )}
              </ItemContent>
            </Segment>
            <Segment>
              <TrainingListItemAttendee attendees={training.attendees!} />
            </Segment>
            <Segment $reduced>
              <ButtonContainer>
                <ButtonLink to={`/trainings/${training.id}`}>View</ButtonLink>
              </ButtonContainer>
            </Segment>
          </SegmentGroup>
        </PlaceholderContainer>
      </TrainingDetailedImage>
    </>
  );
});

export default TrainingListItem;
