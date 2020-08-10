'use strict';

let money = 10000,
mission = 35000,
addExpenses = 'Интернет, Телефон, Билет на метро',
expenses1 = 'Поход в кино',
expenses2 = 'Поездка на природу',
amount1 = 1000,
amount2 = 3500,
deposit = true;
const income = 'Фриланс',
period = 7;

console.log(typeof income, typeof money, typeof deposit);
console.log(addExpenses.length);
console.log('Период равен', period, 'месяцев.', 'Цель заработать', mission, 'рублей');
console.log(addExpenses.toLowerCase().split(' '));

let budgetDay = money / 30;
console.log('Дневной бюджет составляет', budgetDay, 'рублей');

money = prompt('Ваш месячный доход?', money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую?', addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную статью расходов?', expenses1);
amount1 = prompt('Во сколько это обойдется??', amount1);
expenses2 = prompt('Введите обязательную статью расходов?', expenses2);
amount2 = prompt('Во сколько это обойдется??', amount2);

let budgetMonth = money - amount1 - amount2;
console.log('Ваш бюджет на месяц состовляет', budgetMonth, 'рублей');
mission = mission / budgetMonth;
console.log('Ваша цель будет достигнута за ', Math.ceil(mission), 'мес.');
budgetDay = budgetMonth / 30;
console.log('Ваш дневной бюджет составляет', Math.floor(budgetDay), 'руб.');

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');  
} else  if (budgetDay >= 0 && budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
}