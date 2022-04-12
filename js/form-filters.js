import {disableElements, activateElements} from './util.js';

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
const getPriceRang = (price) => {
  const priceFilter = formFilters.querySelector('#housing-price').value;
  switch (priceFilter) {
    case 'any': return true;
    case 'low': return price < 10000;
    case 'high': return price > 50000;
    case 'middle': return (price>10000 && price<50000);
  }
};
const getRoomsRang = (rooms) => {
  const roomsFilter = formFilters.querySelector('#housing-rooms').value;
  const roomsString = rooms.toString();
  return (roomsString === roomsFilter || roomsFilter === 'any');
};
const getGuestsRang = (guests) => {
  const guestsFilter = formFilters.querySelector('#housing-guests').value;
  const guestString = guests.toString();
  return (guestString === guestsFilter || guestsFilter === 'any');
};
const getFeaturesRang = (features) => {
  let isSuitable = true;
  const featuresFilters = formFilters.querySelector('#housing-features');
  const featuresList = featuresFilters.querySelectorAll('[name="features"]');
  featuresList.forEach((filter) => {
    if (filter.checked) {
      if (features) {
        isSuitable = Array.prototype.includes.call(features, filter.value);
      } else {
        isSuitable = false;
      }
    }
  });
  return isSuitable;
};

const isSuitableSimilarAds = ({offer}) => getTypeRang(offer.type)
    && getPriceRang(offer.price)
    && getRoomsRang(offer.rooms)
    && getGuestsRang(offer.guests)
    && getFeaturesRang(offer.features);

const onFiltersChange = (cb) => {
  formFilters.addEventListener('change', () => {
    cb();
  });
};

export {disableFormFilters, activateFormFilters, clearFormFilters, isSuitableSimilarAds, onFiltersChange};
