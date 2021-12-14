import * as util from './util.js';

const TITLE = [
  'Дом для котиков',
  'Пушистые аппартаменты',
  'Конура',
  'Любовное гнездышко',
  'Харомы',
  'Хрущевка',
  'Дворец'
]

const TYPE = [
  'palace', 'flat', 'house', 'bungalow'
]

const TIMES = [
  '12:00', '13:00', '14:00'
]

const FEATURES = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'
]

const DESCRIPTION = [
  'Красот', 'Просто и со вкусом', 'Для котиков'
]

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
]

const ADS_COUNT = 10;

export const addAds = () => {
  const ads = [];
  for (let i = 0; i < ADS_COUNT; i++) {
    const location = {
      x: util.getRandomFloat(35.65000, 35.70000, 5),
      y: util.getRandomFloat(139.70000, 139.80000, 5)
    }
    const advertisement = {
      author: {
        avatar: `img/avatars/user${'0' + i}`
      },
      offer: {
        title: util.getRandomArrayElement(TITLE),
        address: `${location.x}, ${location.y}`,
        price: util.getRandomInt(1, 99999),
        type: util.getRandomArrayElement(TYPE),
        rooms: util.getRandomInt(1, 5),
        guests: util.getRandomInt(1, 6),
        checkin: util.getRandomArrayElement(TIMES),
        checkout: util.getRandomArrayElement(TIMES),
        features: FEATURES.slice(util.getRandomInt(1, 5)),
        description: util.getRandomArrayElement(DESCRIPTION),
        photos: PHOTOS.slice(util.getRandomInt(1, 3)),
      }
    };
    ads.push({...advertisement, location});
  }
  return ads;
}
