const settings = {
  formSelector: '.popup__form',
  fieldSetSelector: '.pop-up__form-container',
  inputSelector: '.pop-up__form-text-input',
  submitButtonSelector: '.pop-up__form-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'pop-up__form-text-input_type_error',
  errorClass: 'popup__error_visible'
}

const showInputError = (fieldSet, inputElement, errorMessage) => {
  const errorElement = fieldSet.querySelector(`${inputElement.id}-error`);
  errorElement.classList.add(settings[errorClass]);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(settings[inputErrorClass]);
};

const hideInputError = (fieldSet, inputElement) => {
  const errorElement = fieldSet.querySelector(`${inputElement.id}-error`);
  errorElement.classList.remove(setting[errorClass])
  errorElement.textContent = '';
  inputElement.classList.remove(settings[inputErrorClass])
};

const checkInputValidity = (fieldSet, inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(fieldSet, inputElement);
  } else {
    showInputError(fieldSet, inputElement);
  }
}

const setEventListeners = fieldSet => {
  const inputElementList = Array.from(fieldSet.querySelectorAll(settings[inputSelector]));
  inputElementList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(fieldSet, inputElement);
    });
  });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(settings[formSelector]));
    formList.forEach(formElement => {
      formElement.addEventListener('submit', evt => {
        evt.preventDefault();
      });
      const fieldSetList = Array.from(formElement.querySelectorAll(settings[fieldSetSelector]));
      fieldSetList.forEach(fieldSet => {
        setEventListeners(fieldSet)
      });
    });
};
