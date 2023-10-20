import { IProfile } from "../../models/profile";
import { useStore } from "../../stores/store";
import ProfileAbout from "./ProfileAbout";
import ProfileTrainings from "./ProfileTrainings";
import ProfileFollowings from "./ProfileFollowings";
import { observer } from "mobx-react-lite";
import ProfilePhotos from "./ProfilePhotos";
import { TabContainer, TabContent, TabItem, Tabs } from ".";

interface Props {
  profile: IProfile;
}
const ProfileContent = ({ profile }: Props) => {
  const { profileStore } = useStore();
  const activeTabIndex: number | string = profileStore.activeTab || 0;
  const tabs = [
    { label: "About", content: <ProfileAbout /> },
    { label: "Photos", content: <ProfilePhotos profile={profile} /> },
    { label: "Trainings", content: <ProfileTrainings /> },
    { label: "Followers", content: <ProfileFollowings /> },
    { label: "Following", content: <ProfileFollowings /> },
  ];

  return (
    <>
      <TabContainer>
        <Tabs>
          {tabs.map((tab, index) => (
            <TabItem
              key={index}
              $active={index === activeTabIndex}
              onClick={() => profileStore.setActiveTab(index)}
            >
              {tab.label}
            </TabItem>
          ))}
        </Tabs>
      </TabContainer>
      <TabContent>{tabs[activeTabIndex].content}</TabContent>
    </>
  );
};

export default observer(ProfileContent);
