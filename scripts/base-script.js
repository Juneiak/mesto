let editPopUp = document.querySelector('#edit');
let profileEditButton = document.querySelector('.profile__edit-button');
let editPopUpCloseButton = document.querySelector('#close-edit');
let editFormElement = document.querySelector('#edit-form');
let nameInput = document.querySelector('#name');
let aboutInput = document.querySelector('#about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

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




let addPopUp = document.querySelector('#add');
let photoAddButton = document.querySelector('.profile__add-button');
let addFormElement = document.querySelector('#add-form');
let addPopUpCloseButton = document.querySelector('#close-add');

//function addFormSubmitHandler() {}

//addFormElement.addEventListener('submit', addFormSubmitHandler)
photoAddButton.addEventListener('click', () => {addPopUp.classList.add('pop-up_opened')});
addPopUpCloseButton.addEventListener('click', () => closePopUp(addPopUp));



