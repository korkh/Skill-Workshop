import { Link } from "react-router-dom";
import { Image, Card, Icon } from "semantic-ui-react";
import { IProfile } from "../../models/profile";
import FollowButton from "./FollowButton";
import { observer } from "mobx-react-lite";

interface Props {
  profile: IProfile;
}
const ProfileCard = ({ profile }: Props) => {
  function truncate(str: string | undefined) {
    if (str) {
      return str.length > 40 ? str.substring(0, 37) + "..." : str;
    }
  }
  return (
    <Card as={Link} to={`/profiles/${profile.userName}`}>
      <Image src={profile.image || "../../assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>{truncate(profile.bio)}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {profile.followersCount} Followers
      </Card.Content>
      <FollowButton profile={profile} />
    </Card>
  );
};

export default observer(ProfileCard);
