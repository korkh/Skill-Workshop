import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/loader/LoadingComponent";
import ProfileContent from "../features/profiles/ProfileContent";
import ProfileHeader from "../features/profiles/ProfileHeader";
import { useStore } from "../stores/store";

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { profileStore } = useStore();
  const { loadingProfile, loadProfile, profile, setActiveTab } = profileStore;

  useEffect(() => {
    if (username) loadProfile(username);
    return () => {
      setActiveTab(0);
    };
  }, [loadProfile, setActiveTab, username]);

  if (loadingProfile) return <Loader $zoom={2} />;

  return (
    <>
      {profile && (
        <>
          <ProfileHeader profile={profile} />
          <ProfileContent profile={profile} />
        </>
      )}
    </>
  );
};

export default observer(ProfilePage);
