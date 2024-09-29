export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("click", closeOverley);
  popup.addEventListener("click", closePopupCross);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("click", closeOverley);
  popup.removeEventListener("click", closePopupCross);
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
