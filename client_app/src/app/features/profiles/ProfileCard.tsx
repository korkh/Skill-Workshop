import { IProfile } from "../../models/profile";
import FollowButton from "./FollowButton";
import { observer } from "mobx-react-lite";
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardWrapper,
} from ".";
import { Icon } from "semantic-ui-react";

interface Props {
  profile: IProfile;
}
const ProfileCard = observer(({ profile }: Props) => {
  function truncate(str: string | undefined) {
    if (str) {
      return str.length > 40 ? str.substring(0, 37) + "..." : str;
    }
  }
  return (
    <CardWrapper to={`/profiles/${profile.userName}`}>
      {" "}
      <CardImage src={profile.image || "/user.png"} />
      <CardHeader>{profile.displayName}</CardHeader>
      <CardDescription>{truncate(profile.bio)}</CardDescription>
      <CardFooter>
        <span>
          <Icon name="user" />
          {(profile.followersCount && profile.followersCount > 1) ||
          profile.followersCount === 0
            ? profile.followersCount + " Followers"
            : profile.followersCount + " Follower"}
        </span>
      </CardFooter>
      <FollowButton profile={profile} />
    </CardWrapper>
  );
});

export default ProfileCard;
