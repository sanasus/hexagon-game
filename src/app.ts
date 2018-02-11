import 'normalize.css';
import './assets/scss/app.scss';
import {secretButton, secretParagraph } from './assets/ts/dom-loader';

let showSecret: boolean = false;

secretButton!.addEventListener('click', toggleSecretState);

updateSecretParagraph();

//methods
function toggleSecretState(): void
{
    showSecret = !showSecret;
    updateSecretParagraph();
    updateSecretButton();
}

function updateSecretButton(): void
{
    if (showSecret)
        secretButton!.textContent = 'Hide the Secret';
    else
        secretButton!.textContent = 'Show the Secret';
}

function updateSecretParagraph(): void
{
    if (showSecret)
        (<HTMLElement>secretParagraph!).style.display = 'block';
    else
        (<HTMLElement>secretParagraph!).style.display = 'none';
}