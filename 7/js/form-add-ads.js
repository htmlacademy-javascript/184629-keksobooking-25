import {disableElements, activateElements} from './util.js';

const formAddAds = document.querySelector('.ad-form');
const setsOfFields = formAddAds.getElementsByTagName('fieldset');

const disableFormAddAds = () => {
  formAddAds.classList.add('ad-form—disabled');
  disableElements(setsOfFields);
};

const activateFormAddAds = () => {
  formAddAds.classList.remove('ad-form—disabled');
  activateElements(setsOfFields);
};

const pristine = new Pristine(formAddAds, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});


function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  formAddAds.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

const price = formAddAds.querySelector('#price');
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

function validatePrice (value) {
  const type =  formAddAds.querySelector('[name="type"]');
  return minPrice[type.value] <= value && value <= 100000;
}

function getPriceErrorMessage () {
  const type =  formAddAds.querySelector('[name="type"]');
  return `от ${minPrice[type.value]} до 100000`;
}

function onTypeChange () {
  price.placeholder = minPrice[this.value];
  pristine.validate(price);
}

formAddAds
  .querySelectorAll('[name="type"]')
  .forEach((item) => item.addEventListener('change', onTypeChange));

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

const rooms = formAddAds.querySelector('[name="rooms"]');
const capacity = formAddAds.querySelector('[name="capacity"]');
const roomsOption = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0']
};

function validateRooms () {
  return roomsOption[rooms.value].includes(capacity.value);
}

function getRoomsErrorMessage () {
  switch(rooms.value) {
    case '1': return '1 комната для 1го гостя';
    case '2': return '2 комнаты для 2 гостей либо для 1 гостя';
    case '3': return '3 комнаты для 3, 2 или гостей';
    case '100': return 'не для гостей';
    default: return 'Что-то пошло не так';
  }
}
function onCapacityChange () {
  pristine.validate(rooms);
}

formAddAds
  .querySelectorAll('[name="capacity"]')
  .forEach((item) => item.addEventListener('change', onCapacityChange));

pristine.addValidator(rooms, validateRooms, getRoomsErrorMessage);

formAddAds.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {disableFormAddAds, activateFormAddAds};
