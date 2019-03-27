import React, { Component } from 'react';
import searchIcon from '../assets/search.svg'
import icsIcon from '../assets/ics.svg'
import './Search.css'

class Search extends Component {
  render() {
    return (
      <div className="Search Header-search">
        {this.props.searchToggle && <input
            className="Search-open"
            value={this.props.string}
            type="text"
            onChange={this.props.onChange}
            placeholder='Start typing..'
        />}
        {(this.props.searchToggle) ? <img src={icsIcon} alt="close" onClick={this.props.openSearch}/> : <img src={searchIcon} alt="search" onClick={this.props.openSearch}/> }
      </div>
    )
  }
}

export default Search;