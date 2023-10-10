import {
  Button,
  ButtonGroup,
  Grid,
  GridColumn,
  Header,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import PhotoDropZoneWidget from "./PhotoDropZoneWidget";
import PhotoCropperWidget from "./PhotoCropperWidget";

interface Props {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

const PhotoUploadWidget = ({ loading, uploadPhoto }: Props) => {
  const [files, setFiles] = useState<object & { preview?: string }[]>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  }

  //to clean up memory with preview: URL.createObjectURL(file) in dropZone, after component dismout
  useEffect(() => {
    return () => {
      files.forEach((file: object & { preview?: string }) =>
        URL.revokeObjectURL(file.preview!)
      );
    };
  }, [files]);

  return (
    <Grid>
      <GridColumn width={4}>
        <Header sub color="teal" content="Step 1 - Add Photo" />
        <PhotoDropZoneWidget setFiles={setFiles} />
      </GridColumn>
      <GridColumn width={1} />
      <GridColumn width={4}>
        <Header sub color="teal" content="Step 2 - Resize Photo" />
        {files && files.length > 0 && (
          <PhotoCropperWidget
            setCropper={setCropper}
            imagePreview={files[0].preview!}
          />
        )}
      </GridColumn>
      <GridColumn width={1} />
      <GridColumn width={4}>
        <Header sub color="teal" content="Step 3 - Preview & Upload" />
        {files && files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minHeight: 200, overflow: "hidden" }}
            />
            <ButtonGroup width={2} style={{ width: "100%" }}>
              <Button
                loading={loading}
                onClick={onCrop}
                positive
                icon="check"
              />
              <Button
                disable={loading}
                onClick={() => setFiles([])}
                icon="close"
              />
            </ButtonGroup>
          </>
        )}
      </GridColumn>
    </Grid>
  );
};

export default PhotoUploadWidget;
