import "./index.css";
import {
  addNewMyCard,
  getProfileInfo,
  getInitialCards,
  avatarForServer,
  editProfileFormInfo,
} from "./api.js";
import { deleteCards, createCard } from "./card.js";
import { closePopup, openPopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const container = document.querySelector(".content");
const cardsContainer = container.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const popupCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupCaption = document.querySelector(".popup__caption");
const openImage = popupImage.querySelector(".popup__image");

const buttonProfileAdd = document.querySelector(".profile__add-button");
const buttonProfileEdit = document.querySelector(".profile__edit-button");

// форма карточки
const formCard = document.forms["new-place"];
const cardNameInput = formCard.querySelector(".popup__input_type_card-name");
const сardUrlInput = formCard.querySelector(".popup__input_type_url");
const buttonFormCard = formCard.querySelector(".popup__button");

// форма профиля
const profileTitle = document.querySelector(".profile__title");
const profileImage = document.querySelector(".profile__image");
const profileDescription = document.querySelector(".profile__description");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile"];
const editProfileFormName = editProfileForm["name"];
const editProfileFormDescription = editProfileForm.description;

// ававтар
const avatarForm = document.forms["avatar"];
const avatarInput = avatarForm.querySelector(".popup__input_type_url");
const popupAvatar = document.querySelector(".popup_type_avatar");

let myId;

const validationConfig = {
  form: ".popup__form",
  input: ".popup__input",
  buttonElement: ".popup__button",
  inactiveButtonClass: ".form__submit_inactive",
  inputErrorClass: ".form__input_type_error",
  errorClass: ".form__input-error-active",
};

function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение...";
    button.disabled = true;
  } else {
    button.textContent = "Сохранить";
    button.disabled = false;
  }
}

//функция открытия изображения, при нажатии на картинку и вставляем текстовый контенкт в открытое изображение
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

//функция открытия попапа, при нажатии наэлемент
function openPopupCard(evt) {
  if (evt.target.classList.contains("profile__add-button")) {
    openPopup(popupCard);

    const profileForm = document.querySelector(".popup__form");
    clearValidation(profileForm, validationConfig);
  }
}

function openPopupEdit(evt) {
  evt.preventDefault();

  if (evt.target.classList.contains("profile__edit-button")) {
    changeNameInput(editProfileForm);
    openPopup(popupProfileEdit);

    const profileForm = document.querySelector(".popup__form");
    clearValidation(profileForm, validationConfig);
  }
}

function openPopupAvatar(evt) {
  if (evt.target.classList.contains("profile__image")) {
    openPopup(popupAvatar);
    const profileForm = document.querySelector(".popup__form");
    clearValidation(profileForm, validationConfig);
  }
}

// //выводим карточки на страницу
Promise.all([getProfileInfo(), getInitialCards()])
  .then(([profile, collectionСards]) => {
    collectionСards.forEach((cards) => {
      cardsContainer.append(createCard(cards, profile._id, deleteCards));
    });

    myId = profile._id;
    renderProfile(profile);
    profileImage.setAttribute(
      "style",
      `background-image: url('${profile.avatar}')`
    );
  })

  .catch((err) => {
    console.log("Ошибка", err);
  });

// меняем имя на странице на имя с сервера
const renderProfile = (profile) => {
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
};

//функция меняет имя попапа на то которое в профиле
export function changeNameInput() {
  editProfileFormName.value = profileTitle.textContent;
  editProfileFormDescription.value = profileDescription.textContent;
}

popups.forEach((item) => {
  item.classList.add("popup_is-animated");
});

//функция добавления новой карточки и очистка инпутов
export function addNewCards(evt) {
  evt.preventDefault();

  const activeButtonNewCard = formCard.querySelector(".button");
  renderLoading(activeButtonNewCard, true);

  addNewMyCard(cardNameInput.value, сardUrlInput.value)
    .then((data) => {
      const cardMyNew = createCard(data, myId);
      cardsContainer.prepend(cardMyNew);
      formCard.reset();
      closePopup(popupCard);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(activeButtonNewCard, false);
    });
}

//фуекция меняет аватарку
function changeAvatar(evt) {
  evt.preventDefault();

  const activeButtonAvatar = avatarForm.querySelector(".button");
  renderLoading(activeButtonAvatar, true);

  avatarForServer(avatarInput.value)
    .then((res) => {
      profileImage.setAttribute(
        "style",
        `background-image: url('${res.avatar}')`
      );
      closePopup(popupAvatar);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(activeButtonAvatar, false);
    });
}

//заполняет форму и отправляет на сервер
function handleFormEditProfile(evt) {
  evt.preventDefault();

  const activeButtonProfile = editProfileForm.querySelector(".button");
  renderLoading(activeButtonProfile, true);

  editProfileFormInfo(
    editProfileFormName.value,
    editProfileFormDescription.value
  )
    .then((res) => {
      renderProfile(res);
      closePopup(popupProfileEdit);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(activeButtonProfile, false);
    });
}

editProfileForm.addEventListener("submit", handleFormEditProfile);
buttonProfileAdd.addEventListener("click", openPopupCard);
buttonProfileEdit.addEventListener("click", openPopupEdit);
avatarForm.addEventListener("submit", changeAvatar);
buttonFormCard.addEventListener("click", addNewCards);
profileImage.addEventListener("click", openPopupAvatar);
buttonProfileEdit.addEventListener("click", openPopupEdit);

enableValidation(validationConfig);
