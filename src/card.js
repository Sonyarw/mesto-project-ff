export { deleteCard };
export { cardLike };
export { createCard };
import { cardTemplate } from "./index.js";

//функция создания карточек
const createCard = (cardData, onDelete) => {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => onDelete(cardElement));

  cardElement.addEventListener("click", cardLike);

  return cardElement;
};

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

