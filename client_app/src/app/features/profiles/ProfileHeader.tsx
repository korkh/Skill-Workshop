import {
  Avatar,
  DisplayName,
  FollowSegment,
  Grid,
  ItemContent,
  ItemGroup,
  Segment,
  StatisticGroup,
  StatisticInfoHeader,
  StatisticItem,
} from ".";
import { IProfile } from "../../models/profile";
import FollowButton from "./FollowButton";
import { observer } from "mobx-react-lite";

interface Props {
  profile: IProfile;
}
const ProfileHeader = ({ profile }: Props) => {
  return (
    <Segment>
      <Grid>
        <ItemGroup>
          <Avatar src={profile.image || "/user.png"} alt="profile-avatar" />
          <ItemContent>
            <DisplayName>{profile.displayName}</DisplayName>
            <StatisticGroup>
              <StatisticItem>
                <StatisticInfoHeader>
                  Followers: {profile.followersCount}
                </StatisticInfoHeader>
              </StatisticItem>
              <StatisticItem>
                <StatisticInfoHeader>
                  Following: {profile.followingCount}
                </StatisticInfoHeader>
              </StatisticItem>
            </StatisticGroup>
          </ItemContent>
        </ItemGroup>
        <div>
          <FollowSegment>
            <FollowButton profile={profile} />
          </FollowSegment>
        </div>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
