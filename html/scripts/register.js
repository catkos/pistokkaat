// TODO: get municipalities from api
// This is only mockup data!
const municipalities = ["Helsinki","Vantaa","Espoo","Joensuu","Rovaniemi", "Hamina", "Elojärvi"];

const dropdownInput = document.querySelector('#dropdownInput');
const dropdownIcon = document.querySelector('#dropdownIcon');
const dropdownWrapper = document.querySelector('#dropdownWrapper');

dropdownInput.addEventListener('input', () => {
  onInputChange(dropdownWrapper, dropdownInput, municipalities);
});

dropdownInput.addEventListener('focusin',  () => {
  onInputChange(dropdownWrapper, dropdownInput, municipalities);
});

dropdownIcon.addEventListener('click', () => {
  // Get ul list
  const listEl = document.querySelector('#dropdownList');

  // If it exists, remove it
  if (listEl) {
    listEl.remove();
    return;
  }

  addFocusToInputEl(dropdownInput);
});