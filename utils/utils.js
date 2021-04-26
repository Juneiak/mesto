export function closeByEsc(evt) {
if (evt.key === 'Escape') {
    const openPopUp = document.querySelector('.pop-up_opened');
    closePopUp(openPopUp);
};
};

export function openPopUp(popUp) {
    popUp.classList.add('pop-up_opened');
    document.addEventListener('keydown', closeByEsc);
  };

export function closePopUp(popUp) {
popUp.classList.remove('pop-up_opened');
document.removeEventListener('keydown', closeByEsc);
};