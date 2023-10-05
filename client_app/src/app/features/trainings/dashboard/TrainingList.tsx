import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { Fragment } from "react";
import { useStore } from "../../../stores/store";
import TrainingListItem from "./TrainingListItem";

const TrainingList = () => {
  const { trainingStore } = useStore();
  const { groupedTrainings } = trainingStore;

  return (
    <>
      {groupedTrainings.length !== 0 ? (
        <>
          {groupedTrainings.map(([group, trainings]) => (
            <Fragment key={group}>
              <Header sub color="teal">
                {group}
              </Header>
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
