const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так. Ошибка: ${res.status}`);
};

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-19",
  headers: {
    authorization: "76ddffda-20b5-4a39-9905-7d87ab0fe550",
    "Content-Type": "application/json",
  },
};
// добавление моей карточки на сервер
export function addNewMyCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleResponse);
}

//поставить лайк с сервера
export function addLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
}

//удалить лайк с сервера
export function deleteLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}

//поучаем информацию профиля с сервера

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

//поучаем карточки с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

// удаление моей карточки
export function cardDeleteServer(cardId) {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}

//Обновляем аватар с сервера
export const avatarForServer = (linkAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkAvatar,
    }),
  }).then(handleResponse);
};

//Обновляет информацию о профиле на сервере с заполненной формы
export const editProfileFormInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleResponse);
};
