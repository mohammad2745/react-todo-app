import React from "react";
import { Filter } from "../types";
import FilterButtons from "./FilterButtons";

interface FooterProps {
  activeCount: number;
  completedCount: number;
  currentFilter: Filter;
  setFilter: (filter: Filter) => void;
  clearCompleted: () => void;
}

const Footer: React.FC<FooterProps> = ({
  activeCount,
  completedCount,
  currentFilter,
  setFilter,
  clearCompleted,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-secondary text-sm text-text-secondary rounded-b-md">
      <span>
        {activeCount} {activeCount === 1 ? "item" : "items"} left
      </span>
      <div className="hidden sm:block">
        <FilterButtons currentFilter={currentFilter} setFilter={setFilter} />
      </div>
      <button
        onClick={clearCompleted}
        className={`hover:text-text-primary transition-opacity ${
          completedCount > 0 ? "opacity-100" : "opacity-0"
        }`}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </div>
  );
};

export default Footer;
