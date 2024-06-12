export { deleteCard };
export { cardLike };

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

//функция лайка
function cardLike(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
