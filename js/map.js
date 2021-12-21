import {setPageActive, setPageNotActive} from './load.js';
import {addAds} from './data.js';
import {renderCard} from './card.js';

/* setPageNotActive(); */  //sssssssssssssssssssssss

const START_POSITION = {
  LAT: 35.6895,
  LNG: 139.69171
}

const ads = addAds();
const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    setPageActive();
    address.value = `lat: ${START_POSITION.LAT}, lng: ${START_POSITION.LNG}`;
  })
  .setView({
    lat: START_POSITION.LAT,
    lng: START_POSITION.LNG,
  }, 11);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const position = evt.target.getLatLng();
  address.value = `lat: ${position.lat.toFixed(5)}, lng: ${position.lng.toFixed(5)}`
})

ads.forEach((object) => {
  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker({
    lat: object.location.x,
    lng: object.location.y,
  },
  {
    icon,
  });

  marker
    .addTo(map)
    .bindPopup(renderCard(object),
      {
        keepInView: true,
      });
});
