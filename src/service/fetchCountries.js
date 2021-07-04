const URL = 'https://restcountries.eu/rest/v2/name/'

function fetchCountries(path = '/') {
    return fetch(URL+path)
        .then(response => response.json()).then((data) => {
      if (data.error) {
        return Promise.reject(error);
      }
      return data;
    });
}

export { fetchCountries}