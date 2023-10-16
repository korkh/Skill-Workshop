import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useStore } from "../../../stores/store";
import TrainingListItem from "./TrainingListItem";
import { TrainingListHeader } from ".";

const TrainingList = () => {
  const { trainingStore } = useStore();
  const { groupedTrainings } = trainingStore;

  return (
    <>
      {groupedTrainings.length !== 0 ? (
        <>
          {groupedTrainings.map(([group, trainings]) => (
            <Fragment key={group}>
              <TrainingListHeader>
                {group}
              </TrainingListHeader>
              {trainings.map((training) => (
                <TrainingListItem training={training} key={training.id} />
              ))}
            </Fragment>
          ))}
        </>
      ) : (
        <h1 style={{ textAlign: "center" }}>NO TRAININGS FOUND</h1>
      )}
    </>
  );
};

export default observer(TrainingList);
