
const URL = 'https://restcountries.com/v3.1/name/';
const searchParams = new URLSearchParams({
    fields: 'name,capital,population,flags,languages,',
});

export const fetchCountries = (name) => {
    return fetch(`${URL}${name}?${searchParams}`)
    // return fetch(`${URL}${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
};

// https://restcountries.com/v3.1/{service}?fields={field},{field},{field},{field},{field}
// https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages




