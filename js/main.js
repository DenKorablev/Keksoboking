import './data.js';
import './form.js';
import './map.js';
import { getData } from './api.js';

getData((ads) => console.log(ads));
