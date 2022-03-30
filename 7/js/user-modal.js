import {disableFormFilters, activateFormFilters} from './form-filters.js';
import {disableFormAddAds, activateFormAddAds} from './form-add-ads.js';
import {renderSimilarAds, clearSimilarAds} from './similar.js';

clearSimilarAds();
disableFormAddAds();
disableFormFilters();

renderSimilarAds();

activateFormAddAds();
activateFormFilters();
