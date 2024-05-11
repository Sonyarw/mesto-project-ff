// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const container = document.querySelector(".content");
const cardsContainer = container.querySelector(".places__list");

// @todo: Функция создания карточки
const createCard = (cardData, onDelete) => {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => onDelete(cardElement));

  return cardElement;
};

// @todo: Перебираем массив
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  cardsContainer.append(cardElement);
});

// @todo: Функция удаления карточки 
function deleteCard(cardElement) {
  cardElement.remove();
}
