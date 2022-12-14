'use strict';
// TODO: Change url when uploading to server
const url = 'http://localhost:3000';

const loginForm = document.querySelector('#loginForm');

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Get data from form
  const formData = new FormData(loginForm);
  // Create obj for json data and loop form's data to obj
  const obj = {};
  formData.forEach((value, key) => obj[key] = value);
  // Create json data from obj
  const jsonData = JSON.stringify(obj);
  try {
    // Fetch options
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    };
    const response = await fetch(url + '/auth/login', options);
    const json = await response.json();
    if (!json.user) {
      createDialog(json.message, '');
    } else {
      // Save token and user info
      sessionStorage.setItem('token', json.token);
      sessionStorage.setItem('user', JSON.stringify(json.user));
      location.href = 'index.html';
    }
  } catch (e) {
    console.log(e.message);
  }
});