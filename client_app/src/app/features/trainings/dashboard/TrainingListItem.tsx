import { format } from "date-fns";
import { ITraining } from "../../../models/training";
import TrainingListItemAttendee from "./TrainingListItemAttendee";
import {
  ButtonContainer,
  ButtonLink,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemImage,
  ItemUserName,
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

const TrainingListItem = ({ training }: Props) => {
  return (
    <>
      <PlaceholderContainer>
        <SegmentGroup $flex={1}>
          <TrainingDetailedImage training={training} titleAsLink image />
        </SegmentGroup>
        <SegmentGroup $flex={0.4}>
          <Segment>
            {training.isCancelled && <CancelledLabel>Cancelled</CancelledLabel>}
            <ItemGroup>
              <ItemImage src={training.host?.image || "./user.png"} />
              <strong>
                <ItemUserName
                  to={`/profiles/${training.host?.userName}`}
                  $fontSize="20px"
                >
                  {training.host?.displayName}
                </ItemUserName>
              </strong>
            </ItemGroup>
          </Segment>
          <Segment>
            <span>
              <Icon name="clock" />{" "}
              {format(training.date!, "dd MMM yyyy h:mm aa")}
              <Icon name="marker" /> {training.venue}
              <span>{training.description}</span>
              <ItemContent>
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
            </span>
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
    </>
  );
};

export default observer(TrainingListItem);
