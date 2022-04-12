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

const getTypeRang = (type) => {
  const typeFilter = formFilters.querySelector('#housing-type').value;

  let typeRank = 0;
  if (type === typeFilter) {
    typeRank += 5;
  }
  else if (typeFilter === 'any') {
    typeRank += 1;
  }
  return typeRank;
};
const getPriceRang = (price) => {
  const priceFilter = formFilters.querySelector('#housing-price').value;

  switch (priceFilter) {
    case 'any': return 2;
    case 'low': return price < 10000? 4: 0;
    case 'high': return price > 50000? 4: 0;
    case 'middle': return (price>10000 && price<50000)? 4: 0;
  }
  return 0;
};
const getRoomsRang = (rooms) => {
  const roomsFilter = formFilters.querySelector('#housing-rooms').value;
  const roomsString = rooms.toString();

  let rank = 0;
  if (roomsString === roomsFilter) {
    rank += 3;
  }
  else if (roomsFilter === 'any') {
    rank += 1;
  }
  return rank;
};
const getGuestsRang = (guests) => {
  const guestsFilter = formFilters.querySelector('#housing-guests').value;
  const guestString = guests.toString();

  let rank = 0;
  if (guestString === guestsFilter) {
    rank += 2;
  }
  else if (guestsFilter === 'any') {
    rank += 1;
  }
  return rank;
};
const getfeaturesRang = (features) => {
  let rank = 0;
  if (features) {
    const featuresFilters = formFilters.querySelector('#housing-features');
    const featuresList = featuresFilters.querySelectorAll('[name="features"]');
    featuresList.forEach((filter) => {
      const isFeature = Array.prototype.includes.call(features, filter.value);
      if (filter.checked && isFeature) {
        rank +=1;
      }
    });
  }
  return rank;
};

const getSimilarAdsRang = ({offer}) => {
  let rank = 0;
  rank = getTypeRang(offer.type)
    + getPriceRang(offer.price)
    + getRoomsRang(offer.rooms)
    + getGuestsRang(offer.guests)
    + getfeaturesRang(offer.features);
  return rank;
};

const onFiltersChange = (cb) => {
  formFilters.addEventListener('change', () => {
    cb();
  });
};

export {disableFormFilters, activateFormFilters, getSimilarAdsRang, onFiltersChange};
