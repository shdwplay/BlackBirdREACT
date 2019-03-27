import React, { Component } from 'react'
import './HighlightedCard.css'
import silenceIcon from '../assets/silenceIcon.svg'
import unsilenceIcon from '../assets/unsilenceIcon.svg'
import removeFromFavIcon from '../assets/removeFromFavIcon.svg'
import addToFavIcon from '../assets/addToFavIcon.svg'
import deleteIcon from '../assets/deleteIcon.svg'
import closeXW from '../assets/closeXW.svg'
import PropTypes from 'prop-types'

class HighlightedCard extends Component {
  render() {
    return(
      <div className="HighlightedCard">               
        <div className="HighlightedCard-silence" onClick={this.props.sil}>
          <img src={this.props.silence ? unsilenceIcon : silenceIcon} alt="silence"/>
          <div className="label">{this.props.silence ? 'Unsilence' : 'Silence'}</div>
        </div>
        <div className="HighlightedCard-remove" onClick={this.props.fav}>
          <img src={this.props.favourite ? removeFromFavIcon : addToFavIcon} alt="remove from favourites"/>
          <div className="HighlightedCard-label">{this.props.favourite ? 'Remove From Favourites' : 'Add to Favourites'}</div>
        </div>
        <div className="HighlightedCard-delete" onClick={()=>console.log('delete chat')}>
          <img src={deleteIcon} alt="delete"/>
          <div className="HighlightedCard-label">Delete</div>
        </div>
          <img className="HighlightedCard-close-button" onClick={this.props.high} src={closeXW} alt="close button"/>
      </div>
    )
  }
}

export default HighlightedCard;

HighlightedCard.propTypes = {
  favourite: PropTypes.bool.isRequired,
  silence: PropTypes.bool.isRequired,
}