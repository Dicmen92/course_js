'use strict';

let money = 12000,
mission = 35000,
addExpenses = 'Интернет, Телефон, Билет на метро',
expenses1 = 'Поход в кино',
expenses2 = 'Поездка на природу',
amount1 = 1000,
amount2 = 3500,
deposit = true;
const income = 'Фриланс',
period = 7;

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let start = function () {
  do {
    money = prompt('Ваш месячный доход?', 10000);
  }  
  while (!isNumber(money))
};

let sum = 0;

let startSum = function () {
  do {
    sum = prompt('Во сколько это обойдется?');
  }  
  while (!isNumber(sum)) {
    sum = +sum + +sum;
  };
};

start();

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?', addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses = [];

let getExpensesMonth = function() {    
  for (let i = 0; i < 2; i++) {    
    expenses[i] = prompt('Введите обязательную статью расходов?'); 
    startSum();             
  }  
  return sum;  
}

let expensesAmount = getExpensesMonth();

function getAccumulatedMonth() {
  return +money - expensesAmount;
}

console.log(getAccumulatedMonth());

let accumulatedMonth = getAccumulatedMonth(money);

function getTargetMonth() {
  return Math.ceil(+mission / accumulatedMonth);  
}

let showTypeOf = function(data) {
  console.log(typeof(data));
}

let getStatusIncome = function() {
  if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');  
  } else  if (budgetDay >= 0 && budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else {
    console.log('Что то пошло не так');
  }  
}

showTypeOf(income);
showTypeOf(+money);
showTypeOf(deposit);
console.log('Расходы за месяц', expensesAmount);
console.log(addExpenses.split(' '));

if (getTargetMonth() > 0) {
  console.log('Цель будет достигнута через -', getTargetMonth(), 'мес.');
  } else {
    console.log('Цель не будет достигнута');
  }

let budgetDay = accumulatedMonth / 30;
console.log('Ваш дневной бюджет составляет', Math.floor(budgetDay), 'руб.');

getStatusIncome();