'use strict';

// Create dialog
const createDialog = (string) => {
    const oldDialog = document.querySelector('dialog');
    if (oldDialog) {oldDialog.remove()};
    const main = document.querySelector('main');
    const dialog = document.createElement('dialog');
    const pEl = document.createElement('p');
    pEl.innerHTML = string;
    const form = document.createElement('form');
    form.method = 'dialog';
    const button = document.createElement('button');
    button.className = 'primaryButton';
    button.innerHTML = 'OK'
    dialog.appendChild(pEl);
    form.appendChild(button);
    dialog.appendChild(form);
    main.appendChild(dialog);
    dialog.showModal();
};