import { Fragment, useEffect } from "react";
import { useStore } from "../../../stores/store";
import { formatDistanceToNow } from "date-fns";
import { Formik, Field, FieldProps, Form } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import {
  ChatContainer,
  ChatHeader,
  ChatContent,
  CommentInputContainer,
  CommentItem,
  CommentAvatar,
  CommentContent,
  CommentAuthor,
  CommentMetadata,
  CommentText,
  ChatList,
  UserMessage,
  OtherUserMessage,
  ChatTextArea,
} from ".";
import LoadingComponent from "../../../components/loader/LoadingComponent";

interface Props {
  trainingId: string;
}

const TrainingDetailedChat = ({ trainingId }: Props) => {
  const { commentStore, userStore } = useStore();

  useEffect(() => {
    if (trainingId) {
      commentStore.createHubConnection(trainingId);
    }

    //clean up connection when we are dispose our component
    return () => {
      commentStore.clearComments();
    };
  }, [commentStore, trainingId]);

  return (
    <ChatContainer>
      <ChatHeader>
        <h2>Chat about this event</h2>
      </ChatHeader>
      <ChatContent>
        <Formik
          onSubmit={(values, { resetForm }) => {
            commentStore.addComment(values).then(() => {
              resetForm();
              // setDisplayMetadata(false);
            });
          }}
          initialValues={{ body: "" }}
          validationSchema={Yup.object({
            body: Yup.string().required(),
          })}
        >
          {({ isSubmitting, isValid, handleSubmit }) => (
            <Form className="ui form">
              <Field name="body">
                {(props: FieldProps) => (
                  <CommentInputContainer>
                    {isSubmitting && <LoadingComponent />}
                    <ChatTextArea
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
                  </CommentInputContainer>
                )}
              </Field>
            </Form>
          )}
        </Formik>
        <ChatList>
          {commentStore.comments.map((comment) => (
            <Fragment key={comment.id}>
              {comment.userName === userStore.user?.userName ? (
                <UserMessage>
                  <CommentText>{comment.body}</CommentText>
                </UserMessage>
              ) : (
                <OtherUserMessage>
                  <CommentItem>
                    <CommentAvatar>
                      <img
                        src={comment.image || "/user.png"}
                        alt="User Avatar"
                      />
                    </CommentAvatar>
                    <CommentContent>
                      <CommentAuthor href={`/profiles/${comment.userName}`}>
                        {comment.displayName}
                      </CommentAuthor>
                    </CommentContent>
                  </CommentItem>
                  <CommentText>{comment.body}</CommentText>
                </OtherUserMessage>
              )}
              <CommentMetadata>
                <span>{formatDistanceToNow(comment.createdAt)} ago</span>
              </CommentMetadata>
            </Fragment>
          ))}
        </ChatList>
      </ChatContent>
    </ChatContainer>
  );
};

export default observer(TrainingDetailedChat);
