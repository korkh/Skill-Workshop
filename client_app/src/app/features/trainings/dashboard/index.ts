import { Link } from "react-router-dom";
import styled from "styled-components";

/** TrainingFilters */
const FiltersContainer = styled.div`
  width: 100%;
  margin: 4vh 0 5px 15px;
`;

const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: teal;
  color: white;
  padding: 5px;
  margin-bottom: 10px;
  & p {
    margin-left: 10px;
  }
`;

const FiltersDropdown = styled.select`
  padding: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  width: 100%;
`;

const FilterItem = styled.option`
  background-color: ${(props) =>
    props.selected ? "lightgray" : "transparent"};
`;

const DatePickerWrapper = styled.option`
  width: 100%;
`; //training filters

/** TrainingListItemPlaceholder */
const PlaceholderContainer = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  background: transparent;
  color: #fff;
  display: flex;
  width: 40%;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(18px);
  backdrop-filter: brightness(1.2);

  @media (max-width: 990px) {
    position: relative;
    width: 100%;
    right: 0;
    padding: 5px;
    margin-bottom: 2.5vh;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(0);
    backdrop-filter: brightness(1.2);
  }
`;

interface SegmentGroup {
  $flex?: number;
  $bgcolor?: string;
  $bdrcolor?: string;
}

const SegmentGroup = styled.div<SegmentGroup>`
  background-color: ${({ $bgcolor }) => ($bgcolor ? $bgcolor : "transparent")};
  border: 1px solid ${({ $bdrcolor }) => ($bdrcolor ? $bdrcolor : "#ccc")};
  border-radius: 5px;
  padding: 0;
  flex: ${({ $flex }) => ($flex ? $flex : 1)};
  width: 100%;

  @media (max-width: 768px) {
    flex: 2;
    width: 80vw;
  }
`;

interface SegmentProps {
  $reduced?: boolean;
  $flexDirection?: string;
}

const Segment = styled.div<SegmentProps>`
  padding: 1em;
  height: ${({ $reduced }) => ($reduced ? "50px" : "auto")};
  border-bottom: ${({ $reduced }) => ($reduced ? "none" : "1px solid #d4d4d5")};
  flex-direction: ${({ $flexDirection }) =>
    $flexDirection ? $flexDirection : "row"};
  width: 100%;
`;

const PlaceholderHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  min-height: 100px;
`;

const PlaceholderLine = styled.div<{ width?: string }>`
  background: #f3f3f4;
  height: 12px;
  width: ${({ width }) => (width ? width : "100%")};
  margin: 0.5em 0;
`;

const PlaceholderButton = styled.button`
  background-color: green;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  float: right;
  cursor: not-allowed;
`; //Training List Item Placeholder

/** TRaining List Item */
const ItemGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

interface UserNameProps {
  $fontSize?: string;
}

const ItemUserName = styled(Link)<UserNameProps>`
  font-size: ${(props) => (props.$fontSize ? props.$fontSize : "16px")};
  margin-left: 10px;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const ItemDescription = styled.div`
  color: #555;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface LabelProps {
  $bgcolor?: string;
  $isSmallScreen?: boolean;
}

const Label = styled.div<LabelProps>`
  background-color: ${({ $bgcolor }) => ($bgcolor ? $bgcolor : "transparent")};
  color: #fff;
  padding: 5px;
  border-radius: 3px;
  margin-top: 5px;
`;

const IconContainer = styled.span`
  margin-right: 5px;
`;

const SegmentDescription = styled.div`
  margin-bottom: 5px;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonLink = styled(Link)`
  background-color: green;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 5px 20px;
  text-decoration: none;
  &:hover {
    background-color: lightgreen;
    color: #fff;
  }
`; //end

/** TrainingDashboard */
interface GridProps {
  $isSmallScreen?: boolean;
}
const GridContainer = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${({ $isSmallScreen }) =>
    $isSmallScreen ? "1fr" : "1fr 3fr"};
  grid-gap: ${({ $isSmallScreen }) => ($isSmallScreen ? "0" : "2.5vw")};
  padding-top: ${({ $isSmallScreen }) => ($isSmallScreen ? "0" : "2.5vh")};
  margin-top: 0;
`;

const GridSidebar = styled.div`
  grid-column: 1 / 2;
`;

const GridSideBarMobile = styled.div`
  max-width: 95%;
  padding: 0 10px 2vh 0;
`;

const GridMainContent = styled.div<GridProps>`
  grid-column: ${({ $isSmallScreen }) => ($isSmallScreen ? "1 / 2" : "2 / 3")};
`;

const GridLoadingContainer = styled.div`
  grid-column: 2 / 3;
`; // TrainingDashboard

/** TrainingListItemAttendee */
const ListWrapper = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li<{ $following: boolean }>`
  position: relative;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border: ${({ $following }) => ($following ? "3px solid orange" : "none")};
  border-radius: 50%; /* Make it a circle */

  @media (max-width: 768px) {
    width: 40px;
  }
`;

const UserImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 50%;
`;

const PopupContent = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: -60px;
  right: -5px;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
  z-index: 999;

  @media (max-width: 768px) {
    /* left: calc(var(--index)*4); */
    right: unset;
    bottom: -30px;
  }
`;

const ListItemLink = styled(Link)`
  text-decoration: none;
`; // TrainingListItemAttendee

const TrainingListHeader = styled.h3`
  text-align: left;
  margin-bottom: 5px;
  color: teal;
`;

export {
  TrainingListHeader,
  PopupContent,
  ListItemLink,
  ListWrapper,
  ListItem,
  UserImage,
  GridContainer,
  GridSidebar,
  GridMainContent,
  GridLoadingContainer,
  IconContainer,
  SegmentDescription,
  ButtonLink,
  ButtonContainer,
  LabelContainer,
  Label,
  ItemDescription,
  ItemGroup,
  ItemContent,
  ItemImage,
  ItemUserName,
  FiltersContainer,
  FiltersHeader,
  FiltersDropdown,
  FilterItem,
  DatePickerWrapper,
  PlaceholderContainer,
  PlaceholderHeader,
  PlaceholderLine,
  Segment,
  SegmentGroup,
  PlaceholderButton,
  GridSideBarMobile,
};
