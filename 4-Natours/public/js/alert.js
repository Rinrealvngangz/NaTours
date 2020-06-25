/* eslint-disable */

// type 'success' or 'error'

export const hideAlert = () => {
  const e = document.querySelector('.alert');
  if (e) e.parentElement.removeChild(e);
};

export const showAlert = (type, msb) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msb}</div`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};
