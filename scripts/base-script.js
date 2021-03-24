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
    closePopUp();
}

editFormElement.addEventListener('submit', editFormSubmitHandler);
profileEditButton.addEventListener('click', openEditPopUp);
editPopUpCloseButton.addEventListener('click', () => closePopUp(editPopUp));




const addPopUp = document.querySelector('#add');
const photoAddButton = document.querySelector('.profile__add-button');
const addFormElement = document.querySelector('#add-form');
const addPopUpCloseButton = document.querySelector('#close-add');

//function addFormSubmitHandler() {}

//addFormElement.addEventListener('submit', addFormSubmitHandler)
photoAddButton.addEventListener('click', () => {addPopUp.classList.add('pop-up_opened')});
addPopUpCloseButton.addEventListener('click', () => closePopUp(addPopUp));


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


function addPastPhotos(database) {
    const elementTemplate = document.querySelector('#element').content;
    const elementsTable = document.querySelector('.elements__table');
    for (let i = 0; i < database.length; i++) {
        let photoElement = elementTemplate.querySelector('.element').cloneNode(true);
        photoElement.querySelector('.element__image').src = database[i].link;
        photoElement.querySelector('.element__image').alt = `фотография ${database[i].name}`;
        photoElement.querySelector('.element__place-name').textContent = database[i].name;
        elementsTable.prepend(photoElement);
    }
}

addPastPhotos(initialCards)