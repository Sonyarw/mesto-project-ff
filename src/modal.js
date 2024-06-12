export { openPopup };
export { closePopup };
export { closePopupEsc };
export { closeOverley };
export { closePopupCross };
import { formElement } from "./index.js";
import { handleFormSubmit } from "./index.js";
import { formCard } from "./index.js";
import { newCards } from "./index.js";

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("click", closeOverley);
  popup.addEventListener("click", closePopupCross);
  formElement.addEventListener("submit", handleFormSubmit);
  formCard.addEventListener("submit", newCards);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("click", closeOverley);
  popup.removeEventListener("click", closePopupCross);
  formElement.removeEventListener("submit", handleFormSubmit);
  formCard.removeEventListener("submit", newCards);
}

//функция закрытия попапа по esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openPopaps = document.querySelector(".popup_is-opened");
    closePopup(openPopaps);
  }
}

//функция закрытия поапа по оверлею
function closeOverley(evt) {
  if (evt.target.classList.contains("popup")) {
    const openPopaps = document.querySelector(".popup_is-opened");
    closePopup(openPopaps);
  }
}

//функция закрытия попапа, по крестику
function closePopupCross(evt) {
  if (evt.target.classList.contains("popup__close")) {
    const openPopaps = document.querySelector(".popup_is-opened");
    closePopup(openPopaps);
  }
}
