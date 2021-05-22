export const photoPopupSelector = '#photo';
export const editPopupSelector = '#edit';
export const addPopupSelector = '#add';
export const profileEditButton = document.querySelector('.profile__edit-button');
export const photoAddButton = document.querySelector('.profile__add-button');
export const editPopUpCloseButton = document.querySelector('#close-edit');
export const addPopUpCloseButton = document.querySelector('#close-add');
export const photoPopUpCloseButton = document.querySelector('#photo-close');
export const editFormElement = document.querySelector('#edit-form');
export const addFormElement = document.querySelector('#add-form');
export const nameInput = document.querySelector('#name');
export const aboutInput = document.querySelector('#about');
export const profileNameSelector = '.profile__name';
export const profileAboutSelector = '.profile__about';
export const profileAvatarSelector = '.profile__avatar';
export const cardsTableSelector = '.elements__table';
export const popups = Array.from(document.querySelectorAll('.pop-up'));
export const cardTemplateSelector = '.element';


export const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: '3014e336-ab57-4b21-b9d4-747bb8ba5538',
    'Content-Type': 'application/json'
  }
}


export const settings = {
  fieldSetSelector: '.pop-up__form-container',
  inputSelector: '.pop-up__form-text-input',
  submitButtonSelector: '.pop-up__form-button',
  inactiveButtonClass: 'pop-up__form-button_inactive',
  inputErrorClass: 'pop-up__form-text-input_type_error',
  errorClass: 'pop-up__error_visible'
};

