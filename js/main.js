import './data.js';
import { renderAds } from './map.js';
import { getData } from './api.js';
import { ADS_COUNT, debounce } from './util.js';
import { onFilterClick } from './filters.js';

getData((ads) => {
  const slicedAds = [...ads].slice(0, ADS_COUNT);
  renderAds(slicedAds)

  onFilterClick(ads, debounce((data) => renderAds(data), 500));
});
