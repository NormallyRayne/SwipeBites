document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedOptions = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => {
        selectedOptions.push(checkbox.value);
    });
    const searchResults = performSearch(selectedOptions);
    // Display the search results
    displayResults(searchResults);
});
function performSearch(selectedOptions) {
    const allResults = [
        { title: 'Burger King', cuisine: 'Fast Food' },
        { title: 'Pizza Hut', cuisine: 'Italian' },
        { title: 'Taco Bell', cuisine: 'Mexican' },
        { title: 'Panda Express', cuisine: 'Asian' },
        { title: 'McDonald\'s', cuisine: 'American' },
        { title: 'KFC', cuisine: 'Fast Food' },
        { title: 'Olive Garden', cuisine: 'Italian' },
    ];
    const filteredResults = selectedOptions.length > 0
        ? allResults.filter(result => selectedOptions.includes(result.cuisine))
        : allResults;
    return filteredResults;
}
function displayResults(searchResults) {
    // Display the search results in the searchResults div or any other HTML element you prefer
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';
    searchResults.forEach((result) => {
        const resultElement = document.createElement('div');
        resultElement.innerHTML = `<h3>${result.title}</h3><p>Cuisine: ${result.cuisine}</p>`;
        searchResultsDiv.appendChild(resultElement);
    });
}