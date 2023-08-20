import React from "react";
import "./Search.css";
import useDebounce from "../../hooks/useDebounce";

function Search({ updateSearchTerm }) {
  const debounceUpdateSearch=useDebounce((e)=> updateSearchTerm(e.target.value))
  return (
    <input
      id="search-pokemon"
      placeholder="Which Pokemon are you looking for?"
      type="text"
      onChange={debounceUpdateSearch}
    />
  );
}

export default Search;
