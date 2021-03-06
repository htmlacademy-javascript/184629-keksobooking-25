import {declineWord} from './util.js';
import {isSuitableAds} from './form-filters.js';

const renamingTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const generateCapacity = (rooms, guests) => {
  const textOfRooms = ['комната', 'комнаты', 'комнат'];
  const guestText = `${guests === 1 ? 'гостя' : 'гостей'}`;

  return `${rooms} ${declineWord(rooms, textOfRooms)} для ${guests} ${guestText}`;
};
const generateFeatureList = (card, features) => {
  const featuresList = card.querySelector('.popup__features');
  featuresList.innerHTML = '';
  features.forEach((feature)=>{
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature', `popup__feature--${feature}`);
    featuresList.appendChild(featureItem);
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

const getSimilarAds = (similarAds) => isSuitableAds(similarAds);

const renderSimilarAds = ({author, offer}) => {
  const cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = `${offer.price}<span> ₽/ночь </span>`;
  cardElement.querySelector('.popup__type').textContent = renamingTypes[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = generateCapacity(offer.rooms, offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if (offer.features) {
    generateFeatureList(cardElement, offer.features);
  } else {cardElement.querySelector('.popup__features').remove();}
  if (offer.description) {
    cardElement.querySelector('.popup__description').textContent = offer.description;
  } else {cardElement.querySelector('.popup__description').remove();}
  if (offer.photos) {
    renderPhotos(cardElement, offer.photos);
  } else {cardElement.querySelector('.popup__photos').remove();}
  return cardElement;
};

export {renderSimilarAds, getSimilarAds};
