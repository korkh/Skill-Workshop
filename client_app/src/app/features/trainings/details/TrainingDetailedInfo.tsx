import { format } from "date-fns";
import { ITraining } from "../../../models/training";
import {
  InfoContainer,
  InfoSegment,
  IconContainer,
  InfoDescription,
  MyIcon,
} from ".";
import { observer } from "mobx-react-lite";

interface Props {
  training: ITraining;
}

const TrainingDetailedInfo = ({ training }: Props) => {
  return (
    <InfoContainer>
      <InfoSegment>
        <IconContainer>
          <MyIcon className="large teal info icon" />
        </IconContainer>
        <InfoDescription>
          <span>{training.description}</span>
        </InfoDescription>
      </InfoSegment>
      <InfoSegment>
        <IconContainer>
          <MyIcon className="large teal book icon" />
        </IconContainer>
        <InfoDescription>
          <span>Category {training.category}</span>
        </InfoDescription>
      </InfoSegment>
      <InfoSegment>
        <IconContainer>
          <MyIcon className="large teal calendar icon" />
        </IconContainer>
        <InfoDescription>
          <span>{format(training.date!, "dd MMM yyyy HH:mm")}</span>
        </InfoDescription>
      </InfoSegment>
      <InfoSegment>
        <IconContainer>
          <MyIcon className="large teal marker icon" />
        </IconContainer>
        <InfoDescription>
          <span>
            {training.venue}, {training.city}
          </span>
        </InfoDescription>
      </InfoSegment>
    </InfoContainer>
  );
};

export default observer(TrainingDetailedInfo);
