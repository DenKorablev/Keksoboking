import { clearLayers } from './map.js';
import { ADS_COUNT } from './util.js';

const mapFilters = document.querySelector('.map__filters');
const typeHousing = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const rooms = document.querySelector('#housing-rooms');
const guests = document.querySelector('#housing-guests');

const fieldsetForFeature = mapFilters.querySelector('.map__features');
const featureInputs = fieldsetForFeature.querySelectorAll('.map__checkbox');

const checkTypeHousing = (data) => typeHousing.value === data.offer.type || typeHousing.value === 'any';
const checkPrice = (data) => {
  const price = data.offer.price;
  return  (housingPrice.value === 'low' && price < 10000) ||
          (housingPrice.value === 'middle' && (price >= 10000 && price <= 50000)) ||
          (housingPrice.value === 'high' && price > 50000) ||
          (housingPrice.value === 'any');
};
const checkRooms = (data) => +rooms.value === data.offer.rooms || rooms.value === 'any';
const checkGuests = (data) => +guests.value === data.offer.guests || guests.value === 'any';
const checkFeatures = (ad) => Array.from(featureInputs).every((input) => {
  if (!input.checked) return true;
  else if (!ad.offer.features) return false;
  return ad.offer.features.includes(input.value);
});

export const onFilterClick = (data, cb) => {
  mapFilters.addEventListener('change', () => {
    clearLayers();
    const newData = data.slice()
      .filter(el => checkTypeHousing(el) && checkPrice(el) && checkRooms(el) && checkGuests(el) && checkFeatures(el))
      .slice(0, ADS_COUNT);
    cb(newData);
  });
};
