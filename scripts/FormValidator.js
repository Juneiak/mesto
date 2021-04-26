export const settings = {
    fieldSetSelector: '.pop-up__form-container',
    inputSelector: '.pop-up__form-text-input',
    submitButtonSelector: '.pop-up__form-button',
    inactiveButtonClass: 'pop-up__form-button_inactive',
    inputErrorClass: 'pop-up__form-text-input_type_error',
    errorClass: 'pop-up__error_visible'
  };

export class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    };

    _showInputError(fieldSet, inputElement, errorMessage) {
        const errorElement = fieldSet.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
        inputElement.classList.add(this._settings.inputErrorClass);
    };

    _hideInputError(fieldSet, inputElement) {
        const errorElement = fieldSet.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(this._settings.errorClass);
        inputElement.classList.remove(this._settings.inputErrorClass);
    };

    _checkInputValidity(fieldSet, inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(fieldSet, inputElement);
        } else {
            this._showInputError(fieldSet, inputElement, inputElement.validationMessage);
        };
    };

    _setEventListeners(fieldSet) {
        const inputElementList = Array.from(fieldSet.querySelectorAll(this._settings.inputSelector));
        const buttonElement = fieldSet.querySelector(this._settings.submitButtonSelector);
        this._toggleButtonState(inputElementList, buttonElement);
        inputElementList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(fieldSet, inputElement);
                this._toggleButtonState(inputElementList, buttonElement);
            });
        });
    };

    _hasInvalidInput(inputElementList) {
        return inputElementList.some(inputElement => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState(inputElementList, buttonElement) {
        if (this._hasInvalidInput(inputElementList)) {
            buttonElement.classList.add(this._settings.inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.classList.remove(this._settings.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        };
    };

    enableValidation() {
        const fieldSetList = Array.from(this._formElement.querySelectorAll(this._settings.fieldSetSelector));
        fieldSetList.forEach(fieldSet => {
            this._setEventListeners(fieldSet);
        });
    };

};

export function validate() {
    const formList = Array.from(document.querySelectorAll('.pop-up__form'));
    formList.forEach(formElement => {
        const formForValidate = new FormValidator(settings, formElement);
        formForValidate.enableValidation();
    });
}
validate();
