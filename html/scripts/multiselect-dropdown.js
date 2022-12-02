

// multiselect dropdown

const onMailingInputChange = (input, appendEl, array, selectedArray) => {
    removeMultiSelectDropDown();
    createMultiSelectDropDown(input, appendEl, array, selectedArray);
}

const onMailingButtonClick = (e, input, array) => {
    // Prevent default event
    e.preventDefault();

    // Get the button that is the target of the click event
    const buttonEl = e.target;

    if(array.includes(buttonEl.innerHTML)) {
        const index = array.indexOf(buttonEl.innerHTML);
        array.splice(index, 1);
    } else {
        array.push(buttonEl.innerHTML);
        array.sort();
    }

    input.value = array.filter((item) => {
        return item;
    }).join(', ');
    
    removeMultiSelectDropDown();
}

const createMultiSelectDropDown = (input, appendEl, array, selectedArray) => {
    // Create ul for dropdown
    const listEl = document.createElement('ul');
    listEl.className = 'dropdownList';
    listEl.id = 'dropdownList';

    // Foreach array to button's inside list
    array.forEach((item) => {
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.innerHTML = item;

        button.addEventListener('click', (e) => {
            onMailingButtonClick(e, input, selectedArray);
        });

        if (selectedArray.includes(item)) {
            button.className = 'selected';
        }

        listItem.appendChild(button);
        listEl.appendChild(listItem);
    });

    // Append ul list
    appendEl.appendChild(listEl);
}

const removeMultiSelectDropDown = () => {
    // Get ul list
    const listEl = document.querySelector('#dropdownList');

    // If it exists, remove it
    if (listEl) listEl.remove();
}

const addFocusToMailingInputEl = (input) => {
    input.focus();
}

// gsdgsd

// TODO: get mailingOptions from api
// This is only mockup data!
const mailingOptions = ["Nouto", "Postitus"];

const dropdownMailingInput = document.querySelector('#dropdownMailingInput');
const dropdownMailingIcon = document.querySelector('#dropdownMailingIcon');
const dropdownMailingWrapper = document.querySelector('#dropdownMailingWrapper');
let selectedMailingOptions = [];

dropdownMailingInput.addEventListener('input', () => {
    onMailingInputChange(dropdownMailingInput, dropdownMailingWrapper, mailingOptions, selectedMailingOptions);
});

dropdownMailingInput.addEventListener('focusin',  () => {
    onMailingInputChange(dropdownMailingInput, dropdownMailingWrapper, mailingOptions, selectedMailingOptions);
});

dropdownMailingIcon.addEventListener('click', () => {
    // Get ul list
    const listEl = document.querySelector('#dropdownList');

    // If it exists, remove it
    if (listEl) {
        listEl.remove();
        return;
    }

    addFocusToMailingInputEl(dropdownMailingInput);
});