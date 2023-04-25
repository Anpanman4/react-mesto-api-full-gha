import React from "react";

import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

import Trash from "../images/Trash.svg"

function Card({card, onCardClick, onCardLike, onCardDislike, handleCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = currentUser._id === card.owner._id ? true : false;
  const isLiked = card.likes.some(like => like._id === currentUser._id);

  const handleCardClick = () => {
    onCardClick(card)
  }

  const handlerLikeClick = () => {
    isLiked ? onCardDislike(card._id) : onCardLike(card._id);
  }

  return (
    <li className="element">
      {isOwn && <img className="element__trash" src={Trash} alt="удалить" onClick={() => handleCardDelete(card._id)} />}
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick} />
      <div className="element__container">
        <h2 className="element__place">{card.name}</h2>
        <div className="element__like-container">
          <button className={`element__like ${isLiked && "element__like_active"}`} type="button" aria-label="Нравится" onClick={handlerLikeClick}></button>
          <span className="element__likes-number">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card