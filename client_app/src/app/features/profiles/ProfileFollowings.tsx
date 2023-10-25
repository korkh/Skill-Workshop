import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import ProfileCard from "./ProfileCard";
import { PaneCardGroup, PaneContainer, PaneHeader } from ".";
import Loader from "../../components/loader/LoadingComponent";

const ProfileFollowings = observer(() => {
  const { profileStore } = useStore();
  const { profile, followings, loadingFollowings, activeTab } = profileStore;

  if (loadingFollowings) return <Loader />;

  return (
    <PaneContainer>
      <PaneHeader>
        {activeTab === 3
          ? `People following ${profile?.displayName}`
          : `People ${profile?.displayName} is following`}
      </PaneHeader>
      <PaneCardGroup>
        {followings.map((profile) => (
          <ProfileCard key={profile.userName} profile={profile} />
        ))}
      </PaneCardGroup>
    </PaneContainer>
  );
});

export default ProfileFollowings;
