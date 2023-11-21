import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Loader from "../../../components/loader/LoadingComponent";
import { TrainingFormValues } from "../../../models/training";
import { useStore } from "../../../stores/store";
import { CancelButton, FormHeader, SubmitButton, Wrapper } from ".";
import TextInput from "../../../components/common/form/TextInput";
import TextArea from "../../../components/common/form/TextArea";
import SelectInput from "../../../components/common/form/SelectInput";
import DateInput from "../../../components/common/form/DateInput";
import { categoryOptions } from "../../../components/common/options/CategoryOptions";
import { ButtonContainer } from ".";

const TrainingForm = observer(() => {
  const { trainingStore } = useStore();
  const { createTraining, updateTraining, loadTraining, loadingInitial } =
    trainingStore;
  const navigate = useNavigate();
  const { id } = useParams();

  const [training, setTraining] = useState<TrainingFormValues>(
    new TrainingFormValues()
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("The event title is required"),
    category: Yup.string().required("The event category is required"),
    description: Yup.string().required(),
    date: Yup.string().required("Date is required").nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id)
      loadTraining(id).then((training) =>
        setTraining(new TrainingFormValues(training))
      );
  }, [id, loadTraining]);

  function handleFormSubmit(training: TrainingFormValues) {
    if (!training.id) {
      const newTraining = {
        ...training,
        id: crypto.randomUUID(),
      };
      createTraining(newTraining).then(() => {
        navigate(`/trainings/${newTraining.id}`);
      });
    } else {
      updateTraining(training).then(() =>
        navigate(`/trainings/${training.id}`)
      );
    }
  }

  if (loadingInitial) return <Loader $zoom={2} />;

  return (
    <Wrapper>
      <FormHeader>TRAINING DETAILS</FormHeader>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={training}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <TextInput name="title" placeholder="Title" />
            <TextArea rows={3} name="description" placeholder="Description" />
            <SelectInput
              options={categoryOptions}
              name="category"
              placeholder="Category"
            />
            <DateInput
              name="date"
              placeholderText="Date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy HH:mm"
            />
            <br />
            <br />
            <FormHeader>LOCATION DETAILS</FormHeader>
            <TextInput name="venue" placeholder="Venue" />
            <TextInput name="city" placeholder="city" />
            <ButtonContainer>
              <SubmitButton
                disabled={isSubmitting || !dirty || !isValid}
                type="submit"
              >
                Submit
              </SubmitButton>
              <CancelButton to="/trainings">Cancel</CancelButton>
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
});

export default TrainingForm;
