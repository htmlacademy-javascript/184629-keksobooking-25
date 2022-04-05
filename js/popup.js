/* eslint no-use-before-define: 0 */
import {isEscapeKey} from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const closeSuccessMessage = () => {
  const successMessage = document.querySelector('.success');
  successMessage.remove();
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
};
const closeErrorMessage = () => {
  const errorMessage = document.querySelector('.error');
  errorMessage.remove();
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
};

const onSuccessMessageEscKeydown = (event) => {
  if (isEscapeKey(event)) {
    closeSuccessMessage();
  }
};
const onSuccessMessageClick = () => {
  closeSuccessMessage();
};

const onErrorMessageEscKeydown = (event) => {
  if (isEscapeKey(event)) {
    closeErrorMessage();
  }
};
const onErrorMessageClick = () => {
  closeErrorMessage();
};

const renderSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);

  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  successMessage.addEventListener('click', onSuccessMessageClick);
};

const renderErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.prepend(errorMessage);

  document.addEventListener('keydown', onErrorMessageEscKeydown);
  errorMessage.addEventListener('click', onErrorMessageClick);
};

export {renderSuccessMessage, renderErrorMessage};
