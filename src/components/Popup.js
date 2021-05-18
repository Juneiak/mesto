export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._shimHandler = (evt) => this._handlerEcsClose(evt)
  };

  open() {
    this._popup.classList.add('pop-up_opened');
    document.addEventListener('keydown', this._shimHandler);
  };

  close() {
    this._popup.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', this._shimHandler);
  }

  setEventListeners() {
    this._popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('pop-up_opened') || evt.target.classList.contains('pop-up__close-button')) {
        this.close()
      };
    });
  }

  _handlerEcsClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
      document.removeEventListener('keydown', this._handlerEcsClose)
    };
  };
};