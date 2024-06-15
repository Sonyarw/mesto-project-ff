import "./index.css";
import { initialCards } from "./cards.js";
import { deleteCard, cardLike, createCard } from "./card.js";
import {
  closePopup,
  closePopupEsc,
  closeOverley,
  closePopupCross,
  closePopaps,
  openPopup,
  openPopupCard,
  openPopupEdit,
  openPopupImage
} from "./modal.js";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const container = document.querySelector(".content");
const cardsContainer = container.querySelector(".places__list");
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupCard = document.querySelector(".popup_type_new-card");
export const popupImage = document.querySelector(".popup_type_image");
export const popupCaption = document.querySelector(".popup__caption");
export const openImage = popupImage.querySelector(".popup__image");
export const formCard = document.forms["new-place"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const сardUrlInput = document.querySelector(".popup__input_type_url");
export const formElement = document.forms["edit-profile"];
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popups = document.querySelectorAll(".popup");

// @todo: Перебираем массив
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  cardsContainer.append(cardElement);
});

//функция добавления новой карточки и очистка инпутов
export function addNewCards(evt) {
  evt.preventDefault();

  const cards = {
    name: cardNameInput.value,
    link: сardUrlInput.value,
  };

  const cardElement = createCard(cards, deleteCard);

  cardsContainer.prepend(cardElement);

  formCard.reset();

  closePopaps();
}

export function addNamePopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

export function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopaps();
}

popups.forEach((item) => {
  item.classList.add("popup_is-animated");
});

formElement.addEventListener("submit", handleFormSubmit);
addEventListener("click", openPopupCard);
addEventListener("click", openPopupEdit);
addEventListener("click", openPopupImage);
