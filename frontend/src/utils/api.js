class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserValues() {
    return fetch(this._url + "users/me/", {
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  updateUserValues(body) {
    return fetch(this._url + "users/me/", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(body)
    })
    .then(res => this._checkResponse(res))
  }

  updateUserAvatar(body) {
    return fetch(this._url + "users/me/avatar/", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(body)
    })
    .then(res => this._checkResponse(res))
  }

  getInitialCards() {
    return fetch(this._url + "cards/", {
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
  }

  createNewCard(body) {
    return fetch(this._url + "cards/", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(body)
    })
    .then(res => this._checkResponse(res))
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(res => this._checkResponse(res))
  }

  doLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(res => this._checkResponse(res))
  }

  deleteLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(res => this._checkResponse(res))
  }

  getAllPromise () {
    return Promise.all([this.getUserValues(), this.getInitialCards()]);
  }
}

const api = new Api({
  baseUrl: "http://mesto.kondratev.nomoredomains.monster/",
  headers: {
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${localStorage.getItem("token")}`
  }
})

export default api