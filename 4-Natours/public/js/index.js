/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapBox';

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');
const loginOut = document.querySelector('.nav__el--logout');
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}
if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (loginOut) loginOut.addEventListener('click', logout);
