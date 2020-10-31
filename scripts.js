// vars to access dom elements/buttons
const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleButton = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sortButton = document.getElementById('sort');
const calculateWealthButton = document.getElementById('calculate-wealth');

// initialized array to store an array of objects with values to run methods on
let data = [];
getRandomUser();
getRandomUser();
getRandomUser();
// fetch random user with api and add money

async function getRandomUser() {
  const result = await fetch('https://randomuser.me/api');
  const data = await result.json();
  const firstName = data.results['0'].name.first;
  const lastName = data.results['0'].name.last
  const user = data.results[0];


  const newUser = {
    name: firstName + ' ' + lastName,
    money: Math.floor(Math.random() * 1000000)
  }
  // locally storing data (users) in an array
  addData(newUser)
}

function addData (obj) {
  data.push(obj);

  updateDOM();
}

// where the param providedData = points to data for a default value if providedData has not input
function updateDOM (providedData = data) {
// clear main div (person  wealth area)
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

providedData.forEach(item => {
const element = document.createElement('div');
// adds the class 'person' to this div
element.classList.add('person');
element.innerHTML = `<strong> ${item.name} </strong> ${item.money}`

})
}

