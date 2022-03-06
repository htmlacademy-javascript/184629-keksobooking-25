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

/**
 * Получение случайного числа из заданного диапазона
 * @param {number} min минимальное значение диапазона от нуля и выше
 * @param {number} max максимальное значение диапазона
 * @param {number} [decimal=0] количество знаков после запятой
 * @returns {number} случайное число из заданного диапазона
 */
const getRandomNumber = (min, max, decimal) => {
  if (min < 0 || max < 0) {
    throw new Error('Диапазон должен состоять из положительных цифр, включая ноль');
  }
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  return Number((Math.random() * (upper - lower) + lower).toFixed(decimal));
};

/**
 * Получение случайного элемента из массива
 * @param {Array} elements массив элементов
 * @returns {String|Number} случайный элемент массива
 */
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

/**
 * Получение случайного номера из диапазона, в формате добавления 0 перед однозначными числами
 * @param {number} min минимальное значение диапазона от нуля и выше
 * @param {number} max максимальное значение диапазона
 * @returns {number} случайное число из заданного диапазона, в формате добавления 0 перед однозначными числами
 */
const getUserNumber = (min, max) => {
  const randomNumber = getRandomNumber(min, max);
  return randomNumber > 9 ? randomNumber : ['0',randomNumber].join('');
};

/**
 * Получение массива из случайного количества неповторяющихся элементов
 * @param {array} array исходный массив элементов
 * @returns {array} новый массив из случайного количества неповторяющихся элементов исходного массива
 */
const getUniqueArray = (array) => {
  const length = getRandomNumber(1, FEATURES.length);
  const result = [];

  while(result.length < length) {
    const newElement = getRandomArrayElement(array);
    if(!result.includes(newElement)) {
      result.push(newElement);
    }
  }
  return result;
};

const createAdvertisement = () => {
  const lat = getRandomNumber(35.65, 35.7, 5);
  const  lng = getRandomNumber(139.7, 139.8, 5);

  return {
    author: {
      avatar: ['img/avatars/user',getUserNumber(1, 10),'.png'].join('')
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: [lat, lng].join(', '),
      price: getRandomNumber(200, 7000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 4),
      guests: getRandomNumber(1, 5),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: getUniqueArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: Array.from({length: getRandomNumber(1, PHOTOS.length)}, () => getRandomArrayElement(PHOTOS))
    },
    location: {
      lat: lat,
      lng: lng
    }
  };
};

const advertisementNearby = Array.from({length: AD_NEARBY_COUNT}, createAdvertisement);

alert(advertisementNearby);
