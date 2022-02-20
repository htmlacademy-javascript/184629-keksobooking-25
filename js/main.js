/**
 * Получение случайного целого числа из заданного диапазона
 * @param {number} min минимальное значение диапазона от нуля и выше
 * @param {number} max максимальное значение диапазона
 * @returns {number} случайное число
 */
function getRandomInteger(min,max) {
  if (min < 0 || max < 0) {
    return undefined;
  }
  if (min > max) {
    const minBefore = min;
    min = max;
    max = minBefore;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Получение случайного с плавающей точкой из диапазона
 * @param {number} min минимальное значение диапазона от нуля и выше
 * @param {number} max максимальное значение диапазона
 * @param {number} decimal количество знаков после запятой
 * @returns {number} случайное число с плавающей точкой
 */
function getRandomFloat(min,max,decimal) {
  if (min < 0 || max < 0) {
    return undefined;
  }
  if (min > max) {
    const minBefore = min;
    min = max;
    max = minBefore;
  }
  return Number((Math.random() * (max - min) + min).toFixed(decimal));
}

getRandomInteger(5,10);
getRandomFloat(2.3,6.8,2);
