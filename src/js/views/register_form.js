function serializeCountries(countries) {
  return Object.keys(countries).map(key => {
    return {
      id: key,
      country_name: countries[key]
    };
  })
}

function optionCountryTemplate(country) {
  return `
    <option value="${country.id}">${country.country_name}</option>
  `;
}


function optionCityTemplate(city) {
  return `
    <option value="${city.id}">${city.city_name}</option>
  `;
}

export { serializeCountries, optionCountryTemplate, optionCityTemplate };
