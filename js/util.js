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
 * @returns {string} случайное число из заданного диапазона, в формате добавления 0 перед однозначными числами
 */
const getUserNumber = (min, max) => {
  const randomNumber = getRandomNumber(min, max);
  return `${randomNumber > 9 ? '' : '0'}${randomNumber}`;
};

/**
 * Получение случайно переупорядоченного массива (Тасование Фишера Йетса)
 * @param {array} array исходный массив элементов
 * @returns {array} новый массив отсортированный случайным образом
 */
const shuffle = (array) => {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/**
 * Получение уникального (из не повторяющихся элементов) массива случайной длины
 * @param {array} array исходный массив элементов
 * @returns {array} новый массив из случайного количества неповторяющихся элементов исходного массива
 */
const getUniqueArray = (array) => {
  const randomLength = getRandomNumber(1, array.length);
  const sortedArray = shuffle(array);

  return sortedArray.slice(0,randomLength);
};

export {getRandomNumber, getRandomArrayElement, getUserNumber, shuffle, getUniqueArray};
