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
  }

  getInitialCards() {
    fetch(this)
  }
}