const typeHousing  = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000'
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
const guestSelectOption = adForm.querySelector('#capacity').children;

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

const setGuestsAndRooms = () => {
  const roomsValue = parseInt(rooms.value);

  for (let i = 0; i < guestSelectOption.length; i++) {
    const guestsValue = parseInt(guestSelectOption[i].value);

    if (roomsValue !== 100 && guestsValue === 0) {
      guestSelectOption[i].style.display = 'none';
    } else if (roomsValue < guestsValue) {
      guestSelectOption[i].style.display = 'none';
    } else if (roomsValue === 100 && guestsValue !== 0) {
      guestSelectOption[i].style.display = 'none';
    } else {
      guests.value = guestSelectOption[i].value;
      guestSelectOption[i].style.display = 'block';
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
});

formReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  formSubmit.textContent = 'Опубликовать';
  formSubmit.disabled = false;
  adForm.reset();
});
