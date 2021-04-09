const settings = {
  formSelector: '.pop-up__form',
  fieldSetSelector: '.pop-up__form-container',
  inputSelector: '.pop-up__form-text-input',
  submitButtonSelector: '.pop-up__form-button',
  inactiveButtonClass: 'pop-up__form-button_inactive',
  inputErrorClass: 'pop-up__form-text-input_type_error',
  errorClass: 'pop-up__error_visible'
};

const showInputError = (fieldSet, inputElement, errorMessage) => {
  const errorElement = fieldSet.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
  inputElement.classList.add(settings.inputErrorClass);
};

const hideInputError = (fieldSet, inputElement) => {
  const errorElement = fieldSet.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
  inputElement.classList.remove(settings.inputErrorClass);
};

const checkInputValidity = (fieldSet, inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(fieldSet, inputElement);
  } else {
    showInputError(fieldSet, inputElement, inputElement.validationMessage);
  };
};

const setEventListeners = fieldSet => {
  const inputElementList = Array.from(fieldSet.querySelectorAll(settings.inputSelector));
  const buttonElement = fieldSet.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputElementList, buttonElement);
  inputElementList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(fieldSet, inputElement);
      toggleButtonState(inputElementList, buttonElement);
    });
  });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach(formElement => {
      formElement.addEventListener('submit', evt => {
        evt.preventDefault();
      });
      const fieldSetList = Array.from(formElement.querySelectorAll(settings.fieldSetSelector));
      fieldSetList.forEach(fieldSet => {
        setEventListeners(fieldSet);
      });
    });
};

const hasInvalidInput = inputElementList => {
  return inputElementList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputElementList, buttonElement) => {
  if (hasInvalidInput(inputElementList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};

enableValidation();
