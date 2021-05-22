export default class API {
  constructor(options) {
    this._options = options;
  }


  _checkStatus(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Error: ${res.status}`)
    }
  }

  getUserProfileData() {
    const userProfileData = fetch(`${this._options.baseUrl}/users/me`, {
      method: 'GET',
      headers: this._options.headers
    })
      .then(this._checkStatus)
      .catch(err => {
        console.log(err)
      })
    return userProfileData
  };

  getInitialCards() {
    const initialCards = fetch(`${this._options.baseUrl}/cards`, {
      method: 'GET',
      headers: this._options.headers
    })
      .then(this._checkStatus)
      .catch(err => {
        console.log(err)
      })
    return initialCards
  };

  editPrifile(dataForEdit) {
    const newProfileData = fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: dataForEdit['name'],
        about: dataForEdit['about']
      })
    })
      .then(this._checkStatus)
      .catch(err => {
        console.log(err)
      })
    return newProfileData
  }

  addCard(dataForAdd) {
    const newCard = fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: dataForAdd['name'],
        link: dataForAdd['link']
      })
    })
      .then(this._checkStatus)
      .catch(err => {
        console.log(err)
      })
    return newCard
  }

};