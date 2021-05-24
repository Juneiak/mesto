export default class Card {
    constructor({cardData, isAuthor, isLiked, handleCardClick, handleDeleteButtonClick, handleLikeClick}, templateSelector) {
        this._photoLink = cardData['link'];
        this._placeName = cardData['name'];
        this._likes = cardData['likes'];
        this._cardId = cardData['_id']
        this._isAuthor = isAuthor;
        this._isLiked = isLiked;
        this._handleCardClick = handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._handleLikeClick = handleLikeClick;
        this._templateSelector = templateSelector;
    }
    
    _addCardInfo() {
      this._imageElement = this._photoElement.querySelector('.element__image');
      this._imageElement.src = this._photoLink;
      this._imageElement.alt = `фотография ${this._placeName}`;
      this._photoElement.querySelector('.element__place-name').textContent = this._placeName;  
    }

    _addDeleteButtonListener() {
      const deleteButton = this._photoElement.querySelector('.element__delete-button');
      deleteButton.classList.remove('element__delete-button_hidden');

      const cardDataToDelete = {
        card: deleteButton.closest('.element'),
        cardId: this._cardId
      };
      deleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClick(cardDataToDelete);
      });
    };

    _addLikeListener() {
      const numberOflikes = this._photoElement.querySelector('.element__like-amount');
      const likeButton = this._photoElement.querySelector('.element__like-button');
      
      numberOflikes.textContent = this._likes.length;
      if (this._isLiked) {
        likeButton.classList.add('element__like-button_active');
      };
      
      likeButton.addEventListener('click', evt => {
        const like = evt.target.classList;
        let likeStatus;

        if (like.contains('element__like-button_active')) {
          like.remove('element__like-button_active');
          likeStatus = false;
        } else {
          like.add('element__like-button_active');
          likeStatus = true;
        };
        this._handleLikeClick(likeStatus, numberOflikes, this._cardId);
    });
    };

    _addListeners() {
      //like
      this._addLikeListener();

      //image popup
      this._imageElement.addEventListener('click', () => {
        this._handleCardClick(this._photoLink, this._placeName);
      });

      //delete button
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
      this._addCardInfo();
      this._addListeners();
      return this._photoElement;
    };
};