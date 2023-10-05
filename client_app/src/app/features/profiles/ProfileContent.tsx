import { Tab } from "semantic-ui-react";
import { IProfile } from "../../models/profile";
import { useStore } from "../../stores/store";
import ProfileAbout from "./ProfileAbout";
import ProfileTrainings from "./ProfileTrainings";
import ProfileFollowings from "./ProfileFollowings";
import { observer } from "mobx-react-lite";
import ProfilePhotos from "./ProfilePhotos";

interface Props {
  profile: IProfile;
}
const ProfileContent = ({ profile }: Props) => {
  const { profileStore } = useStore();
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <ProfileTrainings /> },
    {
      menuItem: "Followers",
      render: () => <ProfileFollowings />,
    },
    {
      menuItem: "Following",
      render: () => <ProfileFollowings />,
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(_, data) => profileStore.setActiveTab(data.activeIndex)}
    />
  );
};

export default observer(ProfileContent);
