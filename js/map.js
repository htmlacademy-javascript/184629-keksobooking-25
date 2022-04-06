import {activateFormFilters} from './form-filters.js';
import {activateFormAddAds} from './form-add-ads.js';
import {generateAdsNearby} from './data.js';
import {renderSimilarAds} from './similar.js';

const map = L.map('map-canvas')
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 12);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
const renderMainPin = () => {
  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    const newAddress = evt.target.getLatLng();
    const address = document.querySelector('#address');
    address.value = `${newAddress.lat}, ${newAddress.lng}`;
  });
};

const similarAds = generateAdsNearby();
const similarAdsIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createMarkerSimilarAds = (point) => {
  const {lat, lng} = point.location;
  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon: similarAdsIcon,
  });
  const markerGroup = L.layerGroup().addTo(map);
  marker.addTo(markerGroup).bindPopup(renderSimilarAds(point));
};

const renderPinSimilarAds = () => {
  similarAds.forEach((point) => {
    createMarkerSimilarAds(point);
  });
};

const renderMap = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).on('load', () => {
    activateFormFilters();
    activateFormAddAds();
  }).addTo(map);

  renderMainPin();
  renderPinSimilarAds();
};

export {renderMap, renderMainPin, renderPinSimilarAds};
