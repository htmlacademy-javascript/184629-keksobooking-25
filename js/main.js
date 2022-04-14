import {disableFormAddAds, onButtonResetClick} from './form-add-ads.js';
import {disableFormFilters, onFiltersChange} from './form-filters.js';
import {renderMap, renderPinSimilarAds} from './map.js';
import {getData} from './api.js';
import {debounce, showAlert} from './util.js';

const RERENDER_DELAY = 500;

disableFormAddAds();
disableFormFilters();
renderMap();
getData(
  (similarAds) => {
    renderPinSimilarAds(similarAds);
    onFiltersChange(debounce(
      () => renderPinSimilarAds(similarAds), RERENDER_DELAY,
    ));
    onButtonResetClick(() => renderPinSimilarAds(similarAds));
  },
  () => showAlert('Не удалось загрузить данные с сервиса!'),
);
