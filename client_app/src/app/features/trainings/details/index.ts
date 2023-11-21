import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface ButtonProps {
  isCancelled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

/* TrainingDetailedHeader */

const TrainingImage = styled.img`
  width: 100%;
  filter: brightness(40%);
  padding-right: 1vw;
`;

const CancelledLabel = styled.div`
  position: absolute;
  z-index: 10;
  left: -14px;
  top: 20px;
  background-color: red;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
`;

const TrainingImageContainer = styled.div`
  position: relative;
`;

const TrainingImageText = styled.div`
  position: absolute;
  bottom: 5%;
  left: 5%;
  width: 100%;
  height: auto;
  color: white;
`;

const Title = styled.h1`
  color: white;
`;

const ItemHeader = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 2.3rem;
`;

const Button = styled.button<ButtonProps>`
  && {
    background-color: ${(props) => (props.isCancelled ? "green" : "red")};
  }
  color: white;
  padding: 8px 16px;
  border: none;
  position: relative;
  cursor: pointer;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LinkButton = styled(Link)`
  background-color: orange;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border: none;
  border-radius: 6px;
  left: 0;
  cursor: pointer;
`;

const ButtonMainStyles: CSSProperties = {
  color: "white",
  padding: "8px 16px",
  border: "none",
  position: "relative",
  borderRadius: "6px",
  cursor: "pointer",
};

/* TrainingDetailedInfo */

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  background-color: #fff;
`;

const InfoSegment = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const IconContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyIcon = styled.i`
  font-size: 24px;
  color: teal;
`;

const InfoDescription = styled.div`
  flex: 6;
  padding-left: 10px;
`;

/* TRAINING DETAILS */

const TrainingDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TrainingDetailsColumn = styled.div<{ $columnWidthFlex?: number }>`
  flex: ${(props) => props.$columnWidthFlex || 1};
  margin-right: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const TrainingHeader = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ItemImage = styled.img`
  width: calc(var(--index) * 3);
  height: calc(var(--index) * 3);
  border-radius: 50%;
`;

const TrainingInfo = styled.p`
  font-size: 16px;
  line-height: 1.4;
`; //end of TrainingDetails component

/* TrainingDetailedSidebar */
const SidebarContainer = styled.div`
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SidebarHeader = styled.div`
  text-align: center;
  margin-bottom: 16px;
  font-size: 18px;
  padding: 10px;
  color: #fff;
  background-color: teal;
`;

const AttendeeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AttendeeItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 10px 15px;
  position: relative;
`;

const HostLabel = styled.span`
  background-color: #f0ad4e;
  color: #fff;
  padding: 4px 15px;
  border: 1px solid #cccc;
  border-radius: 4px;
  font-size: calc(var(--index) / 1.7);
  position: relative;
  z-index: 10;
  right: -11%;
  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid #cccc;
    border-top: 5px solid #c17101;
    top: 100%;
    right: 10%;
    transform: translateX(30%);
  }

  @media (max-width: 768px) {
    font-size: calc(var(--index) / 0.8);
    right: -6.5%;
  }
`;

const AttendeeImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
`;

const AttendeeInfo = styled.div`
  flex-grow: 1;
`;

const AttendeeName = styled.h3`
  font-size: 16px;
  margin: 0;
  color: #333;
`;

interface UserNameProps {
  $fontSize?: string;
}

const ItemUserName = styled(Link)<UserNameProps>`
  font-size: ${(props) => (props.$fontSize ? props.$fontSize : "16px")};
`;

const FollowingLabel = styled.p`
  color: orange;
  font-size: 12px;
  margin-top: 4px;
`; //end of TrainingDetailedSidebar

///////////////////////////////////////////////////////////////////
/* TrainingDetailedChst */
const ChatContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  background-color: teal;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 1.2rem;
`;

const ChatTextArea = styled.textarea`
  min-height: 50px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    margin: 0;
  }
`;

const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  max-width: 400px;
  @media (max-width: 768px) {
    max-width: unset;
    width: 100%;
  }
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentInputContainer = styled.div`
  position: relative;
`;

const Message = styled.div`
  padding: 8px;
  border-radius: 8px;
  margin: 8px;
  max-width: 80%;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const UserMessage = styled(Message)`
  align-self: flex-end;
  background-color: #0084ff;
  color: white;
  border-bottom-right-radius: 0;
`;

const OtherUserMessage = styled(Message)`
  align-self: flex-start;
  background-color: #f0f0f0;
  color: #333;
  border-top-left-radius: 0;
`;

const CommentItem = styled.div`
  display: flex;
  margin: 3px;
`;

const CommentAvatar = styled.div`
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const CommentContent = styled.div`
  margin-left: 5px;
`;

const CommentAuthor = styled.a`
  font-weight: bold;
  text-decoration: none;
  color: #0084ff;
`;

const CommentMetadata = styled.div`
  color: #888;
  text-align: center;
`;

const CommentText = styled.div`
  white-space: pre-wrap;
`; //TrainingDetailedChat

export {
  TrainingImage,
  CancelledLabel,
  TrainingImageContainer,
  TrainingImageText,
  Title,
  Button,
  LoaderWrapper,
  LinkButton,
  ButtonMainStyles,
  InfoContainer,
  InfoSegment,
  IconContainer,
  ItemHeader,
  MyIcon,
  InfoDescription,
  TrainingDetailsContainer,
  TrainingDetailsColumn,
  TrainingHeader,
  TrainingInfo,
  SidebarContainer,
  SidebarHeader,
  AttendeeList,
  AttendeeItem,
  HostLabel,
  AttendeeImage,
  AttendeeInfo,
  AttendeeName,
  FollowingLabel,
  ChatContainer,
  ChatHeader,
  ChatTextArea,
  ChatContent,
  CommentInputContainer,
  CommentItem,
  CommentAvatar,
  CommentContent,
  CommentAuthor,
  CommentMetadata,
  CommentText,
  Message,
  ChatList,
  UserMessage,
  OtherUserMessage,
  ItemUserName,
  ItemImage,
};
