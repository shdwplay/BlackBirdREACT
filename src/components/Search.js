import React, { Component } from 'react';
import searchIcon from '../assets/search.svg'
import './Search.css'

class Search extends Component {
  render() {
    return (
      <div className="Search Header-search">
        {this.props.toggleOpen && <input
            className="Search-open"
            value={this.props.string}
            type="search"
            onChange={this.props.onChange}
            placeholder='Start typing..'
        />}
        {!this.props.toggleOpen && <img src={searchIcon} alt="search" onClick={this.props.openSearch} />}
      </div>
    )
  }
}

export default Search;