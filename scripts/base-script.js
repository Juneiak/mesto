let popUp = document.querySelector('.pop-up');
let profileEditButton = document.querySelector('.profile__edit-button');
let popUpCloseButton = document.querySelector('.pop-up__close-button');
let formElement = document.querySelector('.pop-up__form');
let nameInput = document.querySelector('#name');
let aboutInput = document.querySelector('#about');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

function openPopUp() {
    
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    popUp.classList.add('pop-up_opened');
}

function closePopUp() {
    popUp.classList.remove('pop-up_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    popUp.classList.remove('pop-up_opened');
}


formElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', openPopUp);
popUpCloseButton.addEventListener('click', closePopUp);
