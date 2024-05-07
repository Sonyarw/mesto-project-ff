// @todo: Функция создания карточки
const addCard = (cardData, onDelete) => {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".song__title").textContent = cardData.name;

  cardContainer.append(cardElement);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    onDelete(cardElement);
  });

  return cardElement;
};
