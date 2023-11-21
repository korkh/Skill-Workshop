import { format } from "date-fns";
import { SyntheticEvent, useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import { IUserTraining } from "../../models/profile";
import { observer } from "mobx-react-lite";
import Loader from "../../components/loader/LoadingComponent";
import {
  CardFooter,
  CardHeader,
  CardImage,
  CardWrapper,
  PaneCardGroup,
  PaneContainer,
  PaneHeader,
  TabContainer,
  TabItem,
  Tabs,
} from ".";
export interface TabProps {
  [key: string]: number | string;
}

const panes = [
  { menuItem: "Future Events", pane: { key: "future" } },
  { menuItem: "Past Events", pane: { key: "past" } },
  { menuItem: "Hosting", pane: { key: "hosting" } },
];

const ProfileTrainings = observer(() => {
  const { profileStore } = useStore();
  const { loadUserTrainings, profile, loadingTrainings, userTrainings } =
    profileStore;
  const [activeTabIndex, setActiveTabIndex] = useState<number | string>(2);

  useEffect(() => {
    loadUserTrainings(profile!.userName);
  }, [loadUserTrainings, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    e.preventDefault();
    loadUserTrainings(
      profile!.userName,
      panes[data.activeIndex as number].pane.key
    );
    setActiveTabIndex(data.activeIndex);
  };

  

  if (loadingTrainings) return <Loader $zoom={3} />;

  return (
    <PaneContainer>
      <PaneHeader>Trainings</PaneHeader>
      <TabContainer>
        <Tabs>
          {panes.map((pane, index) => (
            <TabItem
              key={index}
              $active={index === activeTabIndex}
              onClick={(e) => handleTabChange(e, { activeIndex: index })}
            >
              {pane.menuItem}
            </TabItem>
          ))}
        </Tabs>
        <br />
      </TabContainer>
      <PaneCardGroup>
        {userTrainings.map((training: IUserTraining) => (
          <CardWrapper to={`/trainings/${training.id}`} key={training.id}>
            {" "}
            <CardImage src={`/categoryImages/${training.category}.jpg`} />
            <CardHeader>{training.title}</CardHeader>
            <CardFooter>
              <span>
                <div>{format(new Date(training.date), "do LLL")}</div>
                <div>{format(new Date(training.date), "h:mm a")}</div>
              </span>
            </CardFooter>
          </CardWrapper>
        ))}
      </PaneCardGroup>
    </PaneContainer>
  );
});

export default ProfileTrainings;
