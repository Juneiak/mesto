export default class Card {
    constructor({photoLink, placeName, handleCardClick}, templateSelector) {
        this._photoLink = photoLink;
        this._placeName = placeName;
        this._handleCardClick = handleCardClick;
        this._templateSelector = templateSelector;
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
        deleteButton.addEventListener('click', () => deleteButton.closest('.element').remove());
        
        this._imageElement.addEventListener('click', () => {
          this._handleCardClick(this._photoLink, this._placeName);
        });
    };

    _getTemplate() {
      const elementTemplate = document
      .querySelector('#template')
      .content
      .querySelector(this._templateSelector)
      .cloneNode(true);
      return elementTemplate
    };
    
    getCardElement() {
        this._photoElement = this._getTemplate();
        this._addImageInfo();
        this._addListeners();
        return this._photoElement;
    };
};