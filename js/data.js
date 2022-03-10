import {getRandomNumber, getUserNumber, getRandomArrayElement, getUniqueArray} from './util';

const TITLES = [
  'Уютная комнатка для двоих',
  'Скромная хатка холостяка',
  'Комната-студия',
  'Тишина и покой за скромные деньги',
  'Лучший номер на одну ночь'
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];
const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const DESCRIPTIONS = [
  'Расположен в центре города (5 минут от метро), площадь 20 кв.м., 2 спальни, кухня оснащена всей необходимой техникой.',
  'Кухня, кровать, туалет, ванная - всё что необходимо для жизни!',
  'Квартира с уютом и душой, удобный диванчик, мягкая кроватка. На кухне много шкафчиков, холодильник, электрическая плита и духовка.'
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const AD_NEARBY_COUNT = 10;

const createAdvertisement = () => {
  const lat = getRandomNumber(35.65, 35.7, 5);
  const  lng = getRandomNumber(139.7, 139.8, 5);

  return {
    author: {
      avatar: `img/avatars/user${getUserNumber(1, 10)}.png`
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomNumber(200, 7000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 4),
      guests: getRandomNumber(1, 5),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: getUniqueArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getUniqueArray(PHOTOS)
    },
    location: {
      lat: lat,
      lng: lng
    }
  };
};

const generateAdsNearby = () => Array.from({length: AD_NEARBY_COUNT}, createAdvertisement);

export {generateAdsNearby};
