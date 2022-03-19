import {generateAdsNearby} from './data.js';

const renamingTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const generateFeatureList = (card, features) => {
  const featuresContainer = card.querySelector('.popup__features');
  const featureList = featuresContainer.querySelectorAll('.popup__feature');
  const modifiers = features.map((feature) => `popup__feature--${feature}`);

  featureList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });
};
const renderPhotos = (templateElement, data) => {
  const photosFragment = document.createDocumentFragment();
  const photosContainer = templateElement.querySelector('.popup__photos');
  const photoItem = photosContainer.querySelector('.popup__photo');

  data.forEach((photo) => {
    const photoTemplate = photoItem.cloneNode();
    photoTemplate.src = photo;
    photosFragment.append(photoTemplate);
  });
  photosContainer.innerHTML = '';
  photosContainer.append(photosFragment);
};

const adsList = document.querySelector('.map__canvas');
const similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
adsList.appendChild(similarCardTemplate.cloneNode());
const similarAds = generateAdsNearby();
const similarListFragment = document.createDocumentFragment();

similarAds.forEach(({author, offer}) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').insertHTML = '<p class="popup__text popup__text--price">offer.price<span> ₽/ночь</span></p>';
  cardElement.querySelector('.popup__type').textContent = renamingTypes[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if (offer.features!==undefined) {
    generateFeatureList (cardElement, offer.features);
  } else {cardElement.querySelector('.popup__features').remove();}
  if (offer.description!==undefined) {
    cardElement.querySelector('.popup__description').textContent = offer.description;
  } else {cardElement.querySelector('.popup__description').remove();}
  if (offer.photos!==undefined) {
    renderPhotos (cardElement, offer.photos);
  } else {cardElement.querySelector('.popup__photos').remove();}

  similarListFragment.appendChild(cardElement);
});

adsList.appendChild(similarListFragment);

