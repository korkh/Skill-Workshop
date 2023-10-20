import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { categoryOptions } from "../../../components/common/options/CategoryOptions";
import Loader from "../../../components/loader/LoadingComponent";
import { TrainingFormValues } from "../../../models/training";
import { useStore } from "../../../stores/store";
import DateInput from "../../../components/common/form/DateInput";
import SelectInput from "../../../components/common/form/SelectInput";
import TextInput from "../../../components/common/form/TextInput";
import TextArea from "../../../components/common/form/TextArea";

const TrainingForm = () => {
  const { trainingStore } = useStore();
  const { createTraining, updateTraining, loadTraining, loadingInitial } =
    trainingStore;

  const { id } = useParams();

  const navigate = useNavigate();

  const [training, setTraining] = useState<TrainingFormValues>(
    new TrainingFormValues()
  );

  //Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("The training title is required"),
    description: Yup.string().required("The training description is required"),
    category: Yup.string().required(),
    date: Yup.string().required("Date is required"),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id)
      loadTraining(id).then((training) =>
        setTraining(new TrainingFormValues(training)!)
      );
  }, [id, loadTraining]);

  function handleFormSubmit(training: TrainingFormValues) {
    if (!training.id) {
      training.id = crypto.randomUUID();
      createTraining(training).then(() =>
        navigate(`/trainings/${training.id}`)
      );
    } else {
      updateTraining(training).then(() =>
        navigate(`/trainings/${training.id}`)
      );
    }
  }

  if (loadingInitial) return <Loader $zoom={2} />;

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize //get Activity updated after value is changed
        initialValues={training}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Header content="Training Details" sub color="teal" />
            <TextInput name="title" placeholder="Title" />
            <TextArea rows={3} placeholder="Description" name="description" />
            <SelectInput
              placeholder="Category"
              name="category"
              options={categoryOptions}
            />
            <DateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="d MMMM yyyy HH:mm"
            />
            <Header content="Location Details" sub color="teal" />
            <TextInput placeholder="City" name="city" />
            <TextInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to={`/trainings/${training.id}`}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(TrainingForm);
