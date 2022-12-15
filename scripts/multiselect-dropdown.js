'use strict';

const onInputChange = (input, appendEl, array, selectedArray) => {
    removeMultiSelectDropDown();
    createMultiSelectDropDown(input, appendEl, array, selectedArray);
};

const onButtonClick = (e, input, array) => {
    // Prevent default event
    e.preventDefault();
    // Get the button that is the target of the click event
    const buttonEl = e.target;
    const arrayIndex = array.findIndex(item => item && item.name === buttonEl.innerHTML);
    if (arrayIndex !== -1) {
        array.splice(arrayIndex, 1);
    } else {
        array.push({id: buttonEl.value, name: buttonEl.innerHTML});
        // Sort array by name
        array.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // Ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // Ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // Names must be equal
            return 0;
        });
    }
    input.value = array.map((item) => {
        return item.name;
    }).join(', ');
    removeMultiSelectDropDown();
};

const createMultiSelectDropDown = (input, appendEl, array, selectedArray) => {
    // Create ul for dropdown
    const listEl = document.createElement('ul');
    listEl.className = 'dropdownList';
    listEl.id = 'dropdownList';
    // Foreach array to button's inside list
    array.forEach((item, index) => {
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.value = item.id;
        button.innerHTML = item.name;
        button.addEventListener('click', (e) => {
            onButtonClick(e, input, selectedArray);
        });
        const selArrayIndex = selectedArray.findIndex(sel => sel && sel.name === item.name);
        if (selArrayIndex !== -1) {
            button.className = 'selected';
        }
        listItem.appendChild(button);
        listEl.appendChild(listItem);
    });
    // Append ul list
    appendEl.appendChild(listEl);
};

const removeMultiSelectDropDown = () => {
    // Get ul list
    const listEl = document.querySelector('#dropdownList');
    // If it exists, remove it
    if (listEl) listEl.remove();
};

const addFocusToInputEl = (input) => {
    input.focus();
};