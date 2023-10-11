import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ITraining } from "../../../models/training";
import { useStore } from "../../../stores/store";
import {
  CancelledLabel,
  LinkButton,
  Title,
  TrainingImage,
  TrainingImageContainer,
  TrainingImageText,
  LoaderWrapper,
} from ".";
import { observer } from "mobx-react-lite";
import ButtonWithLoader from "../../../components/UI_elements/button/Button";
import Loader from "../../../components/loader/LoadingComponent";

interface Props {
  training: ITraining;
}

const TrainingDetailedHeader = ({ training }: Props) => {
  const {
    trainingStore: { updateAttendance, loading, cancelTrainingToggle },
  } = useStore();

  return (
    <div>
      <TrainingImageContainer>
        {training.isCancelled && <CancelledLabel>Cancelled</CancelledLabel>}
        <TrainingImage
          src={`/categoryImages/${training.category}.jpg`}
          alt="Training Category"
        />
        <TrainingImageText>
          <div>
            <Title>{training.title}</Title>
            <p>{format(training.date!, "dd MMM yyyy")}</p>
            <p>
              Hosted by{" "}
              <strong>
                <Link to={`/profiles/${training.host?.userName}`}>
                  {training.host?.displayName}
                </Link>
              </strong>
            </p>
          </div>
        </TrainingImageText>
      </TrainingImageContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {training.isHost ? (
          <>
            <ButtonWithLoader
              isCancelled={training.isCancelled}
              disabled={loading}
              onClick={cancelTrainingToggle}
              titleStart="Re-activate training"
              titleEnd="Cancel training"
            >
              {loading && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </ButtonWithLoader>{" "}
            <LinkButton to={`/manage/${training.id}`}>Manage Event</LinkButton>
          </>
        ) : training.isGoing ? (
          <ButtonWithLoader
            onClick={cancelTrainingToggle}
            disabled={loading}
            isCancelled={training.isCancelled}
            titleStart="Join training"
            titleEnd="Cancel attendance"
          >
            {loading && (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            )}
          </ButtonWithLoader>
        ) : (
          <ButtonWithLoader
            onClick={updateAttendance}
            disabled={loading}
            isCancelled={!training.isGoing}
            titleStart="Join training"
            titleEnd="Cancel attendance"
          >
            {loading && (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            )}
          </ButtonWithLoader>
        )}
      </div>
    </div>
  );
};

export default observer(TrainingDetailedHeader);
