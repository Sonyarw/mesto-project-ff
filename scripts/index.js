// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const container = document.querySelector(".content");
const cardsContainer = container.querySelector(".places__list");

// @todo: Функция создания карточки
const createCards = (cardData, onDelete) => {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => onDelete(cardElement));

  return cardElement;
};

initialCards.forEach((cardData) => {
  const cardElement = createCards(cardData, onDelete);
  cardsContainer.append(cardElement);
});

function onDelete(cardElement) {
  cardElement.remove();
}

cardsContainer.append(cardElement);
