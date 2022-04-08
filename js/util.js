const ALERT_SHOW_TIME = 5000;

/**
 * Получение существительного соответствующего склонения числительному
 * @param {number} quantity количество элементов (числительное соответствующее существительному)
 * @param {array} wordForms массив вариантов склонения одного слова: при единице, от двух до четырех, от пяти до девяти либо десятки
 * @returns {string} существительного соответствующего склонения числительному
 */
const declineWord = (quantity, wordForms) => {
  const quantity100 = Math.abs(quantity) % 100;
  const quantity10 = quantity100 % 10;
  if (quantity100 > 10 && quantity100 < 20) { return wordForms[2]; }
  if (quantity10 > 1 && quantity10 < 5) { return wordForms[1]; }
  if (quantity10 === 1) { return wordForms[0]; }
  return wordForms[2];
};

/**
 * Добавление атрибута блокировки изменений для всех полей в объекте
 * @param {object} elements объект полей формы
 */
const disableElements = (elements) => {
  Object.values(elements).forEach((val) => {
    val.setAttribute('disabled','');
  });
};

/**
 * Удаление атрибута блокировки изменений для всех полей в объекте
 * @param {object} elements объект полей формы
 */
const activateElements = (elements) => {
  Object.values(elements).forEach((val) => {
    val.removeAttribute('disabled');
  });
};

/**
 * Проверка была ли нажатая кнопка клавишей Escape
 * @param {event} evt параметры события при нажатии клавиши
 * @returns {boolean} была нажата клавиша Escape
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  const alertText = document.createElement('p');
  alertContainer.appendChild(alertText);

  alertContainer.classList.add('error');
  alertText.style.position = 'relative';
  alertText.style.fontSize = '50px';
  alertText.style.textAlign = 'center';
  alertText.style.fontWeight = '700';
  alertText.style.color = '#ffffff';

  alertText.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {declineWord, activateElements, disableElements, isEscapeKey, showAlert};
