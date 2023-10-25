import { observer } from "mobx-react-lite";
import { PlaceholderButton, PlaceholderLine, Segment, SegmentGroup } from ".";

const TrainingListItemPlaceholder = observer(() => {
  return (
    <>
      <SegmentGroup $flex={1}>
        <Segment>
          <PlaceholderLine width="80%" />
          <PlaceholderLine width="60%" />
          <PlaceholderLine width="90%" />
        </Segment>
        <Segment>
          <PlaceholderLine width="80%" />
          <PlaceholderLine width="60%" />
          <PlaceholderLine width="90%" />
        </Segment>
        <Segment>
          <PlaceholderLine width="80%" />
          <PlaceholderLine width="60%" />
          <PlaceholderLine width="90%" />
        </Segment>
        <Segment $reduced>
          <PlaceholderButton disabled>View</PlaceholderButton>
        </Segment>
      </SegmentGroup>
    </>
  );
});

export default TrainingListItemPlaceholder;
