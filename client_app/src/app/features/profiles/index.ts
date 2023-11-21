import { Link } from "react-router-dom";
import styled from "styled-components";

/** Profile Card */
const CardWrapper = styled(Link)`
  width: calc(var(--index) * 8);
  border: 1px solid #ccc;
  margin: 5px 10px;
  border-radius: 8px;
  padding: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  @media (max-width: 768px) {
    width: calc(var(--index) * 15);
  }
`;

const CardImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const CardHeader = styled.h3`
  font-size: 1.5em;
  margin: 5px 0;
  text-align: center;
  justify-items: center;
`;

const CardDescription = styled.p`
  font-size: 1.2rem;
  margin: 5px 0;
  text-align: center;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  color: grey;
`; // Profile Card

/** Follow Button */
interface FollowButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const CustomFollowButton = styled.button<FollowButtonProps>`
  width: 100%;
  padding: 0.3rem 0;
  background-color: teal;
  color: white;
  border: none;
  height: calc(var(--index) * 2);
  cursor: pointer;
`;

interface HiddenButtonProps {
  $following?: boolean;
}

const CustomFollowHiddenButton = styled(CustomFollowButton)<HiddenButtonProps>`
  background-color: ${({ $following }) => ($following ? "red" : "green")};
  height: calc(var(--index) * 2);
  position: relative;
  width: 100%;
  display: none;
`;

const FollowButtonWrapper = styled.div`
  display: inline-block;
  width: 100%;
  &:hover {
    ${CustomFollowButton} {
      display: none;
    }

    ${CustomFollowHiddenButton} {
      display: block;
    }
  }
`; //Follow button

const Segment = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
`;

const ItemGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: calc(var(--index) * 8);
  height: calc(var(--index) * 8);
`;

const ItemContent = styled.div`
  margin-left: 20px;
`;

const DisplayName = styled.h1`
  font-size: 24px;
`;

const StatisticGroup = styled.div`
  display: block;
  justify-content: space-between;
`;

const StatisticItem = styled.div`
  text-align: center;
`;

const StatisticInfo = styled.div`
  margin: calc(var(--index) * 0.7) 0;
  font-size: calc(var(--index));
`;

const StatisticInfoHeader = styled.div`
  font-size: calc(var(--index) * 0.7);
  font-weight: bold;
  color: grey;
`;

const FollowSegment = styled.div`
  margin-top: calc(var(--index) * 1.5);
`; //Profile Header

/** Profile Content */
const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TabContent = styled.div`
  flex: 1;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
`;

const TabItem = styled.div<{ $active: boolean }>`
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: ${(props) => (props.$active ? "2px solid teal" : "none")};
  font-weight: ${(props) => (props.$active ? "bold" : "none")};
`; //PRofile Content

/** Tab Followings  */
const PaneContainer = styled.div`
  background-color: #fff;
  border: 1px solid #d4d4d5;
  border-radius: 0.28571429rem;
  padding: 1em;
`;

const PaneHeader = styled.h2`
  font-size: 1.5em;
  margin-bottom: 1em;
  margin-left: 0.6em;
`;

const PaneCardGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5em;
  gap: 0.2em;
`;

export {
  PaneContainer,
  PaneHeader,
  PaneCardGroup,
  TabContainer,
  TabContent,
  Tabs,
  TabItem,
  StatisticInfo,
  StatisticInfoHeader,
  Segment,
  Grid,
  ItemGroup,
  Avatar,
  ItemContent,
  DisplayName,
  StatisticGroup,
  StatisticItem,
  FollowSegment,
  CustomFollowButton,
  CustomFollowHiddenButton,
  FollowButtonWrapper,
  CardWrapper,
  CardImage,
  CardHeader,
  CardFooter,
  CardDescription,
};
