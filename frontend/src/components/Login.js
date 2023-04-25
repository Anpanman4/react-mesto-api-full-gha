import React, { useState } from "react";

function Login({ handleLogin }) {
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

    handleLogin(userData)
    setUserData({email: "", password: ""})
  }

  return (
    <>
      <section className="sign">
        <h1 className="sign__title">Вход</h1>
        <form className="sign__form" noValidate onSubmit={handleSubmit}>
          <input className="sign__input" type="email" name="email" placeholder="Email" autoComplete="off" required minLength="2" maxLength="40" onChange={handleChange} />
          <input className="sign__input" type="password" name="password" placeholder="Пароль" autoComplete="off" required minLength="2" maxLength="40" onChange={handleChange} />
          <button className="sign__button">Войти</button>
        </form>
      </section>
    </>
  )
}

export default Login