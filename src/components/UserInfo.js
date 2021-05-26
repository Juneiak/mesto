export default class UserInfo {
  constructor(profileNameSelector, peofileAboutSelector, profileAvatarSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(peofileAboutSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    const profileName = this._profileName.textContent;
    const profileAbout = this._profileAbout.textContent;
    const profileAvatarUrl = this._profileAvatar.src;
    return {
      name: profileName,
      about: profileAbout,
      avatar: profileAvatarUrl
    };
  };

  getUserId() {
    return this._userId;
  };

  setUserInfo(profileData) {
    if (profileData._id) {
      this._userId = profileData['_id']
      this._profileName.textContent = profileData['name'];
      this._profileAbout.textContent = profileData['about'];
    };
  };

  setUserAvatar(profileData) {
    if (profileData.avatar) {
      this._profileAvatar.src = profileData['avatar'];
    };
  };
}