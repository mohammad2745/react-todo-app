import React from "react";
import { Filter } from "../types";

interface FilterButtonsProps {
  currentFilter: Filter;
  setFilter: (filter: Filter) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  currentFilter,
  setFilter,
}) => {
  const filters = [
    { key: Filter.ALL, label: "All" },
    { key: Filter.ACTIVE, label: "Active" },
    { key: Filter.COMPLETED, label: "Completed" },
  ];

  return (
    <div className="flex items-center justify-center space-x-2">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            currentFilter === key
              ? "bg-accent text-white"
              : "text-text-secondary hover:bg-border-color hover:text-text-primary"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
