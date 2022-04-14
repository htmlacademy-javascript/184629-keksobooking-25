/* eslint no-use-before-define: 0 */
import {isEscapeKey} from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeMessage(document.body.lastChild.className);
  }
};
const onMessageClick = (evt) => {
  closeMessage(evt.target.className);
};

const closeMessage = (category) => {
  const message = document.querySelector(`.${category}`);
  message.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
};

const renderMessage = (category) => {
  let newMessage;
  if (category === 'success') {
    newMessage = successMessageTemplate.cloneNode(true);
  } else {
    newMessage = errorMessageTemplate.cloneNode(true);
  }
  document.body.append(newMessage);

  document.addEventListener('keydown', onMessageEscKeydown);
  newMessage.addEventListener('click', onMessageClick);
};

export {renderMessage};
