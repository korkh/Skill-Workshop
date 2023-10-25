import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { IProfile } from "../../models/profile";
import {
  CustomFollowButton,
  CustomFollowHiddenButton,
  FollowButtonWrapper,
} from ".";
import Loader from "../../components/loader/LoadingComponent";
interface Props {
  profile: IProfile;
}

const FollowButton = observer(({ profile }: Props) => {
  const { profileStore, userStore } = useStore();
  const { updateFollowing, loading } = profileStore;

  if (userStore.user?.userName === profile.userName) return null;

  function handleFollow(
    e: React.MouseEvent<HTMLButtonElement>,
    userName: string
  ) {
    e.preventDefault();
    profile.following
      ? updateFollowing(userName, false)
      : updateFollowing(userName, true);
  }

  return (
    <FollowButtonWrapper>
      <CustomFollowButton onClick={(e) => handleFollow(e, profile.userName)}>
        {profile.following ? "Following" : "Not following"}
      </CustomFollowButton>
      <CustomFollowHiddenButton
        $following={profile.following}
        onClick={(e) => handleFollow(e, profile.userName)}
      >
        {loading ? <Loader /> : profile.following ? "Unfollow" : "Follow"}
      </CustomFollowHiddenButton>
    </FollowButtonWrapper>
  );
});

export default FollowButton;
