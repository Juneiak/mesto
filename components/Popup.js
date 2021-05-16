export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  };

  open() {
    this._popup.classList.add('pop-up_opened');
    
  };

  close() {
    this._popup.classList.remove('pop-up_opened');
  }
  

  setEventListeners() {
    const closeButton = this._popup.querySelector('.pop-up__close-button');
    closeButton.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (evt) => this._handlerEcsClose(evt));
    this._popup.addEventListener('click', (evt) => this._handlerOverlayClose(evt));
  }

  _handlerEcsClose(evt) {
    if (evt.key == 'Escape') {
      this.close();
    };
  };

  _handlerOverlayClose(evt) {
    if (evt.target.classList.contains('pop-up_opened')) {
      this.close();
    };
  };
};