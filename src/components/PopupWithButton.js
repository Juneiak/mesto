import Popup from '../components/Popup.js';

export default class PopupWithButton extends Popup {
  constructor({popupSelector, clickHandler}) {
    super(popupSelector);
    this._clickHandler = clickHandler;
    this._button = this._popup.querySelector('#button');
    this._shimClickHandler = () => this._clickHandler(this._itemData);
  }

  open(itemData) {
    super.open();
    this._itemData = itemData;
    this._button.addEventListener('click', this._shimClickHandler);
  };

  close() {  
    super.close();
    this._button.removeEventListener('click', this._shimClickHandler);
  };
  
};