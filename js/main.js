import './data.js';
import './form.js';
import { renderAds } from './map.js';
import { getData } from './api.js';
import { ADS_COUNT } from './util.js';

getData((ads) => {
  const slicedAds = [...ads].slice(0, ADS_COUNT);
  renderAds(slicedAds)
});
