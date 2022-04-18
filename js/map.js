import {activateFormAddAds} from './form-add-ads.js';
import {renderSimilarAds, getSimilarAds} from './similar.js';

const DEFAULT_LAT = 35.68949;
const DEFAULT_LNG = 139.69171;
const DEFAULT_SCALE = 13;
const SIMILAR_ADS_COUNT = 10;

const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, DEFAULT_SCALE);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const mainPinMarker = L.marker(
  {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const changeAdress = () => {
  const geoData = mainPinMarker.getLatLng();
  const addressLat = geoData.lat.toFixed(5);
  const addressLng = geoData.lng.toFixed(5);
  address.value = `${addressLat}, ${addressLng}`;
};

const returnMap = () => {
  mainPinMarker.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
  map.setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, DEFAULT_SCALE);
  changeAdress();
};
const renderMainPin = () => {
  mainPinMarker.addTo(map);
  changeAdress();
  mainPinMarker.on('moveend', changeAdress);
};

const similarAdsIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarkerSimilarAds = (point) => {
  const {lat, lng} = point.location;
  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon: similarAdsIcon,
  });
  marker.addTo(markerGroup).bindPopup(renderSimilarAds(point));
};

const renderPinSimilarAds = (similarAds) => {
  markerGroup.clearLayers();
  similarAds
    .filter(getSimilarAds)
    .slice(0, SIMILAR_ADS_COUNT)
    .forEach((point) => {
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
    activateFormAddAds();
    renderMainPin();
  }).addTo(map);
};

export {renderMap, renderMainPin, renderPinSimilarAds, returnMap};
