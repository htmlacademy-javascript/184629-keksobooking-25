const SERVER_FOR_GET  = 'https://25.javascript.pages.academy/keksobooking/data';
const SERVER_FOR_SENT = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(SERVER_FOR_GET)
    .then((response) => response.json())
    .then((similarAds) => {
      onSuccess(similarAds);
    })
    .catch(() => {
      onError();
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    SERVER_FOR_SENT,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
