import { initMap, renderOffers, resetMainMarker, updateView } from './services/map.js';
import { sendData, getOffers } from './services/api.js';
import { activateForm, deactivateForm, onGuestsValidate as onGuestsValidate, resetForm, setAddressValue } from './services/form.js';
import { initFilter, filterOffers, resetFilter } from './services/filters.js';
import { DIALOG_MESSAGES, PINS_NUMBER } from './variables.js';
import { debounce } from './utils/debounce.js';
import { showErrorDialog, showSuccessDialog } from './services/dialog.js';
import { imageShowPreviewHandler } from './services/photo.js';

deactivateForm(true);
onGuestsValidate();
const offerForm = document.querySelector('.ad-form');

const MAP_CONTAINER_ID = 'map-canvas';
const mapCenter = {
  lat: 35.68950,
  lng: 139.69171,
};

const onSendSuccess = () => {
  showSuccessDialog();
  offerForm.reset();
};

const onSendFail = (message) => {
  showErrorDialog(message);
};

let offers = [];
const onGetOffersFail = () => onSendFail(DIALOG_MESSAGES.getOfferError);
const onGetOffersSuccess = (data) => {
  offers = data;
  const slicedOffers = data.slice(0, PINS_NUMBER);
  renderOffers(slicedOffers);
};

const onMapLoad = () => {
  activateForm(true);
  getOffers(onGetOffersSuccess, onGetOffersFail);
};

initMap(MAP_CONTAINER_ID, mapCenter, onMapLoad);

const onFormSubmit = (event) => {
  event.preventDefault();
  sendData(
    onSendSuccess, () => onSendFail(DIALOG_MESSAGES.postOfferError), offerForm);
};

const onFormReset = () => {
  setTimeout(() => {
    resetForm();
    resetFilter();
    updateView(mapCenter);
    resetMainMarker(mapCenter);
  }, 0);
};

offerForm.addEventListener('reset', onFormReset);
offerForm.addEventListener('submit', onFormSubmit);

const debouncedRenderOffers = debounce(() => {
  renderOffers(filterOffers(offers).slice(0, PINS_NUMBER));
});
initFilter(debouncedRenderOffers);

setAddressValue(mapCenter);

imageShowPreviewHandler('#avatar', '.ad-form-header__preview', 'Аватар пользователя', 70);
imageShowPreviewHandler('#images', '.ad-form__photo', 'Фотография жилья', 70);
