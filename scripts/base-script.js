const editPopUp = document.querySelector('#edit');
const addPopUp = document.querySelector('#add');
const photoPopUp = document.querySelector('#photo');
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
const elementTemplate = document.querySelector('#element').content;
const elementsTable = document.querySelector('.elements__table');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopUp(popUp) {
  popUp.classList.add('pop-up_opened');
}

function closePopUp(popUp) {
  popUp.classList.remove('pop-up_opened');
}

function editFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopUp(editPopUp);
}

function addPhotos(database) {
  database.forEach( (item) => {
    let photoLink = item.link;
    let placeName = item.name;
    let cardElement = getCardElement(photoLink, placeName);
    renderCard(cardElement, elementsTable)
  })
}
addPhotos(initialCards);

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  let photoLink = document.querySelector('#card-link').value;
  let placeName = document.querySelector('#card-name').value;
  let cardElement = getCardElement(photoLink, placeName);
  renderCard(cardElement, elementsTable)
  closePopUp(addPopUp);
}

function getCardElement(link, name) {
  let photoElement = elementTemplate.querySelector('.element').cloneNode(true);
  addContent(photoElement, link, name)
  addLikeButton(photoElement)
  addDeleteButton(photoElement);
  addImagePopUp(photoElement, link, name);
  return photoElement;

  function addContent(element, photoLink, placeName) {
    let imageElement = element.querySelector('.element__image');
    imageElement.src = photoLink;
    imageElement.alt = `фотография ${placeName}`;
    element.querySelector('.element__place-name').textContent = placeName;
    return element;
  }

  function addLikeButton(element) {
    element.querySelector('.element__like-button').addEventListener('click', evt => {
      evt.target.classList.toggle('element__like-button_active');
    })
  }

  function addDeleteButton(element) {
    const deleteButton = element.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', () => deleteButton.closest('.element').remove());
  }

  function addImagePopUp(element, photoLink, placeName) {
    const popUp = element.querySelector('.element__image');
    popUp.addEventListener('click', () => {
      let imageElement = document.querySelector('.pop-up__image')
      openPopUp(document.querySelector('#photo'));
      imageElement.src = photoLink;
      imageElement.alt = `фотография ${placeName}`;
      document.querySelector('.pop-up__caption').textContent = placeName;
    })
    return element;
  }
}

function renderCard(data, wrap) {
  wrap.prepend(data); 
}

editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopUp(editPopUp);
  }
);
photoAddButton.addEventListener('click', () => openPopUp(addPopUp));
editPopUpCloseButton.addEventListener('click', () => closePopUp(editPopUp));
addPopUpCloseButton.addEventListener('click', () => closePopUp(addPopUp));
photoPopUpCloseButton.addEventListener('click', () => closePopUp(photoPopUp));