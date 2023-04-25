class ApiAuth {
  constructor({ url }) {
    this._url = url
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  login(body) {
    return fetch(`${this._url}signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(res => this._checkResponse(res))
  }

  register(body) {
    return fetch(`${this._url}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(res => this._checkResponse(res))
  }

  getUserData(token) {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => this._checkResponse(res))
  }
}

const apiAuth = new ApiAuth({
  url: "https://auth.nomoreparties.co/"
})

export default apiAuth