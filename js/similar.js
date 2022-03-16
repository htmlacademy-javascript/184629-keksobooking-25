import {generateAdsNearby} from "./data.js";

const adsList = document.querySelector('.map__canvas');
const similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const cardElement = similarCardTemplate.cloneNode();
adsList.appendChild(cardElement);

const similarAds = generateAdsNearby();

const similarListFragment = document.createDocumentFragment();

const generateFeatureList = (card, features) => {
  const featuresContainer = card.querySelector('.popup__features');
  const featureList = featuresContainer.querySelectorAll('.popup__feature');
  const modifiers = features.map((feature) => 'popup__feature--' + feature);

  featureList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });
}

similarAds.forEach(({author, offer}) => {

  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').insertHTML = '<p class="popup__text popup__text--price">offer.price<span> ₽/ночь</span></p>';
  cardElement.querySelector('.popup__type').textContent = offer.type; //нужно сопоставить
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  generateFeatureList (cardElement, offer.features);
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__photo').src=offer.photos[0];

  similarListFragment.appendChild(cardElement);
});

adsList.appendChild(similarListFragment);

