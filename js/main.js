import {disableFormAddAds} from './form-add-ads.js';
import {disableFormFilters} from './form-filters.js';
import {renderMap, renderPinSimilarAds} from './map.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

const SIMILAR_ADS_COUNT = 10;

disableFormAddAds();
disableFormFilters();
renderMap();
getData(
  (similarAds) => renderPinSimilarAds(similarAds.slice(0, SIMILAR_ADS_COUNT)),
  () => showAlert('Не удалось загрузить данные с сервиса!')
);
