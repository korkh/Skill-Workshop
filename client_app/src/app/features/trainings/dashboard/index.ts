import styled from "styled-components";

/** TrainingFilters */
const FiltersContainer = styled.div`
  width: 100%;
  margin: 5px;
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

export {
  FiltersContainer,
  FiltersHeader,
  FiltersDropdown,
  FilterItem,
  DatePickerWrapper,
};
