const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_b13nP3upOqXnnzQ19OdqPyYeBxfaCbgHlfQAQupfcZee9oRqmaFvvYr8TERAkmdg';

export function fetchBreeds() {
  const url = `${BASE_URL}/breeds`;
  const headers = {
    'x-api-key': API_KEY,
  };

  return fetch(url, { headers })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (!data || data.length === 0) {
        throw new Error('No data received from the server.');
      }
      return data;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}


export function fetchCatByBreed(breedId) {
  const url = `${BASE_URL}/images/search?breed_ids=${breedId}`;
  const headers = {
    'x-api-key': API_KEY
  };

  return fetch(url, { headers })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching cat data.');
      }
      return response.json();
    })
    .then(data => {
      if (!data || data.length === 0) {
        throw new Error('No cat data received from the server.');
      }
      const catData = {
        url: data[0].url,
        name: data[0].breeds[0].name,
        description: data[0].breeds[0].description,
        temperament: data[0].breeds[0].temperament
      };
      return catData;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}

