// TODO: get mailingOptions from api
// This is only mockup data!
const mailingOptions = ["Nouto", "Postitus"];

const dropdownInput = document.querySelector('#dropdownInput');
const dropdownIcon = document.querySelector('#dropdownIcon');
const dropdownWrapper = document.querySelector('#dropdownWrapper');
let selectedMailingOptions = [];

dropdownInput.addEventListener('input', () => {
    onInputChange(dropdownInput, dropdownWrapper, mailingOptions, selectedMailingOptions);
});

dropdownInput.addEventListener('focusin',  () => {
    onInputChange(dropdownInput, dropdownWrapper, mailingOptions, selectedMailingOptions);
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