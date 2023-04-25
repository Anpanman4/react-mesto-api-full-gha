import React from "react";

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <img className="popup__image" src={card?.link} alt="" />
        <h2 className="popup__text">{card?.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup