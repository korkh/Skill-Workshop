import { observer } from "mobx-react-lite";
import DatePicker from "react-date-picker";
import { useStore } from "../../../stores/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  FilterItem,
  FiltersContainer,
  FiltersDropdown,
  FiltersHeader,
} from ".";
import { useState } from "react";

interface IOptions {
  value: string;
  title: string;
}

const TrainingFilters = observer(() => {
  const {
    trainingStore: { predicate, setPredicate },
  } = useStore();

  const [selectedFilter, setSelectedFilter] = useState("all");
  const options: IOptions[] = [
    { value: "all", title: "All trainings" },
    { value: "isGoing", title: "I'm going" },
    { value: "isHost", title: "I'm hosting" },
  ];

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    setPredicate(value, "true");
  };

  return (
    <FiltersContainer>
      <FiltersHeader>
        <FontAwesomeIcon icon={faFilter} size="sm" />
        <p>Filters</p>
      </FiltersHeader>
      <FiltersDropdown
        value={selectedFilter}
        onChange={(e) => handleFilterChange(e.target.value)}
      >
        {options.map((item, index) => (
          <FilterItem key={index} value={item.value}>
            {item.title}
          </FilterItem>
        ))}
      </FiltersDropdown>
      <DatePicker
        className="date-picker"
        onChange={(date) => setPredicate("startDate", date as Date)}
        value={predicate.get("startDate") || new Date()}
      />
    </FiltersContainer>
  );
});

export default TrainingFilters;
