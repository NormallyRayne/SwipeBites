const url = 'https://worldwide-restaurants.p.rapidapi.com/search';
const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'da46b2c39amshc1d73aed7781c16p145075jsn396e86173253',
        'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
    },
    body: new URLSearchParams({
        language: 'en_US',
        limit: '30',
        location_id: '297704',
        currency: 'USD'
    })
};
async function gitapi() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }

} 
gitapi()
