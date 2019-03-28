import React, { Component } from 'react';
import searchIcon from '../assets/search.svg'
import icsIcon from '../assets/ics.svg'
import './Search.css'

class Search extends Component {
  render() {
    return (
      <div className= {(this.props.searchToggle) ? 'Search Search-input-open' : 'Search'}>
        <input
            className= {(this.props.searchToggle) ? 'Search-input-shown' : 'Search-input-hidden'}
            value={this.props.string}
            type="text"
            onChange={this.props.onChange}
            placeholder='Start typing..'
        />
        {(this.props.searchToggle) ?
          <img className="Search-img" src={icsIcon} alt="close" onClick={this.props.openSearch}/> :
          <img className="Search-img topsomething" src={searchIcon} alt="search" onClick={this.props.openSearch}/>
        }
      </div> 
    )
  }
}

export default Search;


//className= {(this.props.searchToggle) ? 'Search Search-shown' : 'Search Search-hidden'}