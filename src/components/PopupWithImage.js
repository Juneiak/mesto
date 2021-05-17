import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(photoLink, placeName) {
    const popUpimage = this._popup.querySelector('.pop-up__image');
    const popUpCaption =  this._popup.querySelector('.pop-up__caption');
    popUpimage.src = photoLink;
    popUpimage.alt = `фотография ${placeName}`;
    popUpCaption.textContent = placeName;
    super.open()
  }
}