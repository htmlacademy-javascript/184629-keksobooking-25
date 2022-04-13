import {clearFormAddAds} from './form-add-ads.js';
import {clearFormFilters} from './form-filters.js';
import {returnMap} from './map.js';

const clearForms = () => {
  clearFormAddAds();
  clearFormFilters();
  returnMap();
};

export {clearForms};
