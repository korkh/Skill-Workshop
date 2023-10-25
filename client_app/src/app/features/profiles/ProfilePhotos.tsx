import { SyntheticEvent } from "react";
import { observer } from "mobx-react-lite";
import {
  Card,
  CardGroup,
  Header,
  Image,
  Grid,
  GridColumn,
  Button,
  TabPane,
  ButtonGroup,
} from "semantic-ui-react";
import { useState } from "react";
import PhotoUploadWidget from "../../components/common/imageUpload/PhotoUploadWidget";
import { Profile } from "../../models/profile";
import { useStore } from "../../stores/store";
import { IPhoto } from "../../models/photo";
interface Props {
  profile: Profile;
}

const ProfilesPhotos = observer(({ profile }: Props) => {
  const {
    profileStore: {
      isCurrentUser,
      uploadPhoto,
      uploading,
      loading,
      setMainPhoto,
      deletePhoto,
    },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);

  const [target, setTarget] = useState("");

  //Uploading images
  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  }

  //Assigning Profile Photo
  function handleSetMainPhoto(
    photo: IPhoto,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  //Deleting photo from profile
  function handleDeletePhoto(
    photo: IPhoto,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <TabPane>
      <Grid>
        <GridColumn width={16}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </GridColumn>
        <GridColumn width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={handlePhotoUpload}
              loading={uploading}
            />
          ) : (
            <CardGroup itemsPerRow={5}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <ButtonGroup fluid width={2}>
                      <Button
                        basic
                        color="green"
                        content="Main"
                        name={"main" + photo.id} //to avoid appearing with deleButton we can name it dofferent from delete
                        disabled={photo.isMain}
                        loading={target === "main" + photo.id && loading} //same for target
                        onClick={(e) => handleSetMainPhoto(photo, e)}
                      />
                      <Button
                        basic
                        color="red"
                        icon="trash"
                        name={photo.id}
                        loading={target === photo.id && loading}
                        onClick={(e) => handleDeletePhoto(photo, e)}
                        disabled={photo.isMain}
                      />
                    </ButtonGroup>
                  )}
                </Card>
              ))}
            </CardGroup>
          )}
        </GridColumn>
      </Grid>
    </TabPane>
  );
});

export default ProfilesPhotos;
