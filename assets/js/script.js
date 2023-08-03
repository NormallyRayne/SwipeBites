// Resturant location API
async function restaurantsLocationApi() {
  const url = 'https://worldwide-restaurants.p.rapidapi.com/typeahead';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '61185c9298msh05e9087888395dap1a2be8jsnc2195cf9db75',
      'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
    },
    body: new URLSearchParams({
      language: 'en_US',
      q: "Miami"

    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result
  } catch (error) {
    console.error(error);
  }
}
// First API
async function restaurantsApi() {
  var location = await restaurantsLocationApi()

  const url = 'https://worldwide-restaurants.p.rapidapi.com/search';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '61185c9298msh05e9087888395dap1a2be8jsnc2195cf9db75',
      'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
    },
    body: new URLSearchParams({
      currency: 'USD',
      limit: '20',
      language: 'en_US',
      location_id: location.results.data[0].result_object.location_id

    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result
  } catch (error) {
    console.error(error);
  }
}

async function modifyCard() {
  var restaurantsAr = await restaurantsApi();
  console.log(restaurantsAr);
  for (let i = 1; i < 6; i++) {
    console.log()
    var cardTitleEl = document.getElementById(`card${i}Title`)
    var cardReviewEl = document.getElementById("card" + i + "Review")
    cardTitleEl.innerHTML = restaurantsAr.results.data[i].name
    cardReviewEl.innerHTML = restaurantsAr.results.data[i].description
  }

}
// Call the Asynchronous function
modifyCard();
// Second API
async function weatherApi() {
  const options = {
    method: 'POST',
    headers: {}
  //   // body: new URLSearchParams({
  //   //   temp:
  //   //   humidity:
  //   //   wind speed:
  //   }
  // }

  // try {
  //   const response = await fetch(url);
  //   const result = await response.json();
  //   console.log(result);
  // } catch (error) {
  //   console.error(error);
  }
}

async function secondApi() {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=Miami&units=imperial&appid=4ebaaab317fa6d57e537202816ef42eb';
  const options = {
    method: 'GET',
    headers: {
      //     'X-RapidAPI-Key': '61185c9298msh05e9087888395dap1a2be8jsnc2195cf9db75',
      //     'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}


// Call the second API function
secondApi();

//   Swipe feature 
'use strict';

var tinderContainer = document.querySelector('.tinder');
var allCards = document.querySelectorAll('.tinder--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');

function initCards(card, index) {
  var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    card.style.opacity = (10 - index) / 10;
  });

  tinderContainer.classList.add('loaded');
}

initCards();

allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    tinderContainer.classList.remove('tinder_love');
    tinderContainer.classList.remove('tinder_nope');

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle('removed', !keep);

    if (keep) {
      event.target.style.transform = '';
    } else {
      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      initCards();
    }
  });
});

function createButtonListener(love) {
  return function (event) {
    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];

    card.classList.add('removed');

    if (love) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }

    initCards();

    event.preventDefault();
  };
}

var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);

nope.addEventListener('click', nopeListener);
love.addEventListener('click', loveListener);

// End of swipe feature

let rightSwipedRestaurants = [];

// Add event listeners for right swipes
love.addEventListener('click', function (event) {
  handleSwipe(true);
  event.preventDefault();
});

function handleSwipe(isRightSwipe) {
  var cards = document.querySelectorAll('.tinder--card:not(.removed)');
  var moveOutWidth = document.body.clientWidth * 1.5;

  if (!cards.length) return false;

  var card = cards[0];

  card.classList.add('removed');

  if (isRightSwipe) {
    // If it's a right swipe, store the ID of the right-swiped restaurant in the array
    const restaurantID = card.getAttribute('data-restaurant-id');
    rightSwipedRestaurants.push(restaurantID);
    // Save the array in local storage
    localStorage.setItem('rightSwipedRestaurants', JSON.stringify(rightSwipedRestaurants));

    card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    console.log('Right-swiped restaurant ID:', restaurantID);
    console.log('Updated rightSwipedRestaurants:', rightSwipedRestaurants);
  } else {

    card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
  }

  initCards();
}

// Retrieve the right swipes from local storage, if any
const cachedRightSwipes = localStorage.getItem('rightSwipedRestaurants');
if (cachedRightSwipes) {
  rightSwipedRestaurants = JSON.parse(cachedRightSwipes);
}