let popUp = document.querySelector('.pop-up');
let profileEditButton = document.querySelector('.profile__edit-button');
let popUpCloseButton = document.querySelector('.pop-up__close-button');
let formElement = document.querySelector('.pop-up__form');
let nameInput = document.querySelector('#name');
let aboutInput = document.querySelector('#about');


function OpenPopUp() {
    let profileName = document.querySelector('.profile__name');
    let profileAbout = document.querySelector('.profile__about');
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    popUp.classList.add('pop-up_opened');
}

function ClosePopUp() {
    popUp.classList.remove('pop-up_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    let profileName = document.querySelector('.profile__name');
    let profileAbout = document.querySelector('.profile__about');
    profileName.textContent = `${nameInput.value}`;
    profileAbout.textContent = `${aboutInput.value}`;
    popUp.classList.remove('pop-up_opened');
}


formElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', OpenPopUp);
popUpCloseButton.addEventListener('click', ClosePopUp);
