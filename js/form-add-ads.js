import {disableElements, activateElements} from "./util.js";

const formAddAds = document.querySelector('.ad-form');
const setsOfFields = formAddAds.getElementsByTagName('fieldset');

const disableFormAddAds = () => {
  formAddAds.classList.add('ad-form—disabled');
  disableElements(setsOfFields);
};

const activateFormAddAds = () => {
  formAddAds.classList.remove('ad-form—disabled');
  activateElements(setsOfFields)
};

export {disableFormAddAds, activateFormAddAds};
