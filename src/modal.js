import {
  addNamePopup,
  formElement,
  popupEdit,
  popupImage,
  popupCard,
  popupCaption,
  openImage,
  addNewCards,
  formCard
} from "./index.js";

export function closePopaps() {
  let openPopaps = document.querySelector(".popup_is-opened");
  closePopup(openPopaps);
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("click", closeOverley);
  popup.addEventListener("click", closePopupCross);
  formCard.addEventListener("submit", addNewCards);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("click", closeOverley);
  popup.removeEventListener("click", closePopupCross);
  formCard.removeEventListener("submit", addNewCards);
}

//функция открытия попапа, при нажатии наэлемент
export function openPopupCard(evt) {
  if (evt.target.classList.contains("profile__add-button")) {
    openPopup(popupCard);
  }
}

export function openPopupEdit(evt) {
  if (evt.target.classList.contains("profile__edit-button")) {
    addNamePopup(formElement);
    openPopup(popupEdit);
  }
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

//функция закрытия попапа по esc
export function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopaps();
  }
}

//функция закрытия поапа по оверлею
export function closeOverley(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopaps();
  }
}

//функция закрытия попапа, по крестику
export function closePopupCross(evt) {
  if (evt.target.classList.contains("popup__close")) {
    closePopaps();
  }
}
