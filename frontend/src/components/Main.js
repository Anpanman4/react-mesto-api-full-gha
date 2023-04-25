import React from "react";
import Card from "./Card.js";

import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Main({
  cards,
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  setSelectedCard,
  onCardLike,
  onCardDislike,
  handleCardDelete
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-cover" onClick={() => handleEditAvatarClick(true)}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактирование" onClick={() => handleEditProfileClick(true)}></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить карточку" onClick={() => handleAddPlaceClick(true)}></button>
      </section>

      <section>
        <ul className="elements">
          {
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={setSelectedCard}
                onCardLike={onCardLike}
                onCardDislike={onCardDislike}
                handleCardDelete={handleCardDelete}
              />
            ))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main