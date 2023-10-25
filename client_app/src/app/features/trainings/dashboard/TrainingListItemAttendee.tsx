import { observer } from "mobx-react-lite";
import { IProfile } from "../../../models/profile";
import ProfileCard from "../../profiles/ProfileCard";
import { ListWrapper, ListItemLink, UserImage, PopupContent, ListItem } from ".";
import { useState } from "react";

interface Props {
  attendees: IProfile[];
}

const TrainingListItemAttendee = observer(({ attendees }: Props) => {
  
  const [visiblePopup, setVisiblePopup] = useState<string | null>(null);

  return (
    <ListWrapper>
      {attendees.map((attendee) => (
        <ListItem
          key={attendee.userName}
          $following={attendee.following}
          onMouseEnter={() => setVisiblePopup(attendee.userName)}
          onMouseLeave={() => setVisiblePopup(null)}
        >
          <ListItemLink to={`/profiles/${attendee.userName}`}>
            <UserImage src={attendee.image || "/user.png"} alt={attendee.userName} />
          </ListItemLink>
          {visiblePopup === attendee.userName && (
            <PopupContent $isVisible={true}>
              <ProfileCard profile={attendee} />
            </PopupContent>
          )}
        </ListItem>
      ))}
    </ListWrapper>
  );
});

export default TrainingListItemAttendee;
