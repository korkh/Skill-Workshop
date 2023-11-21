import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TrainingDetailedHeader from "./TrainingDetailedHeader";
import Loader from "../../../components/loader/LoadingComponent";
import { useStore } from "../../../stores/store";
import TrainingDetailedChat from "./TrainingDetailedChat";
import TrainingDetailedInfo from "./TrainingDetailedInfo";
import TrainingDetailedSidebar from "./TrainingDetailedSidebar";
import { TrainingDetailsContainer, TrainingDetailsColumn } from ".";
import { useMediaQuery } from "../../../hooks/hooks";

const TrainingDetails = observer(() => {
  const { trainingStore } = useStore();
  const {
    selectedTraining: training,
    loadTraining,
    loadingInitial,
    clearSelectedTraining,
  } = trainingStore;
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const { id } = useParams();

  useEffect(() => {
    if (id) loadTraining(id);
    return () => clearSelectedTraining();
  }, [clearSelectedTraining, id, loadTraining]);

  if (loadingInitial || !training) return <Loader $zoom={2} />;

  return !isSmallScreen ? (
    <TrainingDetailsContainer>
      <TrainingDetailsColumn $columnWidthFlex={0.6}>
        <TrainingDetailedChat trainingId={training.id} />
      </TrainingDetailsColumn>
      <TrainingDetailsColumn>
        <TrainingDetailedHeader training={training} />
        <TrainingDetailedInfo training={training} />
      </TrainingDetailsColumn>
      <TrainingDetailsColumn $columnWidthFlex={0.4}>
        <TrainingDetailedSidebar training={training} />
      </TrainingDetailsColumn>
    </TrainingDetailsContainer>
  ) : (
    <TrainingDetailsContainer>
      <TrainingDetailsColumn>
        <TrainingDetailedHeader training={training} />
        <TrainingDetailedInfo training={training} />
      </TrainingDetailsColumn>
      <TrainingDetailsColumn>
        <TrainingDetailedSidebar training={training} />
      </TrainingDetailsColumn>
      <TrainingDetailsColumn>
        <TrainingDetailedChat trainingId={training.id} />
      </TrainingDetailsColumn>
    </TrainingDetailsContainer>
  );
});

export default TrainingDetails;
