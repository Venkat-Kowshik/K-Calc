let title = document.querySelector('#title');
let answer, calories, foodString, row, n;
let table = document.querySelector('#logs')
let query = ""
let sno = 1;
let intake = document.querySelector('#intake');
let inVal = parseFloat(localStorage.getItem('intake'));
let cell0, cell1, cell2, cell3;
let tableBody = document.getElementById("tableBody");
let url = "https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query="
let cgoal = document.querySelector('#cgoal')
cgoal.textContent = 'Calorie Goal: ' + localStorage.getItem('calgoal') + ' cal'
if (localStorage.getItem('calgoal') == null)
  cgoal.textContent = 'Calorie Goal: Not Set'
update()
function updateIntake() {

}
function addEntry() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '547550b7e2msh9d4ef5e830e2e90p19764bjsn0bf84328d5eb',
      'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
    }
  };
  query = title.value;
  query = query.replace(/ /g, '%20')
  console.log(url + query);
  fetch(url + query, options)
    .then(response => response.json())
    .then(response => answer = response)
    .then(response => n = response.length)
    .then(() => {
      row = table.insertRow(-1);
      foodString = ""
      calories = 0
      for (let i = 0; i < n; i++) {
        foodString += answer[i].name + ", ";
        calories += answer[i].calories;
      }
      foodString = foodString.slice(0, -2);
      commit(foodString, calories)
      inVal = parseFloat(inVal)
      inVal += calories;
      intake.textContent = 'Current Intake: ' + inVal.toFixed(3) + ' cal'
      localStorage.setItem('intake', inVal);
      sno++
    })
    .catch(err => console.error(err));
  row = table.insertRow(-1);
  for (let i = 0; i < n; i++) {
    foodString += answer[i].name;
    console.log(foodString)
  }
}
function commit(food, calories) {
  console.log(calories)
  if (localStorage.getItem('itemsJson') == null) {
    itemJsonArray = [];
    itemJsonArray.push([food, calories]);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
  }
  else {
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([food, calories]);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
  }
  console.log(calories)
  let str = `
				  <tr>
				  <th scope="row">${sno}</th>
				  <td>${food}</td>
				  <td>${calories}</td> 
				  </tr>`;
  tableBody.innerHTML += str;
}
function update() {
  if (localStorage.getItem('itemsJson') == null) {
    itemJsonArray = [];
    console.log("hello")
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
  }
  else {
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }
  let tableBody = document.getElementById("tableBody");
  let str = "";
  tableBody.innerHTML = ""
  localStorage.setItem('intake', 0)
  inVal = 0
  itemJsonArray.forEach((element, index) => {
    inVal += element[1];
    sno++;
    str += `
				  <tr>
				  <th scope="row">${index + 1}</th>
				  <td>${element[0]}</td>
				  <td>${element[1]}</td>
				  </tr>`;
  });
  intake.textContent = 'Current Intake: ' + inVal.toFixed(3) + ' cal'
  localStorage.setItem('intake', inVal)
  tableBody.innerHTML = str;
}

function clearStorage() {
  if (confirm("Do you areally want to clear?")) {
    console.log('Clearing the storage')
    localStorage.clear();
    sno = 1;
    intake.textContent = 'Current Intake: ' + 0 + ' cal'
    localStorage.setItem(intake, 0);
    update()
  }
}