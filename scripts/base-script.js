const editPopUp = document.querySelector('#edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const editPopUpCloseButton = document.querySelector('#close-edit');
const editFormElement = document.querySelector('#edit-form');
const nameInput = document.querySelector('#name');
const aboutInput = document.querySelector('#about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

function openEditPopUp() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  editPopUp.classList.add('pop-up_opened');
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

editFormElement.addEventListener('submit', editFormSubmitHandler);
profileEditButton.addEventListener('click', openEditPopUp);
editPopUpCloseButton.addEventListener('click', () => closePopUp(editPopUp));




const addPopUp = document.querySelector('#add');
const photoAddButton = document.querySelector('.profile__add-button');
const addFormElement = document.querySelector('#add-form');
const addPopUpCloseButton = document.querySelector('#close-add');
const photoPopUpCloseButton = document.querySelector('#photo-close');
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

function addNewPhotos(database) {
  for (let i = 0; i < database.length; i++) {
    let photoElement = elementTemplate.querySelector('.element').cloneNode(true);
    photoElement.querySelector('.element__image').src = database[i].link;
    photoElement.querySelector('.element__image').alt = `фотография ${database[i].name}`;
    photoElement.querySelector('.element__place-name').textContent = database[i].name;
    let likeButton = photoElement.querySelector('.element__like-button');
    likeButton.addEventListener('click', evt => evt.target.classList.toggle('element__like-button_active'));
    photoElement = addDeleteButton(photoElement);
    
    let imagePopUp = photoElement.querySelector('.element__image');
    imagePopUp.addEventListener('click', () => {
      let photoPopUp = document.querySelector('#photo');
      photoPopUp.classList.add('pop-up_opened');
      let popUpImage = document.querySelector('.pop-up__image')
      popUpImage.src = database[i].link
      let popUpCapture = document.querySelector('.pop-up__caption')
      popUpCapture.textContent = database[i].name;
    });

    elementsTable.prepend(photoElement);
  }
}
addNewPhotos(initialCards)


function addFormSubmitHandler(evt) {
  evt.preventDefault();
  let photoElement = elementTemplate.querySelector('.element').cloneNode(true);
  let linkInput = document.querySelector('#card-link');
  let photoNameInput = document.querySelector('#card-name');

  photoElement.querySelector('.element__image').src = linkInput.value;
  photoElement.querySelector('.element__image').alt = `фотография ${photoNameInput.value}`;
  photoElement.querySelector('.element__place-name').textContent = photoNameInput.value;
  photoElement = addDeleteButton(photoElement)
  elementsTable.prepend(photoElement)
  closePopUp(addPopUp);
}

function addDeleteButton(element) {
  let deleteButton = element.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', () => deleteButton.closest('.element').remove());
  return element
}

addFormElement.addEventListener('submit', addFormSubmitHandler);
photoAddButton.addEventListener('click', () => addPopUp.classList.add('pop-up_opened'));
addPopUpCloseButton.addEventListener('click', () => closePopUp(addPopUp));

let photoPopUp = document.querySelector('#photo');
photoPopUpCloseButton.addEventListener('click', () => closePopUp(photoPopUp));

