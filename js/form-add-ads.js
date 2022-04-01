import {disableElements, activateElements, isEscapeKey} from './util.js';

const MAXPRICE = 100000;
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

const timein = formAddAds.querySelector('[name="timein"]');
const timeout = formAddAds.querySelector('[name="timeout"]');
timein.addEventListener('change', () => timeout.value = timein.value);
timeout.addEventListener('change', () => timein.value = timeout.value);

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
const validatePrice = (value) => minPrice[type.value] <= value && value <= MAXPRICE;
const getPriceErrorMessage = () => `от ${minPrice[type.value]} до ${MAXPRICE}`;
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

formAddAds.addEventListener('submit', (evt) => {
  if (pristine.validate()) {
    const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    const successMessage = successMessageTemplate.cloneNode(true);
    document.body.append(successMessage);

    successMessage.addEventListener('click', () => {
      successMessage.remove();
    });

    document.addEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        successMessage.remove();
      }
    });
  } else {
    evt.preventDefault();
    const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    const errorMessage = errorMessageTemplate.cloneNode(true);
    document.body.prepend(errorMessage);

    errorMessage.addEventListener('click', () => {
      errorMessage.remove();
    });
    document.addEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        errorMessage.remove();
      }
    });
  }
});

export {disableFormAddAds, activateFormAddAds};
