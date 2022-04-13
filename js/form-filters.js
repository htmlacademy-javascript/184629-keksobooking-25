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
const isSuitablePrice = (price) => {
  const priceFilter = formFilters.querySelector('#housing-price').value;
  let isSuitable = false;
  switch (priceFilter) {
    case 'any': isSuitable = true; break;
    case 'low': isSuitable = (price < 10000); break;
    case 'high': isSuitable = (price > 50000); break;
    case 'middle': isSuitable = (price > 10000 && price < 50000); break;
    default: isSuitable = false;
  }
  return isSuitable;
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
