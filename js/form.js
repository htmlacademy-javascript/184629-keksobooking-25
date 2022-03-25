import {renderSimilarAds} from './similar.js';

const formAdd = document.querySelector('.ad-form');
const  fieldset = formAdd.getElementsByTagName('fieldset');

const formFilters = document.querySelector('.map__filters');
const  selectionFilters = formFilters.querySelectorAll('.map__filter');
const  checkboxFilters = formFilters.querySelectorAll('.map__checkbox');

const disableFormAdd = () => {
  formAdd.classList.add('ad-form—disabled');
  for (let i = 0; i < fieldset.length; i++) {
    fieldset[i].setAttribute("disabled","");
  }
};
const disableFormFilters = () => {
  formFilters.classList.add('map__filters--disabled');
  for (let i = 0; i < selectionFilters.length; i++) {
    selectionFilters[i].setAttribute("disabled","");
  }
  for (let i = 0; i < checkboxFilters.length; i++) {
    checkboxFilters[i].setAttribute("disabled","");
  }
};

const disablePage = () => {
  disableFormAdd();
  disableFormFilters();
};

const activateFormAdd = () => {
  formAdd.classList.remove('ad-form—disabled');
  for (let i = 0; i < fieldset.length; i++) {
    fieldset[i].removeAttribute("disabled");
  }
};
const activateFormFilters = () => {
  formFilters.classList.remove('map__filters--disabled');
  for (let i = 0; i < selectionFilters.length; i++) {
    selectionFilters[i].removeAttribute("disabled");
  }
  for (let i = 0; i < checkboxFilters.length; i++) {
    checkboxFilters[i].removeAttribute("disabled");
  }
};

const activatePage = () => {
  activateFormAdd();
  activateFormFilters();
};

disablePage();
renderSimilarAds();
activatePage();
