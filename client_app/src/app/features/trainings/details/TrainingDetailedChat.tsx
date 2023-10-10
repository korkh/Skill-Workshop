import { useEffect } from "react";
import { useStore } from "../../../stores/store";
import { formatDistanceToNow } from "date-fns";
import { Formik, Field, FieldProps } from "formik";
import { Form, Link } from "react-router-dom";
import { Comment, Segment, Header, Loader } from "semantic-ui-react";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";

interface Props {
  trainingId: string;
}

const TrainingDetailedChat = ({ trainingId }: Props) => {
  const { commentStore } = useStore();

  useEffect(() => {
    if (trainingId) {
      commentStore.createHubConnection(trainingId);
    }

    //clean up connection when we are dispose our component
    return () => {
      commentStore.clearComments();
    };
  }, [trainingId, commentStore]);
  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached clearing>
        <Formik
          onSubmit={(values, { resetForm }) =>
            commentStore.addComment(values).then(() => resetForm())
          }
          initialValues={{ body: "" }}
          validationSchema={Yup.object({
            body: Yup.string().required(),
          })}
        >
          {({ isSubmitting, isValid, handleSubmit }) => (
            <Form className="ui form">
              <Field name="body">
                {(props: FieldProps) => (
                  <div style={{ position: "relative" }}>
                    <Loader active={isSubmitting} />
                    <textarea
                      placeholder="Enter your comment (enter to submit, shift + enter for new line)"
                      rows={2}
                      {...props.field}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.shiftKey) return;

                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          isValid && handleSubmit();
                        }
                      }}
                    />
                  </div>
                )}
              </Field>
            </Form>
          )}
        </Formik>
        <Comment.Group>
          {commentStore.comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.userName}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                </Comment.Metadata>
                <Comment.Text style={{ whiteSpace: "pre-wrap" }}>
                  {comment.body}
                </Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  );
};

export default observer(TrainingDetailedChat);
