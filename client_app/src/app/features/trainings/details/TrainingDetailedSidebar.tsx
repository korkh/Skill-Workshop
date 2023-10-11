import { Link } from "react-router-dom";
import { ITraining } from "../../../models/training";
import {
  SidebarContainer,
  SidebarHeader,
  AttendeeList,
  AttendeeItem,
  HostLabel,
  AttendeeImage,
  AttendeeInfo,
  AttendeeName,
  FollowingLabel,
} from ".";

interface Props {
  training: ITraining;
}

const TrainingDetailedSidebar = ({ training: { attendees, host } }: Props) => {
  if (!attendees) return null;
  return (
    <SidebarContainer>
      <SidebarHeader>
        <p>
          {attendees.length} {attendees.length === 1 ? "Person is" : "People are"}{" "}
          going
        </p>
      </SidebarHeader>
      <AttendeeList>
        {attendees.map((attendee) => (
          <AttendeeItem key={attendee.userName}>
            <AttendeeImage
              src={attendee.image || "/user.png"}
              alt={attendee.displayName}
            />
            <AttendeeInfo>
              <AttendeeName>
                <Link to={`/profiles/${attendee.userName}`}>
                  {attendee.displayName}
                </Link>
              </AttendeeName>
              {attendee.following && <FollowingLabel>Following</FollowingLabel>}
            </AttendeeInfo>
            {attendee.userName === host?.userName && (
              <HostLabel>Host</HostLabel>
            )}
          </AttendeeItem>
        ))}
      </AttendeeList>
    </SidebarContainer>
  );
};

export default TrainingDetailedSidebar;
