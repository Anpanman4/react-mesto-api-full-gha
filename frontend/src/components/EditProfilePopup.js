import React, { useContext } from "react";

import PopupWithForm from './PopupWithForm.js'

import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);

  const [ user, setUser ] = React.useState(currentUser.name)
  const [ about, setAbout ] = React.useState(currentUser.about)

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: user,
      about
    })
  }

  const onChangeName = (e) => {
    setUser(e.target.value)
  }

  const onChangeAbout = (e) => {
    setAbout(e.target.value)
  }

  React.useEffect(() => {
    setUser(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]); 

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} >
      <form className="popup__form" name="personal-information" onSubmit={handleSubmit} noValidate>
        <section className="popup__section">
          <input className="popup__field popup__field_type_name" type="text" name="name" onChange={onChangeName} defaultValue={user} placeholder="Ваше имя" autoComplete="off" required minLength="2" maxLength="40" />
          <span className="popup__field-error"></span>
        </section>
        <section className="popup__section">
          <input className="popup__field popup__field_type_job" type="text" name="about" onChange={onChangeAbout} defaultValue={about} placeholder="Чем занимаетесь" autoComplete="off" required minLength="2" maxLength="200" />
          <span className="popup__field-error"></span>
        </section>
        <button className="popup__save-button">Сохранить</button>
      </form>
    </PopupWithForm>
  )
}

export default EditProfilePopup