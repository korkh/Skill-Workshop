import { Link } from "react-router-dom";
import styled from "styled-components";

/** TrainingFilters */
const FiltersContainer = styled.div`
  width: 100%;
  margin: 23px 0 5px 0;
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
  background: #f0f0f0;
  border-radius: 4px;
  margin-top: 25px;
  display: flex;
`;

interface SegmentGroup {
  $flex?: number;
  $bgcolor?: string;
  $bdrcolor?: string;
}

const SegmentGroup = styled.div<SegmentGroup>`
  background-color: ${(props) => (props.$bgcolor ? props.$bgcolor : "#fff")};
  border: 1px solid ${(props) => (props.$bdrcolor ? props.$bdrcolor : "#ccc")};
  border-radius: 5px;
  padding: 0;
  flex: ${(props) => (props.$flex ? props.$flex : 1)};

  @media (max-width: 768px) {
    flex: 2;
  }
`;

interface SegmentProps {
  $reduced?: boolean;
}

const Segment = styled.div<SegmentProps>`
  padding: 1em;
  height: ${(props) => (props.$reduced ? "40px" : "135px")};
  border-bottom: ${(props) => (props.$reduced ? "none" : "1px solid #d4d4d5")};
  width: 100%;

  @media (max-width: 768px) {
    height: 80px;
  }
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
  flex: 1;
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
}

const Label = styled.div<LabelProps>`
  background-color: ${(props) =>
    props.$bgcolor ? props.$bgcolor : "transparent"};
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
`;

export {
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
};
