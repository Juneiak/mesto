import Popup from '../components/Popup.js';

export default class PopupWithButton extends Popup {
  constructor({popupSelector, clickHandler}) {
    super(popupSelector);
    this._clickHandler = clickHandler;
    this._button = this._popup.querySelector('#button');
    this._shimHandler = () => this._clickHandler(this._item);
  }

  open(item) {
    super.open();
    this._item = item;
    this._button.addEventListener('click', this._shimHandler);
  };

  close() {  
    super.close();
    this._button.removeEventListener('click', this._shimHandler);
  };
  
};