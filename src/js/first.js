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

money = prompt('Ваш месячный доход?', money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?', addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную статью расходов?', expenses1);
amount1 = prompt('Во сколько это обойдется??', amount1);
expenses2 = prompt('Введите обязательную статью расходов?', expenses2);
amount2 = prompt('Во сколько это обойдется??', amount2);

function getExpensesMonth(amount1, amount2) {
  return +amount1 + +amount2;
}

function getAccumulatedMonth(money) {
  return +money - getExpensesMonth(amount1, amount2);
}

console.log('dfsdfsdf4fsd54fsd56f4', getAccumulatedMonth(money));

let accumulatedMonth = getAccumulatedMonth(money);

function getTargetMonth(mission) {
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
console.log('Расходы за месяц', getExpensesMonth(amount1, amount2));
console.log(addExpenses.split(' '));
console.log('Cрок достижения цели в месяцах', getTargetMonth(mission));

let budgetDay = accumulatedMonth / 30;
console.log('Ваш дневной бюджет составляет', Math.floor(budgetDay), 'руб.');

getStatusIncome();