const typeFlatTranslateMap  = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
  'house': 'Дом',
  'palace': 'Дворец'
};

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const imgTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup__photo');

const insertPhotos = (element, array) => {
  element.innerHTML = '';

  array.forEach((item) => {
    const adPhoto = imgTemplate.cloneNode(true);
    adPhoto.src = item;
    element.appendChild(adPhoto);
  });
};

const insertFeatures = (element, array) => {
  element.innerHTML = '';

  array.forEach((item) => {
    const feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add('popup__feature--' + item);
    element.appendChild(feature);
  });
};

export const renderCard = ({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price}₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = typeFlatTranslateMap [offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `${offer.checkin}, выезд до ${offer.checkout}`;
  insertFeatures(cardElement.querySelector('.popup__features'), offer.features);
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  insertPhotos(cardElement.querySelector('.popup__photos'), offer.photos);
  return cardElement;
}

