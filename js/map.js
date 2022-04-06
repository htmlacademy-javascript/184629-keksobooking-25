import {activateFormFilters} from './form-filters.js';
import {activateFormAddAds} from './form-add-ads.js';
import {renderSimilarAds} from './similar.js';

const map = L.map('map-canvas')
  .setView({
    lat: 35.68949,
    lng: 139.69171,
  }, 13);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const mainPinMarker = L.marker(
  {
    lat: 35.68949,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
const renderMainPin = () => {
  const address = document.querySelector('#address');
  mainPinMarker.addTo(map);
  address.value = `${mainPinMarker._latlng.lat}, ${mainPinMarker._latlng.lng}`;
  mainPinMarker.on('moveend', (evt) => {
    const geoData = evt.target.getLatLng();
    const addressLat = geoData.lat.toFixed(5);
    const addressLng = geoData.lng.toFixed(5);
    address.value = `${addressLat}, ${addressLng}`;
  });
};

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

const renderPinSimilarAds = (similarAds) => {
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
    fetch('https://25.javascript.pages.academy/keksobooking/data')
      .then((response) => response.json())
      .then((similarAds) => {
        renderMainPin();
        renderPinSimilarAds(similarAds);
      });
  }).addTo(map);
};

export {renderMap, renderMainPin, renderPinSimilarAds};
