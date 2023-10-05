import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { ITraining } from "../../../models/training";
import { useStore } from "../../../stores/store";

const trainingImageStyle = {
  filter: "brightness(30%)",
};

const trainingImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  training: ITraining;
}

const TrainingDetailedHeader = ({ training }: Props) => {
  const {
    trainingStore: { updateAttendance, loading, cancelTrainingToggle },
  } = useStore();

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {training.isCancelled && (
          <Label
            style={{ position: "absolute", zIndex: 1000, left: -14, top: 20 }}
            ribbon
            color="red"
            content="Cancelled"
          />
        )}
        <Image
          src={`/assets/categoryImages/${training.category}.jpg`}
          fluid
          style={trainingImageStyle}
        />
        <Segment style={trainingImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={training.title}
                  style={{ color: "white" }}
                />
                <p>{format(training.date!, "dd MMM yyyy")}</p>
                <p>
                  Hosted by{" "}
                  <strong>
                    <Link to={`/profiles/${training.host?.userName}`}>
                      {training.host?.displayName}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {training.isHost ? (
          <>
            <Button
              color={training.isCancelled ? "green" : "red"}
              floated="left"
              basic
              content={
                training.isCancelled
                  ? "Re-activate Training"
                  : "Cancel Training"
              }
              loading={loading}
              onClick={cancelTrainingToggle}
            />
            <Button
              disabled={training.isCancelled}
              as={Link}
              to={`/manage/${training.id}`}
              color="orange"
              floated="right"
            >
              Manage Event
            </Button>
          </>
        ) : training.isGoing ? (
          <Button onClick={cancelTrainingToggle} loading={loading}>
            Cancel attendance
          </Button>
        ) : (
          <Button
            onClick={updateAttendance}
            disabled={training.isCancelled}
            color="teal"
            loading={loading}
          >
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default TrainingDetailedHeader;
