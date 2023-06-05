import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.getElementById('breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

let currentBreedId = null;
let catData = null;

function showLoader() {
  loader.classList.remove('invisible');
}

function hideLoader() {
  loader.classList.add('invisible');
}

function showError() {
  error.classList.remove('invisible');
}

function hideError() {
  error.classList.add('invisible');
}

function showCatInfo() {
  catInfo.style.display = 'flex';
}

function hideCatInfo() {
  catInfo.style.display = 'none';
}

function displayCatInfo(catData) {
  
  const catName = catData.name;
  const catDescription = catData.description;
  const catTemperament = catData.temperament;
  const catImageURL = catData.url
;

  const catInfoHTML = `
    <img src="${catImageURL}" class="cat-img" width="400" height="400">
    <div class="cat-text">
    <h1>${catName}</h1>
    <p>${catDescription}</p>
    <p><span class="temperament">Temperament: </span>${catTemperament}</p>
    </div>
  `;

  catInfo.innerHTML = catInfoHTML;
}

function handleBreedSelectChange(event) {
  event.preventDefault();
  const selectedBreedId = event.target.value;
  if (selectedBreedId !== currentBreedId) {
    currentBreedId = selectedBreedId;
    hideError();
    hideCatInfo();
    showLoader();

    fetchCatByBreed(selectedBreedId)
      .then(data => {
        catData = data;
        hideLoader();
        showCatInfo();
        displayCatInfo(catData);
      })
      .catch(error => {
        hideLoader();
        showError();
      });
  }
}

function initializeApp() {
  showLoader();

  fetchBreeds()
    .then(breeds => {
      hideLoader();
      hideError();
      breedSelect.disabled = false;
      new SlimSelect({
        select: breedSelect,
        placeholder: 'Select a breed',
        allowDeselect: true,
        onChange: handleBreedSelectChange,
        data: breeds.map(breed => ({ text: breed.name, value: breed.id })),
      });
    })
    .catch(error => {
      hideLoader();
      showError();
    });
}

breedSelect.addEventListener('change', handleBreedSelectChange);

initializeApp();