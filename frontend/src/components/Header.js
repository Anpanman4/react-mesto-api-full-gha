import React from "react";

import logo from "../images/logo.svg"
import burger from "../images/burger.svg"
import close from "../images/Close-Icon.svg"

function Header({altText, burgerClicked, handleBurgerClick, children}) {
  return (
    <>
      {
      burgerClicked &&
      <div className="header__container-mobile">
        {children}
      </div>
      }
      <header className="header">
        <img src={logo} className="header__logo" alt={altText} />
        <div className="header__container">
          {children}
        </div>
        {
          burgerClicked ?
          <img src={close} alt="Открыть бургер" className="header__close-button" onClick={() => handleBurgerClick(false)} /> :
          <img src={burger} alt="Закрыть бургер" className="header__burger" onClick={() => handleBurgerClick(true)} />
        }
      </header>
    </>
  )
}

export default Header