import {
  PlaceholderContainer,
  PlaceholderButton,
  PlaceholderLine,
  SegmentGroup,
  Segment,
} from ".";

export default function TrainingListItemPlaceholder() {
  return (
    <PlaceholderContainer>
      <SegmentGroup $flex={1} $bgcolor="#ccc" $bdrcolor="#fff" />
      <SegmentGroup $flex={0.5}>
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
    </PlaceholderContainer>
  );
}
