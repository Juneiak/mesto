export default class UserInfo {
  constructor(profileNameSelector, peofileAboutSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(peofileAboutSelector);
  }

  getUserInfo() {
    const profileName = this._profileName.textContent;
    const profileAbout = this._profileAbout.textContent;
    return {
      name: profileName,
      about: profileAbout
    }
  }

  setUserInfo(profileData) {
    this._profileName.textContent = profileData['name'];
    this._profileAbout.textContent = profileData['about'];
  }

}