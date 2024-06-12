export { openPopup };
export { closePopup };
export { closePopupEsc };
export { closeOverley };
export { closePopupCross };
import { formCard } from "./index.js";
import { addNewCards } from "./index.js";

export function closePopaps() {
  let openPopaps = document.querySelector(".popup_is-opened");
  closePopup(openPopaps);
}

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("click", closeOverley);
  popup.addEventListener("click", closePopupCross);
  formCard.addEventListener("submit", addNewCards);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("click", closeOverley);
  popup.removeEventListener("click", closePopupCross);
  formCard.removeEventListener("submit", addNewCards);
}

//функция закрытия попапа по esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopaps();
  }
}

//функция закрытия поапа по оверлею
function closeOverley(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopaps();
  }
}

//функция закрытия попапа, по крестику
function closePopupCross(evt) {
  if (evt.target.classList.contains("popup__close")) {
    closePopaps();
  }
}
