import './index.css'

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  cardTemplateSelector,
  photoPopupSelector,
  editPopupSelector,
  addPopupSelector,
  cardsTableSelector,
  profileAboutSelector,
  profileNameSelector,
  profileEditButton,
  photoAddButton,
  nameInput,
  aboutInput,
  addFormElement,
  editFormElement,
  settings
} from '../utils/constants.js';


//userInfo
const userInfo = new UserInfo(profileNameSelector, profileAboutSelector);

// create card
const createCard = (item) => {
  const card =  new Card({
    photoLink: item['link'],
    placeName: item['name'],
    handleCardClick: (link, name) => photoPopup.open(link, name)
  },
  cardTemplateSelector);
  const newCard = card.getCardElement();
  cardsList.setItem(newCard);
}

//add card
const cardsList = new Section({
  items: initialCards,
  renderer: item => createCard(item)
  },
  cardsTableSelector
);
cardsList.renderItems();


//popups
const photoPopup = new PopupWithImage(photoPopupSelector);

const addFormPopup = new PopupWithForm({
  popupSelector: addPopupSelector,
  submitHandler: item => {
    createCard(item)
    addFormPopup.close();
  }
});

const editFormPopup = new PopupWithForm({
  popupSelector: editPopupSelector,
  submitHandler: (inputData) => {
    userInfo.setUserInfo(inputData);
    editFormPopup.close();
  }
});


//validate
const validateForm = formElement => {
  const validatedForm = new FormValidator(settings, formElement);
  validatedForm.enableValidation();
  return validatedForm
}
const validatedAddForm = validateForm(addFormElement);
const validatedEditForm = validateForm(editFormElement);


//set listeners
photoPopup.setEventListeners()
addFormPopup.setEventListeners()
editFormPopup.setEventListeners()

profileEditButton.addEventListener('click', () => {
  const userCurrentInfo = userInfo.getUserInfo();
  nameInput.value = userCurrentInfo['name'];
  aboutInput.value = userCurrentInfo['about'];
  validatedEditForm.checkValidation();
  editFormPopup.open();
  }
);

photoAddButton.addEventListener('click', () => {
  validatedAddForm.checkValidation();
  addFormPopup.open();
});