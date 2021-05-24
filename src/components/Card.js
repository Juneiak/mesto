export default class Card {
    constructor({cardData, handleCardClick, handleDeleteButtonClick}, isAuthor = false, templateSelector) {
        this._photoLink = cardData['link'];
        this._placeName = cardData['name'];
        this._likes = cardData['likes'];
        this._cardId = cardData['_id']
        this._isAuthor = isAuthor;
        this._handleCardClick = handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._templateSelector = templateSelector;
    }
    
    _addImageInfo() {
        this._imageElement = this._photoElement.querySelector('.element__image');
        this._imageElement.src = this._photoLink;
        this._imageElement.alt = `фотография ${this._placeName}`;
        this._photoElement.querySelector('.element__place-name').textContent = this._placeName;
        this._photoElement.querySelector('.element__like-amount').textContent = this._likes.length;
    }

    _addDeleteButtonListener() {
      const deleteButton = this._photoElement.querySelector('.element__delete-button');
      deleteButton.classList.remove('element__delete-button_hidden');
      const cardDataToDelete = {
        card: deleteButton.closest('.element'),
        cardId: this._cardId
      }
      deleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClick(cardDataToDelete)
      });
    }

    _addListeners() {
      this._photoElement.querySelector('.element__like-button').addEventListener('click', evt => {
          evt.target.classList.toggle('element__like-button_active');
      });

      this._imageElement.addEventListener('click', () => {
        this._handleCardClick(this._photoLink, this._placeName);
      });

      if (this._isAuthor) {
        this._addDeleteButtonListener()
      }
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