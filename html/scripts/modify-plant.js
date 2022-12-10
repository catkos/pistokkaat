// TODO: get mailingOptions from api
// This is only mockup data!
const mailingOptions = ["Nouto", "Postitus"];

const descriptionInput = document.querySelector('#descriptionInput');
const descriptionCharCounterText = document.querySelector('#descriptionCharCounter');
const instructionInput = document.querySelector('#instructionInput');
const instructionCharCounterText = document.querySelector('#instructionCharCounter');
const dropdownInput = document.querySelector('#dropdownInput');
const dropdownIcon = document.querySelector('#dropdownIcon');
const dropdownWrapper = document.querySelector('#dropdownWrapper');
let selectedMailingOptions = [];

// Count characters and add under input
const charCounter = (input, counterText) => {
    const count = input.value.length;
    counterText.innerHTML = count + '/280';
}

descriptionInput.addEventListener('keyup', () => {
    charCounter(descriptionInput, descriptionCharCounterText);
});

descriptionInput.addEventListener('keydown', () => {
    charCounter(descriptionInput, descriptionCharCounterText);
});

instructionInput.addEventListener('keyup', () => {
    charCounter(instructionInput, instructionCharCounterText);
});

instructionInput.addEventListener('keydown', () => {
    charCounter(instructionInput, instructionCharCounterText);
});

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