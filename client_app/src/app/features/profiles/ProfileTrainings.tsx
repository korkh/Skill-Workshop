import { format } from "date-fns";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, TabProps, Tab, Grid, Header, Card } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { IUserTraining } from "../../models/profile";
import { observer } from "mobx-react-lite";

const panes = [
  { menuItem: "Future Events", pane: { key: "future" } },
  { menuItem: "Past Events", pane: { key: "past" } },
  { menuItem: "Hosting", pane: { key: "hosting" } },
];

const ProfileTrainings = () => {
  const { profileStore } = useStore();
  const { loadUserTrainings, profile, loadingTrainings, userTrainings } =
    profileStore;

  useEffect(() => {
    loadUserTrainings(profile!.userName);
  }, [loadUserTrainings, profile]);

  const handleTabChange = (data: TabProps) => {
    loadUserTrainings(
      profile!.userName,
      panes[data.activeIndex as number].pane.key
    );
  };

  return (
    <Tab.Pane loading={loadingTrainings}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Trainings"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(data) => handleTabChange(data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userTrainings.map((training: IUserTraining) => (
              <Card
                as={Link}
                to={`/trainings/${training.id}`}
                key={training.id}
              >
                <Image
                  src={`/categoryImages/${training.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{training.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(new Date(training.date), "do LLL")}</div>
                    <div>{format(new Date(training.date), "h:mm a")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileTrainings);
