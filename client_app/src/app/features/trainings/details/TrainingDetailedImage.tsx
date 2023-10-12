import { format } from "date-fns";
import { Link } from "react-router-dom";
import {
  TrainingImageContainer,
  CancelledLabel,
  TrainingImage,
  TrainingImageText,
  Title,
  ItemHeader,
  ItemUserName,
  ItemImage,
} from ".";
import { ITraining } from "../../../models/training";
import { observer } from "mobx-react-lite";

interface Props {
  training: ITraining;
  titleAsLink?: boolean;
  image?: boolean;
}

const TrainingDetailedImage = ({ training, titleAsLink, image }: Props) => {
  return (
    <TrainingImageContainer>
      {training.isCancelled && <CancelledLabel>Cancelled</CancelledLabel>}
      <TrainingImage
        src={`/categoryImages/${training.category}.jpg`}
        alt="Training Category"
      />
      <TrainingImageText>
        <div>
          {titleAsLink ? (
            <ItemHeader as={Link} to={`/trainings/${training.id}`}>
              {training.title}
            </ItemHeader>
          ) : (
            <Title>{training.title}</Title>
          )}
          <p>{format(training.date!, "dd MMM yyyy")}</p>
          <p>
            Hosted by{" "}
            <strong>
              <ItemUserName to={`/profiles/${training.host?.userName}`}>
                {training.host?.displayName}
              </ItemUserName>{" "}
              {image && (
                <ItemImage src={training.host?.image || "./user.png"} />
              )}
            </strong>
          </p>
        </div>
      </TrainingImageText>
    </TrainingImageContainer>
  );
};

export default observer(TrainingDetailedImage);
