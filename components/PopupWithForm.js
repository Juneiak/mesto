import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitHandler}) {
    super(popupSelector);
    this._submitHandler = submitHandler;
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
      this._inputData[inputValue.id] = inputValue.value
    });
  };

  close() {
    super.close();
    const form = this._popup.querySelector('.pop-up__form');
    form.reset()
  }
}