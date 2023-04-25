import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ handleRegister }) {
  const navigate = useNavigate();

  const [ userData, setUserData ] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      return
    }

    handleRegister(userData)
      .then(() => {
        setUserData({
          email: "",
          password: ""
        })
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <section className="sign">
        <h1 className="sign__title">Регистрация</h1>
        <form className="sign__form" noValidate onSubmit={handleSubmit}>
          <input className="sign__input" type="email" name="email" placeholder="Email" autoComplete="off" required minLength="2" maxLength="40" onChange={handleChange} />
          <input className="sign__input" type="password" name="password" placeholder="Пароль" autoComplete="off" required minLength="2" maxLength="40" onChange={handleChange} />
          <button className="sign__button">Зарегистрироваться</button>
        </form>
        <p className="sign__change">Уже зарегистрированы? <span className="sign__change-button" onClick={() => navigate("/sign-in")}>Войти</span></p>
      </section>
    </>
  )
}

export default Register