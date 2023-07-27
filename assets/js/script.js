// First API
async function restaurantsApi() {
    const url = 'https://worldwide-restaurants.p.rapidapi.com/reviews';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '61185c9298msh05e9087888395dap1a2be8jsnc2195cf9db75',
        'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
      },
      body: new URLSearchParams({
        currency: 'USD',
        limit: '15',
        language: 'en_US',
        location_id: '15333482',
      }),
    };
  
    try {
      const response = await fetch(url, options);
      console.log(response);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  
  // Call the asynchronous function
  restaurantsApi();
  
  // Second API
  async function secondApi() {
    const url = 'https://ip-geo-location.p.rapidapi.com/ip/check?format=json';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '61185c9298msh05e9087888395dap1a2be8jsnc2195cf9db75',
        'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com',
      },
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  
  // Call the second API function
  secondApi();
  