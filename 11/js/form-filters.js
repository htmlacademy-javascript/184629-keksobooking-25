import {disableElements, activateElements} from './util.js';

const FILTER_PRICE_FIRST = 10000;
const FILTER_PRICE_SECOND = 50000;

const formFilters = document.querySelector('.map__filters');
const  selectionFilters = formFilters.querySelectorAll('.map__filter');
const  checkboxFilters = formFilters.querySelectorAll('.map__checkbox');

const disableFormFilters = () => {
  formFilters.classList.add('map__filters--disabled');
  disableElements(selectionFilters);
  disableElements(checkboxFilters);
};
const activateFormFilters = () => {
  formFilters.classList.remove('map__filters--disabled');
  activateElements(selectionFilters);
  activateElements(checkboxFilters);
};

const clearFormFilters = () => {
  formFilters.reset();
};

const getTypeRang = (type) => {
  const typeFilter = formFilters.querySelector('#housing-type').value;
  return (type === typeFilter || typeFilter === 'any');
};
const isSuitablePrice = (price) => {
  const priceFilter = formFilters.querySelector('#housing-price').value;
  switch (priceFilter) {
    case 'any': return true;
    case 'low': return price < FILTER_PRICE_FIRST;
    case 'high': return price > FILTER_PRICE_SECOND;
    case 'middle': return (price > FILTER_PRICE_FIRST && price < FILTER_PRICE_SECOND);
  }
};
const isSuitableRooms = (rooms) => {
  const roomsFilter = formFilters.querySelector('#housing-rooms').value;
  const roomsString = rooms.toString();
  return (roomsString === roomsFilter || roomsFilter === 'any');
};
const isSuitableGuests = (guests) => {
  const guestsFilter = formFilters.querySelector('#housing-guests').value;
  const guestString = guests.toString();
  return (guestString === guestsFilter || guestsFilter === 'any');
};
const isSuitableFeatures = (features) => {
  const featuresFilters = formFilters.querySelector('#housing-features');
  const featuresList = featuresFilters.querySelectorAll('[name="features"]:checked');
  if (!features && featuresList.length > 0) {
    return false;
  }
  if (features && featuresList.length > 0) {
    for (let i = 0; i < featuresList.length; i++) {
      if (!Array.prototype.includes.call(features, featuresList[i].value)) {
        return false;
      }
    }
  }
  return true;
};

const isSuitableAds = ({offer}) => getTypeRang(offer.type)
    && isSuitablePrice(offer.price)
    && isSuitableRooms(offer.rooms)
    && isSuitableGuests(offer.guests)
    && isSuitableFeatures(offer.features);

const onFiltersChange = (cb) => {
  formFilters.addEventListener('change', () => {
    cb();
  });
};

export {disableFormFilters, activateFormFilters, clearFormFilters, isSuitableAds, onFiltersChange};
