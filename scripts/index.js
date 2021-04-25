const editPopUp = document.querySelector('#edit');
const addPopUp = document.querySelector('#add');
export const photoPopUp = document.querySelector('#photo');
const profileEditButton = document.querySelector('.profile__edit-button');
const photoAddButton = document.querySelector('.profile__add-button');
const editPopUpCloseButton = document.querySelector('#close-edit');
const addPopUpCloseButton = document.querySelector('#close-add');
const photoPopUpCloseButton = document.querySelector('#photo-close');
const editFormElement = document.querySelector('#edit-form');
const addFormElement = document.querySelector('#add-form');
const nameInput = document.querySelector('#name');
const aboutInput = document.querySelector('#about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const elementsTable = document.querySelector('.elements__table');
const popUps = Array.from(document.querySelectorAll('.pop-up'));
import {initialCards} from './data.js';
import Card from './Card.js'

function addOverlayClose(popUps) {
  popUps.forEach(popUp => {
    popUp.addEventListener('click', evt => {
      if (evt.target.classList.contains('pop-up_opened')) {
        closePopUp(popUp);
      };
    });
  });
};

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openPopUp = document.querySelector('.pop-up_opened');
    closePopUp(openPopUp);
  };
};

export function openPopUp(popUp) {
  popUp.classList.add('pop-up_opened');
  document.addEventListener('keydown', closeByEsc);
};

function closePopUp(popUp) {
  popUp.classList.remove('pop-up_opened');
  document.removeEventListener('keydown', closeByEsc);
};

function handlerEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopUp(editPopUp);
};

function renderCard(data, wrap) {
  wrap.prepend(data);
};

function addPhotos(database) {
  database.forEach( (item) => {
    const photoLink = item.link;
    const placeName = item.name;
    const card = new Card(photoLink, placeName, '.element');
    const cardElement = card.getCardElement();
    renderCard(cardElement, elementsTable);
  });
};

function handlerAddFormSubmit(evt) {
  evt.preventDefault();
  const photoLink = document.querySelector('#card-link').value;
  const placeName = document.querySelector('#card-name').value;
  const card = new Card(photoLink, placeName, '.element');
  const cardElement = card.getCardElement();
  renderCard(cardElement, elementsTable);
  closePopUp(addPopUp);
  addFormElement.reset();
};

addPhotos(initialCards);
addOverlayClose(popUps);
editFormElement.addEventListener('submit', handlerEditFormSubmit);
addFormElement.addEventListener('submit', handlerAddFormSubmit);
photoAddButton.addEventListener('click', () => openPopUp(addPopUp));
editPopUpCloseButton.addEventListener('click', () => closePopUp(editPopUp));
addPopUpCloseButton.addEventListener('click', () => closePopUp(addPopUp));
photoPopUpCloseButton.addEventListener('click', () => closePopUp(photoPopUp));
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopUp(editPopUp);
  }
);
