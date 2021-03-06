import { FORM_URL, OFFERS_URL } from '../variables.js';

const doFetch = (url, options) =>
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    });
const sendData = (onSuccess, onFail, formElem) => {
  const options = {
    method: 'POST',
    body: new FormData(formElem),
  };

  doFetch(FORM_URL, options)
    .then((json) => {
      onSuccess(json);
    })
    .catch((err) => {
      onFail(err);
    });
};

const getOffers = (onSuccess, onFail) => {
  doFetch(OFFERS_URL)
    .then((data) => {
      if (onSuccess !== undefined && typeof onSuccess === 'function') {
        onSuccess(data);
      }
    })
    .catch((err) => {
      if (onFail !== undefined && typeof onFail === 'function') {
        onFail(err);
      }
    });
};

export { sendData, getOffers };
