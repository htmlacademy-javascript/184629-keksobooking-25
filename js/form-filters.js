import {disableElements, activateElements} from "./util.js";

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

export {disableFormFilters, activateFormFilters};
