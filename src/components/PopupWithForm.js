import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitHandler, loadingText}) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._loadingText = loadingText;
    this._formButton = this._popup.querySelector('.pop-up__form-button')
  };

  renderloading(status) {
    if (status) {
      this._formButton.textContent = this._loadingText['on']
    } else {
      this._formButton.textContent = this._loadingText['off']
    }
  }

  setEventListeners() {
    super.setEventListeners();
    const form = this._popup.querySelector('.pop-up__form');
    form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._getInputValues()
      this._submitHandler(this._inputData);
    });
  };

  _getInputValues() {
    const inputValues = Array.from(this._popup.querySelectorAll('.pop-up__form-text-input'));
    this._inputData = {}
    inputValues.forEach(inputValue => {
      this._inputData[inputValue.name] = inputValue.value
    });
  };

  close() {
    super.close();
    const form = this._popup.querySelector('.pop-up__form');
    form.reset()
  }
}