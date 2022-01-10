import { mainPinMarker } from './map.js';
import { showAlert, showSuccess } from './util.js';
import { sendData } from './api.js';

const typeHousing  = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};

const adForm = document.querySelector('.ad-form');
const rooms = adForm.querySelector('select[name=rooms]');
const guests = adForm.querySelector('select[name=capacity]');
const typeFlat = adForm.querySelector('select[name=type]');
const pricePerNight = adForm.querySelector('input[name=price]');
const timeIn = adForm.querySelector('select[name=timein]');
const timeOut = adForm.querySelector('select[name=timeout]');
const formSubmit = adForm.querySelector('.ad-form__submit');
const formReset = adForm.querySelector('.ad-form__reset');
const guestSelectOption = adForm.querySelectorAll('#capacity option');
const address = document.querySelector('#address');

const avatarChooser = adForm.querySelector('.ad-form__field');
const avatar = adForm.querySelector('.ad-form-header__preview img');

const housingPhotosChooser = adForm.querySelector('.ad-form__upload');
const housingPhotos = adForm.querySelector('.ad-form__photo');

const setPrice = () => {
  pricePerNight.setAttribute('min', typeHousing[typeFlat.value]);
  pricePerNight.setAttribute('placeholder', typeHousing[typeFlat.value]);
};

const setTimeIn = () => {
  timeIn.value = timeOut.value;
};

const setTimeOut = () => {
  timeOut.value = timeIn.value;
};

const defaultForm = () => {
  formSubmit.textContent = 'Опубликовать';
  formSubmit.disabled = false;
};

const defaultFieldValue = () => {
  const {lat, lng } = mainPinMarker.getLatLng()
  avatar.src = 'img/muffin-grey.svg';
  housingPhotos.style = '';
  address.value = `lat: ${lat.toFixed(5)}, lng: ${lng.toFixed(5)}`;
};

export const setGuestsAndRooms = () => {
  const roomsValue = parseInt(rooms.value);

  for (let i = 0; i < guestSelectOption.length; i++) {
    const guestsValue = parseInt(guestSelectOption[i].value);

    if (roomsValue !== 100 && guestsValue === 0) {
      guestSelectOption[i].remove();
    } else if (roomsValue < guestsValue) {
      guestSelectOption[i].remove();
    } else if (roomsValue === 100 && guestsValue !== 0) {
      guestSelectOption[i].remove();
    } else {
      guests.value = guestSelectOption[i].value;
      guests.appendChild(guestSelectOption[i]);
    }
  }
};

typeFlat.addEventListener('change', setPrice)

timeIn.addEventListener('change', setTimeOut)

timeOut.addEventListener('change', setTimeIn)

rooms.addEventListener('change', setGuestsAndRooms)

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  formSubmit.textContent = 'Отправка';
  formSubmit.disabled = true;

  sendData(
    () => {
      showSuccess(defaultForm);
      adForm.reset();
      defaultFieldValue();
    },
    () => {
      showAlert('Не удалось отправить форму');
      defaultForm();
    },
    new FormData(evt.target),
  );
});

formReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  defaultForm();
  adForm.reset();
  defaultFieldValue();
});

avatarChooser.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const reader = new FileReader(file);
  reader.addEventListener('load', () => {
    avatar.src = reader.result;
  });

  reader.readAsDataURL(file);
})

housingPhotosChooser.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const reader = new FileReader(file);
  reader.addEventListener('load', () => {
    housingPhotos.style.backgroundImage = `url(${reader.result})`;
    housingPhotos.style.backgroundRepeat = 'no-repeat';
    housingPhotos.style.backgroundSize = 'contain';
    housingPhotos.style.backgroundPosition = 'center';
  });

  reader.readAsDataURL(file);
})
