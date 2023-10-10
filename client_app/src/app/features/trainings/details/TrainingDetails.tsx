import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import TrainingDetailedHeader from "./TrainingDetailedHeader";
import LoadingComponent from "../../../components/loader/LoadingComponent";
import { useStore } from "../../../stores/store";
import TrainingDetailedChat from "./TrainingDetailedChat";
import TrainingDetailedInfo from "./TrainingDetailedInfo";
import TrainingDetailedSidebar from "./TrainingDetailedSidebar";

const TrainingDetails = () => {
  const { trainingStore } = useStore();
  const {
    selectedTraining: training,
    loadTraining,
    loadingInitial,
    clearSelectedTraining,
  } = trainingStore;

  const { id } = useParams();

  useEffect(() => {
    if (id) loadTraining(id);
    return () => clearSelectedTraining();
  }, [clearSelectedTraining, id, loadTraining]);

  if (loadingInitial || !training) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={4}>
        <TrainingDetailedChat trainingId={training.id} />
      </Grid.Column>
      <Grid.Column width={8}>
        <TrainingDetailedHeader training={training} />
        <TrainingDetailedInfo training={training} />
      </Grid.Column>
      <Grid.Column width={4}>
        <TrainingDetailedSidebar training={training} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(TrainingDetails);
