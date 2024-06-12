import "./index.css";
import { initialCards } from "./cards.js";
import { deleteCard } from "./card.js";
import { cardLike } from "./card.js";
import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";
import { closePopupEsc } from "./modal.js";
import { closeOverley } from "./modal.js";
import { closePopupCross } from "./modal.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const container = document.querySelector(".content");
const cardsContainer = container.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupCaption = document.querySelector(".popup__caption");
const openImage = popupImage.querySelector(".popup__image");
export const formCard = document.forms["new-place"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const сardUrlInput = document.querySelector(".popup__input_type_url");
export const formElement = document.forms["edit-profile"];
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popups = document.querySelectorAll(".popup");

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

// @todo: Перебираем массив
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  cardsContainer.append(cardElement);
});

//функция добавления новой карточки и очистка инпутов
export function newCards(evt) {
  evt.preventDefault();

  const cards = {
    name: cardNameInput.value,
    link: сardUrlInput.value,
  };

  const cardElement = createCard(cards, deleteCard);

  cardsContainer.prepend(cardElement);

  cardNameInput.value = "";
  сardUrlInput.value = "";

  const openPopaps = document.querySelector(".popup_is-opened");
  closePopup(openPopaps);
}

//функция открытия попапа, при нажатии наэлемент
addEventListener("click", function (evt) {
  if (evt.target.classList.contains("profile__add-button")) {
    openPopup(popupCard);
  }
  if (evt.target.classList.contains("profile__edit-button")) {
    popupName(formElement);
    openPopup(popupEdit);
  }
  if (evt.target.classList.contains("card__image")) {
    openImage.src = evt.target.src;
    openImage.alt = evt.target.alt;

    const cardTitle = document.querySelector(".card__title").textContent;
    popupCaption.textContent = cardTitle;

    openPopup(popupImage);
  }
});

function popupName() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

export function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  const openPopaps = document.querySelector(".popup_is-opened");
  closePopup(openPopaps);
}

popups.forEach((item) => {
  item.classList.add("popup_is-animated");
});
