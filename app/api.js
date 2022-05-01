const currencyFrom = document.querySelectorAll(".each-currency-from");
const currencyTo = document.querySelectorAll(".each-currency-to");
const convertToInput = document.getElementById("convert-to-area");
const convertFromInput = document.getElementById("convert-from-area");
const countOfMoneyFrom = document.getElementById("count-of-money-from");
const countOfMoneyTo = document.getElementById("count-of-money-to");
const menuIcon = document.querySelector("#menu-bar")
const ul = document.querySelector("ul")
let ourCurrency = "RUB";
let convertCurrency = "USD";

currencyFrom.forEach((item) => {
  item.addEventListener("click", (e) => {
    ourCurrency = e.target.innerHTML;
    currencyFrom.forEach((element) => {
      element.style.backgroundColor = "white";
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      }
    });
    e.target.classList.add("active");
    e.target.style.backgroundColor = "#833AE0";

    convertValueFrom();
  });
});

currencyTo.forEach((item) => {
  item.addEventListener("click", (e) => {
    convertCurrency = e.target.innerHTML;
    currencyTo.forEach((element) => {
      element.style.backgroundColor = "white";
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      }
    });
    e.target.classList.add("active");
    item.style.backgroundColor = "#833AE0";
    item.classList.add("active");
    convertValueFrom();
  });
});

convertFromInput.addEventListener("keyup", convertValueFrom);

function convertValueFrom() {
  fetch(
    `https://api.exchangerate.host/latest?base=${ourCurrency}&symbols=${convertCurrency}`
  )
    .then((data) => data.json())
    .then((res) => {
      countOfMoneyFrom.innerHTML = `1 ${ourCurrency} = ${res.rates[convertCurrency]} ${convertCurrency}`;
      convertToInput.value =
        (convertFromInput.value * res.rates[convertCurrency]).toFixed(2);
    });
  fetch(
    `https://api.exchangerate.host/latest?base=${convertCurrency}&symbols=${ourCurrency}`
  )
    .then((data) => data.json())
    .then((res) => {
      countOfMoneyTo.innerHTML = `1 ${convertCurrency} = ${res.rates[ourCurrency]} ${ourCurrency}`;
    });
}

convertToInput.addEventListener("keyup", convertValueTo);

function convertValueTo() {
    fetch(
        `https://api.exchangerate.host/latest?base=${convertCurrency}&symbols=${ourCurrency}`
      )
        .then((data) => data.json())
        .then((res) => {
            countOfMoneyFrom.innerHTML = `1 ${ourCurrency} = ${res.rates[convertCurrency]} ${convertCurrency}`;
            convertFromInput.value = (convertToInput.value * res.rates[ourCurrency]).toFixed(2);
        });
      fetch(
        `https://api.exchangerate.host/latest?base=${ourCurrency}&symbols=${convertCurrency}`
      )
        .then((data) => data.json())
        .then((res) => {
          countOfMoneyFrom.innerHTML = `1 ${ourCurrency} = ${res.rates[convertCurrency]} ${convertCurrency}`;
        });
}

menuIcon.addEventListener("click",(e)=>{

  // if(ul.classList.contains("open")){
  //   // ul.classList.remove("open")
  //   // ul.style.display = "none" 

   
  // }
  ul.style.display = "inline-block"
  ul.classList.add("open")
  // ul.style.display = "none"
  

})
