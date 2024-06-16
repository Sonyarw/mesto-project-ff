import "./index.css";
import { initialCards } from "./cards.js";
import { deleteCard, createCard } from "./card.js";
import {closePopup,openPopup,} from "./modal.js";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const container = document.querySelector(".content");
const cardsContainer = container.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupCaption = document.querySelector(".popup__caption");
const openImage = popupImage.querySelector(".popup__image");
const formCard = document.forms["new-place"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const сardUrlInput = document.querySelector(".popup__input_type_url");
const formElementProfile = document.forms["edit-profile"];
const nameInput = formElementProfile.querySelector(".popup__input_type_name");
const jobInput = formElementProfile.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popups = document.querySelectorAll(".popup");
const buttonProfileAdd = document.querySelector(".profile__add-button");
const buttonProfileEdit = document.querySelector(".profile__edit-button");

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

  closePopup(popupCard);
}

export function openPopupImage(evt) {
  if (evt.target.classList.contains("card__image")) {
    openImage.src = evt.target.src;
    openImage.alt = evt.target.alt;

    const card = evt.target.closest(".card");
    const cardTitle = card.querySelector(".card__title");
    popupCaption.textContent = cardTitle.textContent;

    openPopup(popupImage);
  }
}

function openPopupEdit(evt) {
  if (evt.target.classList.contains("profile__edit-button")) {
    changeNameInputPopup(formElementProfile);
    openPopup(popupEdit);
  }
}

//функция открытия попапа, при нажатии наэлемент
function openPopupCard(evt) {
  if (evt.target.classList.contains("profile__add-button")) {
    openPopup(popupCard);
  }
}

//функция меняет имя попапа на то которое в профиле
export function changeNameInputPopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

export function handleFormProfileSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEdit);
}

popups.forEach((item) => {
  item.classList.add("popup_is-animated");
});

formElementProfile.addEventListener("submit", handleFormProfileSubmit);
formCard.addEventListener("submit", addNewCards);
buttonProfileAdd.addEventListener("click", openPopupCard);
buttonProfileEdit.addEventListener("click", openPopupEdit);
