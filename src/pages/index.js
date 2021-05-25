import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import PopupWithButton from '../components/PopupWithButton.js';
import {
  cardTemplateSelector,
  photoPopupSelector,
  editPopupSelector,
  deletePopupSelector,
  addPopupSelector,
  avatarChangePopupSelector,
  cardsTableSelector,
  profileAboutSelector,
  profileNameSelector,
  profileAvatarSelector,
  profileEditButton,
  photoAddButton,
  avatarButton,
  nameInput,
  aboutInput,
  addFormElement,
  editFormElement,
  avatarChangeFormElement,
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
  const userId = userInfo.getUserId();
  const isAuthor = cardData['owner']['_id'] === userId ? true : false;
  const isLiked = cardData['likes'].some((liked) => liked['_id'] === userId);

  const card =  new Card({
    isLiked: isLiked,
    isAuthor: isAuthor,
    cardData: cardData,
    handleCardClick: (link, name) => photoPopup.open(link, name),
    handleDeleteButtonClick: (cardDataToDelete) => confirmDeletePopup.open(cardDataToDelete),
    handleLikeClick: (likeStatus, numberOflikes, cardId) => {
      api.likeStatus(cardId, likeStatus)
        .then(updatedCard => {
          numberOflikes.textContent = updatedCard['likes'].length
        })
    }
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

const avatarChangeFormPopup = new PopupWithForm({
  popupSelector: avatarChangePopupSelector,
  loadingText: {off: 'Сохранить', on: 'Сохранение...'},
  submitHandler: (newAvatarUrl) => {
    avatarChangeFormPopup.renderloading(true);
    api.changeAvatar(newAvatarUrl['newAvatarUrl'])
      .then((newProfileData) => {
        userInfo.setUserAvatar(newProfileData);
        avatarChangeFormPopup.close();
        avatarChangeFormPopup.renderloading(false);
      })
  }
})

const confirmDeletePopup = new PopupWithButton({
  popupSelector: deletePopupSelector,
  clickHandler: (cardDataToDelete) => {
    api.deleteCard(cardDataToDelete['cardId'])
      .then(res => {
        cardDataToDelete['card'].remove();
        confirmDeletePopup.close()
      })
      .catch(err => console.log(err))
  }
});

const addFormPopup = new PopupWithForm({
  popupSelector: addPopupSelector,
  loadingText: {off: 'Создать', on: 'Cоздание...'},
  submitHandler: item => {
    addFormPopup.renderloading(true);
    api.addCard(item)
      .then(newCardData => {
        cardsList.setItem(createCard(newCardData));
        addFormPopup.close();
        addFormPopup.renderloading(false);
      })
  }
});

const editFormPopup = new PopupWithForm({
  popupSelector: editPopupSelector,
  loadingText: {off: 'Сохранить', on: 'Сохранение...'},
  submitHandler: (inputData) => {
    editFormPopup.renderloading(true);
    api.editPrifile(inputData)
      .then(editedProfileData => {
        userInfo.setUserInfo(editedProfileData);
        editFormPopup.close();
        editFormPopup.renderloading(false);
      })
  }
});


//validate
const validateForm = formElement => {
  const validatedForm = new FormValidator(settings, formElement);
  validatedForm.enableValidation();
  return validatedForm;
}
const validatedAddForm = validateForm(addFormElement);
const validatedEditForm = validateForm(editFormElement);
const validatedAvatarChangeForm = validateForm(avatarChangeFormElement)

//set listeners
photoPopup.setEventListeners();
addFormPopup.setEventListeners();
editFormPopup.setEventListeners();
confirmDeletePopup.setEventListeners();
avatarChangeFormPopup.setEventListeners();

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

avatarButton.addEventListener('click', () => {
  validatedAvatarChangeForm.checkValidation();
  avatarChangeFormPopup.open();
})