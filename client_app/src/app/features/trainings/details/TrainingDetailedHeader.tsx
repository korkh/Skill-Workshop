import { ITraining } from "../../../models/training";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import Loader from "../../../components/loader/LoadingComponent";
import TrainingDetailedImage from "./TrainingDetailedImage";
import CustomButton from "../../../components/UI_elements/button/CustomButton";
import { LoaderWrapper } from ".";

interface Props {
  training: ITraining;
}

const TrainingDetailedHeader = observer(({ training }: Props) => {
  const {
    trainingStore: { updateAttendance, loading, cancelTrainingToggle },
  } = useStore();

  return (
    <>
      <TrainingDetailedImage training={training} />
      <span style={{ display: "flex", justifyContent: "space-between" }}>
        {training.isHost ? (
          <>
            <CustomButton
              color={training.isCancelled ? "green" : "red"}
              content={
                training.isCancelled
                  ? "Re-activate Activity"
                  : "Cancel Activity"
              }
              loading={loading}
              onClick={cancelTrainingToggle}
            >
              {loading && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </CustomButton>
            <CustomButton
              disabled={training.isCancelled}
              to={`/manage/${training.id}`}
              color="orange"
              content={"Manage Event"}
            ></CustomButton>
          </>
        ) : training.isGoing ? (
          <CustomButton
            onClick={updateAttendance}
            loading={loading}
            color={"red"}
            content={"Cancel attendance"}
          >
            {loading && (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            )}
          </CustomButton>
        ) : (
          <CustomButton
            onClick={updateAttendance}
            disabled={training.isCancelled}
            color={"green"}
            loading={loading}
            content={"Join Training"}
          />
        )}
      </span>
    </>
  );
});

export default TrainingDetailedHeader;
