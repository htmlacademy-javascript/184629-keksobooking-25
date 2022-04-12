import {disableElements, activateElements} from './util.js';
import {renderSuccessMessage, renderErrorMessage} from './popup.js';
import {sendData} from './api.js';
import {clearForms} from './user-modal.js';

const MAX_PRICE = 100000;

const formAddAds = document.querySelector('.ad-form');
const setsOfFields = formAddAds.getElementsByTagName('fieldset');
const sliderPrice = document.querySelector('.ad-form__slider');
const submitButton = formAddAds.querySelector('.ad-form__submit');
const buttonReset = formAddAds.querySelector('.ad-form__reset');

const disableFormAddAds = () => {
  formAddAds.classList.add('ad-form—disabled');
  disableElements(setsOfFields);
  sliderPrice.setAttribute('disabled', '');
};
const activateFormAddAds = () => {
  formAddAds.classList.remove('ad-form—disabled');
  activateElements(setsOfFields);
  sliderPrice.removeAttribute('disabled');
  buttonReset.addEventListener('click', clearForms);
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
    min: 0,
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
price.addEventListener('change', () => {
  sliderPrice.noUiSlider.set(price.value, MAX_PRICE);
});

const validatePrice = (value) => minPrice[type.value] <= value && value <= MAX_PRICE;
const getPriceErrorMessage = () => `от ${minPrice[type.value]} до ${MAX_PRICE}`;

function onTypeChange() {
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

const clearFormAddAds = () => {
  formAddAds.reset();
  price.value = minPrice[type.value];
  price.placeholder = minPrice[type.value];
  sliderPrice.noUiSlider.set(minPrice[type.value], MAX_PRICE);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onFormSuccessSent = () => {
  renderSuccessMessage();
  unblockSubmitButton();
  clearForms();
};
const onFormErrorSent = () => {
  renderErrorMessage();
  unblockSubmitButton();
};

formAddAds.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();
    sendData(
      () => {onFormSuccessSent();},
      () => {onFormErrorSent();},
      new FormData(evt.target),
    );
  }
});

export {disableFormAddAds, activateFormAddAds, clearFormAddAds};
