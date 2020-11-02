// vars to access dom elements/buttons
const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleButton = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sortButton = document.getElementById('sort');
const calculateWealthButton = document.getElementById('calculate-wealth');

// initialized array to store an array of objects with values to run methods on
let data = [];
populateData(5)


// fetch random user with api and add money

async function getRandomUser() {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const url = "https://randomuser.me/api";
  const result = await fetch(proxy + url)
  const data = await result.json();
  const firstName = data.results['0'].name.first;
  const lastName = data.results['0'].name.last
  const user = data.results[0];
console.log(result);
  const newUser = {
    name: firstName + ' ' + lastName,
    money: Math.floor(Math.random() * 1000000)
  }
  // locally storing data (users) in an array
  addData(newUser)
  console.log(newUser)
}

function addData(obj) {
  data.push(obj);

  updateDOM();
}

// where the param providedData = points to data for a default value if providedData has not input
function updateDOM(providedData = data) {
  // clear main div (person  wealth area)
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    // adds the class 'person' to this div
    element.classList.add('person');
    element.innerHTML = `<strong> ${item.name} </strong> ${formatMoney(item.money)}`;
    // appendChild uses out element we created above and adds the users to DOM
    main.appendChild(element);

  })
}
//  hoisted function called uptop to populate data with x users
function populateData(x) {
  for (let i = 0; i < x; i++) {
    getRandomUser();
  }
}

function formatMoney(num) {
  return '$' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// uses .map taking in each user, a spread operator is being used on user because the data could grow with additional users.
function doubleMoney () {
  data = data.map((user) => { return { ...user, money: user.money * 2}});
  updateDOM();
  console.log(data)
}
// sorts wealth to find the wealthiest people
function sortWealth () {
data.sort((a, b) => b.money - a.money)
updateDOM();
}

// event listeners
addUserButton.addEventListener('click', getRandomUser);
doubleButton.addEventListener('click', doubleMoney);
sortButton.addEventListener('click', sortWealth);