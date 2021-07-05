const URL = 'https://restcountries.eu/rest/v2/name/'

function fetchCountries(path = '/') {
    return fetch(URL+path)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Error fetching data")
      });
}



export { fetchCountries}