import {clearFormAddAds} from './form-add-ads.js';
import {returnMap} from './map.js';

const clearForms = () => {
  clearFormAddAds();
  returnMap();
};

export {clearForms};
