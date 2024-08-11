import React from "react";
import { SearchBarProps } from "@/components/Input/Input";

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  styleClass = "",
  placeholderText = "Search",
  setSearchText,
}) => {
  const updateSearchInput = (value: string) => {
    setSearchText(value);
  };

  return (
    <div className={"inline-block " + styleClass}>
      <div className="input-group relative flex flex-wrap items-stretch w-full">
        <input
          type="search"
          value={searchText}
          placeholder={placeholderText}
          onChange={(e) => updateSearchInput(e.target.value)}
          className="input input-sm input-bordered w-full max-w-xs"
        />
      </div>
    </div>
  );
};

export default SearchBar;
