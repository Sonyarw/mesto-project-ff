import { cardTemplate, openPopupImage } from "./index.js";
import { deleteLikeCard, cardDeleteServer, addLikeCard } from "./api.js";
// фунукия для отображения карточек
export const createCard = (cards, myId, deleteCards) => {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const buttonDeleteCard = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = cards.name;
  cardImage.src = cards.link;
  cardImage.alt = cards.name;

  cardElement.setAttribute("card-id", cards._id);

  const buttonLike = cardElement.querySelector(".card__like-button");
  const numberLikesSpan = cardElement.querySelector(".likes_counter");
  const like = cards.likes; // массив лайков
  const numberLikes = like.length; // находим длинну массива лайков
  numberLikesSpan.textContent = numberLikes; // вставляем эту длину в спан

  buttonLike.addEventListener("click", cardLike);

  if (cards.owner._id !== myId) {
    buttonDeleteCard.remove();
  } else {
    buttonDeleteCard.addEventListener("click", deleteCards);
  }

  like.forEach((likes) => {
    if (likes._id !== myId) {
      buttonLike.classList.remove("card__like-button_is-active");
    } else {
      buttonLike.classList.add("card__like-button_is-active");
    }
  });

  cardElement.addEventListener("click", openPopupImage);
  return cardElement;
};

// функция лайка
function cardLike(evt) {
  const cardId = evt.target.closest(".card").getAttribute("card-id"); //нашли айди карточки
  const likesCount = evt.target.parentElement.querySelector(".likes_counter"); // у buttonLike нашли спан лайков
  const likeForButton = evt.target.parentElement.querySelector(".card__like-button"); // у buttonLike нашли лайки

  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLikeCard(cardId).then((res) => {
      likesCount.textContent = res.likes.length;
      likeForButton.classList.remove("card__like-button_is-active");
    });
  } else {
    addLikeCard(cardId).then((res) => {
      likesCount.textContent = res.likes.length;
      likeForButton.classList.add("card__like-button_is-active");
    });
  }
}

//удаление карточки
export function deleteCards(event) {
  const cardElementForButton = event.target.closest(".places__item"); //у buttonDeleteCard нашли его родителя
  const carddIdForButton = cardElementForButton.getAttribute("card-id"); //потом нашли у buttonDeleteCard у его родителя айди

  cardDeleteServer(carddIdForButton);
  cardElementForButton.remove();
}
