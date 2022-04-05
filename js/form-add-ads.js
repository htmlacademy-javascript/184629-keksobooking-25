import {disableElements, activateElements} from './util.js';
import {renderSuccessMessage, renderErrorMessage} from './popup.js';

const MAX_PRICE = 100000;

const formAddAds = document.querySelector('.ad-form');
const setsOfFields = formAddAds.getElementsByTagName('fieldset');
const sliderPrice = document.querySelector('.ad-form__slider');

const disableFormAddAds = () => {
  formAddAds.classList.add('ad-form—disabled');
  disableElements(setsOfFields);
  sliderPrice.setAttribute('disabled', '');
};
const activateFormAddAds = () => {
  formAddAds.classList.remove('ad-form—disabled');
  activateElements(setsOfFields);
  sliderPrice.removeAttribute('disabled');
};

const timein = formAddAds.querySelector('[name="timein"]');
const timeout = formAddAds.querySelector('[name="timeout"]');
timein.addEventListener('change',() => {
  timeout.value = timein.value;
  return null;
});
timeout.addEventListener('change', () => {
  timein.value = timeout.value;
  return null;
});

const pristine = new Pristine(formAddAds, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

const price = formAddAds.querySelector('#price');
const type =  formAddAds.querySelector('[name="type"]');
const types =  formAddAds.querySelectorAll('[name="type"]');
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};
noUiSlider.create(sliderPrice, {
  range: {
    min: 1000,
    max: 100000,
  },
  start: 1000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
sliderPrice.noUiSlider.on('update', () => {
  price.value = sliderPrice.noUiSlider.get();
});

const validatePrice = (value) => minPrice[type.value] <= value && value <= MAX_PRICE;
const getPriceErrorMessage = () => `от ${minPrice[type.value]} до ${MAX_PRICE}`;

function onTypeChange() {
  sliderPrice.noUiSlider.updateOptions({
    range: {
      min: minPrice[this.value],
      max: 100000
    },
    start: price.value > minPrice[this.value] ? price.value : minPrice[this.value]
  });
  price.placeholder = minPrice[this.value];
  pristine.validate(price);
}
types.forEach((item) => item.addEventListener('change', onTypeChange));
pristine.addValidator(price, validatePrice, getPriceErrorMessage);

const rooms = formAddAds.querySelector('[name="rooms"]');
const capacity = formAddAds.querySelector('[name="capacity"]');
const capacityObject = formAddAds.querySelectorAll('[name="capacity"]');
const validateRooms = () => {
  const numberRooms = parseInt(rooms.value, 10);
  const numberGuests = parseInt(capacity.value, 10);
  const suitableForGuests = (numberRooms < 100 && numberGuests > 0 && numberGuests <= numberRooms);
  const lonelyMultiRoom = (numberRooms === 100 && numberGuests === 0);
  return suitableForGuests || lonelyMultiRoom;
};
const getRoomsErrorMessage = () =>
  (rooms.value === '100' || capacity.value === '0')
    ? 'Гостей нельзя приглашать только в многокомнатную квартиру'
    : 'Гостей не может быть больше, чем комнат';

const onCapacityChange = () => pristine.validate(rooms);
capacityObject.forEach((item) => item.addEventListener('change', onCapacityChange));

pristine.addValidator(rooms, validateRooms, getRoomsErrorMessage);

formAddAds.addEventListener('submit', (evt) => {
  if (pristine.validate()) {
    renderSuccessMessage();
  } else {
    evt.preventDefault();
    renderErrorMessage();
  }
});

export {disableFormAddAds, activateFormAddAds};
