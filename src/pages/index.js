import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import {
  cardTemplateSelector,
  photoPopupSelector,
  editPopupSelector,
  addPopupSelector,
  cardsTableSelector,
  profileAboutSelector,
  profileNameSelector,
  profileAvatarSelector,
  profileEditButton,
  photoAddButton,
  nameInput,
  aboutInput,
  addFormElement,
  editFormElement,
  settings,
  apiOptions
} from '../utils/constants.js';

//api 
const api = new Api(apiOptions);


//userInfo
const userInfo = new UserInfo(profileNameSelector, profileAboutSelector, profileAvatarSelector);
//userInfo - set info from api
api.getUserProfileData()
  .then(profileData => {
    userInfo.setUserInfo(profileData);
    userInfo.setUserAvatar(profileData);
  })


// create card
const createCard = (cardData) => {
  const card =  new Card({
    photoLink: cardData['link'],
    placeName: cardData['name'],
    handleCardClick: (link, name) => photoPopup.open(link, name)
  },
  cardTemplateSelector);
  const newCard = card.getCardElement();
  return newCard;
}


// cardsList Section initiation
const cardsList = new Section({
  renderer: item => {
    cardsList.setItem(createCard(item))
  },
  containerSelector: cardsTableSelector
});


// add card from api
api.getInitialCards()
  .then(initialCardsData => {
    cardsList.renderItems(initialCardsData);
  });


//popups
const photoPopup = new PopupWithImage(photoPopupSelector);

const addFormPopup = new PopupWithForm({
  popupSelector: addPopupSelector,
  submitHandler: item => {
    api.addCard(item)
      .then(newCardData => {
        
        cardsList.setItem(createCard(newCardData));
      })
    addFormPopup.close();
  }
});

const editFormPopup = new PopupWithForm({
  popupSelector: editPopupSelector,
  submitHandler: (inputData) => {
    api.editPrifile(inputData)
      .then(editedProfileData => {
        userInfo.setUserInfo(editedProfileData)
      })
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