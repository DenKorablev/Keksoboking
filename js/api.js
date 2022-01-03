import { showAlert } from './util.js';

const GET_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://23.javascript.pages.academy/keksobooking';

export const getData = (onSuccess) => {
  fetch(GET_URL)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => showAlert('Не удалось получить данные с сервера'));
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(POST_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму');
    });
};
