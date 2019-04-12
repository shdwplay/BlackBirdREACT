import React from "react";
import searchIcon from "../assets/search.svg";
import closeIcon from "../assets/ics.svg";
import "./Search.css";

const Search = props => {
  if (props.searchToggle) {
    let searchbar = document.getElementById("searchinput");
    setTimeout(() => {
      searchbar.focus();
    }, 200);
  }
  return (
    <div className={props.searchToggle ? "Search Search-input-open" : "Search"}>
      <input
        id="searchinput"
        className={
          props.searchToggle ? "Search-input-shown" : "Search-input-hidden"
        }
        value={props.querystr}
        type="text"
        onChange={e => props.setQueryString(e.target.value.toLowerCase())}
        placeholder="Start typing.."
      />
      {props.searchToggle ? (
        <img
          className="Search-img"
          src={closeIcon}
          alt="close"
          onClick={props.openSearch}
        />
      ) : (
        <img
          className="Search-img topsomething"
          src={searchIcon}
          alt="search"
          onClick={props.openSearch}
        />
      )}
    </div>
  );
};

export default Search;

//className= {(props.searchToggle) ? 'Search Search-shown' : 'Search Search-hidden'}
