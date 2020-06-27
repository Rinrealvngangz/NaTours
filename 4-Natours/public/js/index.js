/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapBox';
import { updateData } from './updateSetting';

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.from--login');
const loginOut = document.querySelector('.nav__el--logout');
const userDataFrom = document.querySelector('.form-user-data');

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
if (userDataFrom)
  userDataFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    updateData(name, email);
  });
