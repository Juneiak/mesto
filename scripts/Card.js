const elementTemplate = document.querySelector('#element').content;
const popUpimage = document.querySelector('.pop-up__image');
const popUpCaption = document.querySelector('.pop-up__caption');
import {openPopUp} from '../utils/utils.js';
import {photoPopUp} from '../utils/constants.js';

export default class Card {
    constructor(photoLink, placeName, templateSelector) {
        this._photoLink = photoLink;
        this._placeName = placeName;
        this._templateSelector = templateSelector;
    }

    _handlerOpenPopUp() {
        popUpimage.src = this._photoLink;
        popUpimage.alt = `фотография ${this._placeName}`;
        popUpCaption.textContent = this._placeName;
        openPopUp(photoPopUp);
    }
    
    _addImageInfo() {
        this._imageElement = this._photoElement.querySelector('.element__image');
        this._imageElement.src = this._photoLink;
        this._imageElement.alt = `фотография ${this._placeName}`;
        this._photoElement.querySelector('.element__place-name').textContent = this._placeName;
    }

    _addListeners() {
        this._photoElement.querySelector('.element__like-button').addEventListener('click', evt => {
            evt.target.classList.toggle('element__like-button_active');
        });

        const deleteButton = this._photoElement.querySelector('.element__delete-button');
        deleteButton.addEventListener('click', () => deleteButton.closest('.element').remove()
        );
        
        this._imageElement.addEventListener('click', () => this._handlerOpenPopUp());
    }
    
    getCardElement() {
        this._photoElement = elementTemplate.querySelector(this._templateSelector).cloneNode(true);
        this._addImageInfo();
        this._addListeners();
        return this._photoElement;
    }
}