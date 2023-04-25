import React from "react";

import PopupWithForm from './PopupWithForm.js'

function AddPlacePopup({isOpen, onClose, addNewCard}) {

  const [ name, setName ] = React.useState('')
  const [ link, setLink ] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewCard({
      name,
      link
    });
  }

  const onChangeName = (e) => {
    setName(e.target.value)
  }

  const onChangeLink = (e) => {
    setLink(e.target.value)
  }

  return (
    <PopupWithForm name="add" title="Новое место" isOpen={isOpen} onClose={onClose}>
      <form className="popup__form" name="new-card" onSubmit={handleSubmit} noValidate>
        <section className="popup__section">
          <input className="popup__field popup__field_type_name" type="text" name="name" onChange={onChangeName} placeholder="Название" autoComplete="off" required minLength="2" maxLength="30" />
          <span className="popup__field-error"></span>
        </section>
        <section className="popup__section">
          <input className="popup__field popup__field_type_image" type="url" name="link" onChange={onChangeLink} placeholder="Ссылка на картинку" autoComplete="off" required />
          <span className="popup__field-error"></span>
        </section>
        <button className="popup__save-button">Создать</button>
      </form>
    </PopupWithForm>
  )
}

export default AddPlacePopup