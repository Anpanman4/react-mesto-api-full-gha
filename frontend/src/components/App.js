import React, {useEffect, useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

import '../index.css'

import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js"
import Login from "./Login.js"
import Register from "./Register.js"
import ImagePopup from "./ImagePopup.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import InfoTooltip from "./InfoTooltip.js";

import api from "../utils/api.js"
import apiAuth from "../utils/apiAuth.js"

import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import ProtectedRoute from "./ProtectedRoute.js"

function App() {
  const [ isOpenPopupEdit, setIsOpenPopupEdit ] = React.useState(false);
  const [ isOpenPopupAdd, setIsOpenPopupAdd ] = React.useState(false);
  const [ isOpenPopupAvatar, setIsOpenPopupAvatar ] = React.useState(false);
  const [ isOpenPopupDelete, setIsOpenPopupDelete ] = React.useState(false);
  const [ isOpenPopupInfo, setIsOpenPopupInfo ] = React.useState(false);

  const [ isSuccess, setIsSuccess ] = React.useState(true)
  const [ selectedCard, setSelectedCard ] = React.useState(null);

  const [ isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [ userEmail, setUserEmail ] = React.useState("");
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ cards, setCards ] = React.useState([]);

  const [ burgerClicked, setBurgerClicked ] = useState(false)

  const navigate = useNavigate();

  const closeAllPopups = () => {
    setIsOpenPopupEdit(false);
    setIsOpenPopupAdd(false);
    setIsOpenPopupAvatar(false);
    setIsOpenPopupDelete(false);
    setIsOpenPopupInfo(false);
    setSelectedCard(null);
  }

  const onCardLike = (id) => {
    api.doLike(id)
    .then((newCard) => {
      const newCards = cards.map((card) => {
        return card._id === newCard._id ? newCard : card;
      });
      setCards(newCards);
    })
    .catch((err) => console.log(err))
  }

  const onCardDislike = (id) => {
    api.deleteLike(id)
    .then((newCard) => {
      const newCards = cards.map((card) => {
        return card._id === newCard._id ? newCard : card;
      })
      setCards(newCards);
    })
    .catch((err) => console.log(err))
  }

  const deleteCard = (id) => {
    api.deleteCard(id)
    .then(() => {
      const newCards = cards.filter(card => card._id !== id);
      setCards(newCards);
    })
    .catch((err) => console.log(err))
  }

  const handleProfileSubmit = (info) => {
    api.updateUserValues(info)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  const handleAddCardSubmit = (card) => {
    api.createNewCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  const handleAvatarSubmit = (info) => {
    api.updateUserAvatar(info)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  const checkToken = () => {
    const token = localStorage.getItem("token")
    if (token) {
      apiAuth.getUserData(token)
        .then((data) => {
          setUserEmail(data.data.email)
          setIsLoggedIn(true);
          navigate("/");
        })
    }
  }

  // ф-и для авторизации и регистрации
  const handleLogin = (body) => {
    return apiAuth.login(body)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        setUserEmail(body.email);
        setIsLoggedIn(true);
        navigate("/");
      }
    })
    .catch((err) => console.log(err))
  }

  const handleRegister = (body) => {
    return apiAuth.register(body)
    .then(() => {
      setIsSuccess(true);
      setIsOpenPopupInfo(true);
      navigate("/sign-in");
    })
    .catch((err) => {
      setIsSuccess(false);
      setIsOpenPopupInfo(true);
      console.log(err);
    })
  }

  const logout = () => {
    localStorage.clear();
    navigate("/sign-in");
  }

  useEffect(() => {
    if (isLoggedIn) {
      // получаем данные пользователя
      api.getUserValues()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err))

      // получаю карточки с сервера
      api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => console.log(err))
    }
  }, [isLoggedIn])

  useEffect(() => {
    checkToken();
  }, [])

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            exact path='/'
            element={
              <main>
                <Header altText="Логотип Место" burgerClicked={burgerClicked} userEmail={userEmail} handleBurgerClick={setBurgerClicked}>
                  <p className="header__mail">{userEmail}</p>
                  <p className="header__link" onClick={logout}>Выйти</p>
                </Header>
                <ProtectedRoute
                  cards={cards}
                  handleEditAvatarClick={setIsOpenPopupAvatar}
                  handleEditProfileClick={setIsOpenPopupEdit}
                  handleAddPlaceClick={setIsOpenPopupAdd}
                  setSelectedCard={setSelectedCard}
                  onCardLike={onCardLike}
                  onCardDislike={onCardDislike}
                  handleCardDelete={deleteCard}
                  isLoggedIn={isLoggedIn}
                  component={Main}
                />
              </main>
            }
          />
          <Route
            exact path='/sign-in'
            element={
              <main>
                <Header altText="Логотип Место" burgerClicked={burgerClicked} userEmail={userEmail} handleBurgerClick={setBurgerClicked}>
                  <p className="header__link" onClick={() => navigate("/sign-up")}>Регистрация</p>
                </Header>
                <Login
                  handleLogin={handleLogin}
                />
              </main>
            }
          />
          <Route
            exact path='/sign-up'
            element={
              <main>
                <Header altText="Логотип Место" burgerClicked={burgerClicked} userEmail={userEmail} handleBurgerClick={setBurgerClicked}>
                  <p className="header__link" onClick={() => navigate("/sign-in")}>Войти</p>
                </Header>
                <Register
                  handleRegister={handleRegister}
                />
              </main>
            }
          />
        </Routes>

        <Footer />

        <InfoTooltip isOpened={isOpenPopupInfo} onClose={closeAllPopups} isSuccess={isSuccess} />

        <EditProfilePopup isOpen={isOpenPopupEdit} onClose={closeAllPopups} onUpdateUser={handleProfileSubmit} />

        <AddPlacePopup isOpen={isOpenPopupAdd} onClose={closeAllPopups} addNewCard={handleAddCardSubmit} />

        <EditAvatarPopup isOpen={isOpenPopupAvatar} onClose={closeAllPopups} onUpdateAvatar={handleAvatarSubmit} />

        <PopupWithForm name="delete" title="Вы уверены?" isOpen={isOpenPopupDelete} onClose={closeAllPopups}>
          <button className="popup__save-button">Да</button>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
