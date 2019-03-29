import React, { Component } from "react";
import searchIcon from "../assets/search.svg";
import icsIcon from "../assets/ics.svg";
import "./Search.css";

const Search = props => {
  return (
    <div className={props.searchToggle ? "Search Search-input-open" : "Search"}>
      <input
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
          src={icsIcon}
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
