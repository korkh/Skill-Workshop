import { ITraining } from "../../../models/training";
import { useStore } from "../../../stores/store";
import { LinkButton, LoaderWrapper } from ".";
import { observer } from "mobx-react-lite";
import ButtonWithLoader from "../../../components/UI_elements/button/Button";
import Loader from "../../../components/loader/LoadingComponent";
import TrainingDetailedImage from "./TrainingDetailedImage";

interface Props {
  training: ITraining;
}

const TrainingDetailedHeader = ({ training }: Props) => {
  const {
    trainingStore: { updateAttendance, loading, cancelTrainingToggle },
  } = useStore();

  return (
    <>
      <TrainingDetailedImage training={training} />
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
    </>
  );
};

export default observer(TrainingDetailedHeader);
