import {disableFormAddAds} from './form-add-ads.js';
import {disableFormFilters, onFiltersChange} from './form-filters.js';
import {renderMap, renderPinSimilarAds} from './map.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

disableFormAddAds();
disableFormFilters();
renderMap();
getData(
  (similarAds)=> {
    renderPinSimilarAds(similarAds);
    onFiltersChange(() => renderPinSimilarAds(similarAds));
  },
  () => showAlert('Не удалось загрузить данные с сервиса!'),
);
