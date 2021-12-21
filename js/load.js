const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.querySelectorAll('.map__filter');

export const setPageNotActive = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  adFormFieldsets.forEach(field => field.setAttribute('disabled', ''));
  mapFiltersSelects.forEach(field => field.setAttribute('disabled', ''));
};

export const setPageActive = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  adFormFieldsets.forEach(field => field.removeAttribute('disabled', ''));
  mapFiltersSelects.forEach(field => field.removeAttribute('disabled', ''));
};
